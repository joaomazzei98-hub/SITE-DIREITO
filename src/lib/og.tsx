import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * A fonte é lida do repositório, não da rede, para que o build não dependa
 * de acesso ao Google Fonts.
 *
 * Precisa ser uma instância estática: o satori (motor do next/og) não
 * consegue parsear o arquivo variável PlayfairDisplay[wght].ttf e falha
 * com "Cannot read properties of undefined (reading '256')".
 */
export async function loadPlayfair() {
  return readFile(
    path.join(process.cwd(), "src/assets/fonts/PlayfairDisplay-SemiBold.ttf")
  );
}

type OgImageInput = {
  eyebrow?: string;
  title: string;
};

export async function renderOgImage({ eyebrow, title }: OgImageInput) {
  const playfair = await loadPlayfair();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#16313E",
          padding: "72px 80px",
          color: "#F7F5F2"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Playfair",
              fontSize: 34,
              letterSpacing: "0.01em"
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              width: 88,
              height: 5,
              marginTop: 22,
              borderRadius: 3,
              backgroundColor: "#C6A56B"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 24,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C6A56B",
                marginBottom: 24
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontFamily: "Playfair",
              fontSize: title.length > 46 ? 62 : 76,
              lineHeight: 1.12,
              maxWidth: 960
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(247,245,242,0.68)"
          }}
        >
          Advocacia em São Paulo
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "Playfair",
          data: playfair,
          style: "normal"
        }
      ]
    }
  );
}
