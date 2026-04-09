export async function loadGoogleFont(family: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
    },
  }).then((res) => res.text());
  const match = css.match(/src: url\((.+?)\) format/);
  if (!match) throw new Error(`Failed to load ${family} ${weight}`);
  return fetch(match[1]).then((res) => res.arrayBuffer());
}
