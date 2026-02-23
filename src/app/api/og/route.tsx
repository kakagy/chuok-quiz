import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const score = searchParams.get("score") ?? "0";
  const category = searchParams.get("category") ?? "";
  const level = searchParams.get("level") ?? "";

  // Load DungGeunMo font for Satori
  // Uses Node.js runtime (default) to stay under Vercel Hobby Edge Function 1MB limit
  const fontData = await fetch(
    new URL("../../../styles/fonts/DungGeunMo.woff", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a1a",
          fontFamily: "DungGeunMo",
          color: "#e0e0e0",
          border: "8px solid #2a2a4a",
          borderRadius: "16px",
        }}
      >
        <div style={{ fontSize: "48px", color: "#00ff41", marginBottom: "20px", display: "flex" }}>
          추억퀴즈
        </div>
        <div style={{ fontSize: "72px", color: "#ff6b35", marginBottom: "16px", display: "flex" }}>
          {level}
        </div>
        <div style={{ fontSize: "36px", marginBottom: "32px", display: "flex" }}>
          나는 90년대를 {score}% 기억한다!
        </div>
        <div
          style={{
            width: "400px",
            height: "24px",
            background: "#1a1a2e",
            borderRadius: "4px",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <div
            style={{
              width: `${score}%`,
              height: "100%",
              background: "#00ff41",
            }}
          />
        </div>
        <div style={{ fontSize: "24px", marginTop: "24px", color: "#6b7280", display: "flex" }}>
          chuokquiz.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "DungGeunMo",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
