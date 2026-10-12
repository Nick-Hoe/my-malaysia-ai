import { NextResponse } from "next/server";
import { generateCopy, type Platform, type Tone } from "@/lib/generate";
import { COPY_MAX_BLOCKS, enforceCopyLimit } from "@/lib/slogan";

const PLATFORMS: Platform[] = ["xiaohongshu", "shopee"];
const TONES: Tone[] = ["english", "mandarin-my", "malay"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      product?: string;
      platform?: Platform;
      tone?: Tone;
    };

    const product = body.product?.trim() ?? "";
    const platform = body.platform;
    const tone = body.tone;

    if (!product) {
      return NextResponse.json(
        { error: "Product name / key selling points is required." },
        { status: 400 },
      );
    }

    if (!platform || !PLATFORMS.includes(platform)) {
      return NextResponse.json({ error: "Invalid platform." }, { status: 400 });
    }

    if (!tone || !TONES.includes(tone)) {
      return NextResponse.json({ error: "Invalid content tone." }, { status: 400 });
    }

    const copy = enforceCopyLimit(generateCopy(product, platform, tone), COPY_MAX_BLOCKS);

    return NextResponse.json({
      copy,
      maxBlocks: COPY_MAX_BLOCKS,
    });
  } catch {
    return NextResponse.json({ error: "Unable to generate copy." }, { status: 500 });
  }
}
