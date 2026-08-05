import { ImageResponse } from "next/og";

import { loadPlayfair } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const playfair = await loadPlayfair();

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
          backgroundColor: "#16313E",
          color: "#F7F5F2",
          fontFamily: "Playfair",
          fontSize: 82,
          letterSpacing: "0.02em"
        }}
      >
        FB
        <div
          style={{
            width: 74,
            height: 6,
            marginTop: 14,
            borderRadius: 3,
            backgroundColor: "#C6A56B"
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Playfair", data: playfair, style: "normal" }]
    }
  );
}
