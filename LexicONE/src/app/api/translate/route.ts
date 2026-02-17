import { NextResponse } from "next/server";

const GOOGLE_TRANSLATE = "https://translate.googleapis.com/translate_a/single";
const LIBRE_TRANSLATE = "https://libretranslate.de/translate";

const fetchGoogleTranslate = async (
  text: string,
  source: string,
  target: string,
) => {
  const url = `${GOOGLE_TRANSLATE}?client=gtx&sl=${encodeURIComponent(
    source,
  )}&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36",
    },
    cache: "no-store",
  });
  if (!response.ok) return "";
  const data = (await response.json()) as Array<Array<[string]>>;
  const parts = Array.isArray(data?.[0]) ? data[0] : [];
  return parts.map((item) => item[0]).join("").trim();
};

const fetchLibreTranslate = async (
  text: string,
  source: string,
  target: string,
) => {
  const response = await fetch(LIBRE_TRANSLATE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source,
      target,
      format: "text",
    }),
    cache: "no-store",
  });
  if (!response.ok) return "";
  const data = (await response.json()) as { translatedText?: string };
  return data.translatedText?.trim() ?? "";
};

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    if (!rawBody) {
      return NextResponse.json(
        { error: "Missing body." },
        { status: 400 },
      );
    }
    let body: { text?: string; source?: string; target?: string };
    try {
      body = JSON.parse(rawBody) as {
        text?: string;
        source?: string;
        target?: string;
      };
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON." },
        { status: 400 },
      );
    }
    const text = body.text?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "Missing text." },
        { status: 400 },
      );
    }

    const source = body.source || "en";
    const target = body.target || "ru";
    const googleResult = await fetchGoogleTranslate(text, source, target);
    const fallbackResult =
      googleResult || (await fetchLibreTranslate(text, source, target));
    const translatedText = fallbackResult.trim();
    if (!translatedText) {
      return NextResponse.json(
        { error: "Translation failed." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      translatedText,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
