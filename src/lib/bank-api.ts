export interface BankTransaction {
  date: string;
  time: string;
  description: string;
  amount: number;
  balance: number;
  type: "입금" | "출금";
}

interface BankApiResponse {
  transactions: {
    date: string;
    time: string;
    description: string;
    amount: number;
    balance: number;
    type: string;
  }[];
}

export async function fetchBankTransactions(): Promise<{
  transactions: BankTransaction[];
  lastUpdated: string;
} | null> {
  const apiKey = process.env.BANK_API_KEY;
  const apiSecret = process.env.BANK_API_SECRET;
  const bankCode = process.env.BANK_CODE;
  const accountNumber = process.env.BANK_ACCOUNT_NUMBER;
  const accountPassword = process.env.BANK_ACCOUNT_PASSWORD;
  const residentNumber = process.env.BANK_RESIDENT_NUMBER;

  if (!apiKey || !apiSecret || !bankCode || !accountNumber || !accountPassword || !residentNumber) {
    return null;
  }

  const today = new Date();
  const endDate = today.toISOString().slice(0, 10).replace(/-/g, "");
  const startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
    .toISOString().slice(0, 10).replace(/-/g, "");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  let res: Response;
  try {
    res = await fetch("https://api.bankapi.co.kr/v1/transactions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}:${apiSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bankCode,
        accountNumber,
        accountPassword,
        residentNumber,
        startDate,
        endDate,
      }),
      signal: controller.signal,
      next: { revalidate: 300 },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }

  if (res.status === 429) {
    const retryAfter = Number(res.headers.get("Retry-After") || "60");
    await new Promise((r) => setTimeout(r, retryAfter * 1000));
    return fetchBankTransactions();
  }

  if (!res.ok) return null;

  const data: BankApiResponse = await res.json();

  const transactions: BankTransaction[] = data.transactions.map((tx) => ({
    date: tx.date,
    time: tx.time,
    description: tx.description,
    amount: tx.amount,
    balance: tx.balance,
    type: tx.type === "출금" ? "출금" : "입금",
  }));

  return {
    transactions,
    lastUpdated: new Date().toISOString(),
  };
}
