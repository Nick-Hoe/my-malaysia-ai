import { NextResponse } from "next/server";
import { overlaySloganOnImage } from "@/lib/overlay";
import type { Tone } from "@/lib/generate";
import { isSloganWithinLimit, sloganLimitMessage } from "@/lib/slogan";

const TONES: Tone[] = ["english", "mandarin-my", "malay"];

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("image");
    const slogan = String(form.get("slogan") ?? "");
    const burn = String(form.get("burn") ?? "") === "true";
    const tone = String(form.get("tone") ?? "english") as Tone;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "A product image is required." }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be 8MB or smaller." }, { status: 400 });
    }

    if (!TONES.includes(tone)) {
      return NextResponse.json({ error: "Invalid content tone." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!burn) {
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type": file.type || "application/octet-stream",
          "Cache-Control": "no-store",
        },
      });
    }

    if (!slogan.trim()) {
      return NextResponse.json(
        { error: "Slogan text is required when banner overlay is enabled." },
        { status: 400 },
      );
    }

    if (!isSloganWithinLimit(slogan, tone)) {
      return NextResponse.json({ error: sloganLimitMessage(tone) }, { status: 400 });
    }

    const output = await overlaySloganOnImage(buffer, slogan);

    return new NextResponse(new Uint8Array(output), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process the product image." },
      { status: 500 },
    );
  }
}
