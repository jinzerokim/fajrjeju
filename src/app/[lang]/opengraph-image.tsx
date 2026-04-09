import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-font";

export const alt = "Fajr Jeju — Muslim Community in Jeju";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [kufam, inter] = await Promise.all([
    loadGoogleFont("Kufam", 700),
    loadGoogleFont("Inter", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 10,
            color: "#C4A265",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Established 2026
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Kufam",
            fontSize: 200,
            color: "#2C3338",
            lineHeight: 1,
          }}
        >
          Fajr Jeju
        </div>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 2,
            backgroundColor: "#C4A265",
            marginTop: 36,
            marginBottom: 32,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#7C8389",
          }}
        >
          Muslim Community in Jeju
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 48,
            fontSize: 20,
            color: "#7C8389",
            letterSpacing: 3,
          }}
        >
          fajrjeju.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Kufam", data: kufam, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
