import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-font";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const kufam = await loadGoogleFont("Kufam", 700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2B7A78",
          fontFamily: "Kufam",
          fontSize: 20,
          color: "#C4A265",
          letterSpacing: -1,
          lineHeight: 1,
          paddingTop: 4,
        }}
      >
        FJ
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Kufam", data: kufam, weight: 700, style: "normal" }],
    },
  );
}
