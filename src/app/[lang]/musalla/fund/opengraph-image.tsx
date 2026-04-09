import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-font";

export const alt = "Pyoseon Musalla Fund — Help open the first musalla in southern Jeju";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [kufam, interBold, inter] = await Promise.all([
    loadGoogleFont("Kufam", 700),
    loadGoogleFont("Inter", 700),
    loadGoogleFont("Inter", 400),
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
          backgroundColor: "#FBF9F7",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Kufam",
            fontSize: 28,
            color: "#C4A265",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          Fajr Jeju
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 96,
            color: "#2C3338",
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          Pyoseon Musalla Fund
        </div>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 2,
            backgroundColor: "#C4A265",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#2B7A78",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Help open the first musalla in southern Jeju
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 48,
            fontSize: 20,
            color: "#7C8389",
            letterSpacing: 2,
          }}
        >
          fajrjeju.com / musalla / fund
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Kufam", data: kufam, weight: 700, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}
