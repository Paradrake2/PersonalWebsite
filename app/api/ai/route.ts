import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY,});
export async function GET() {
    try {
        const r = await client.responses.create({
            model: "gpt-5",
            input: "reply with a haiku about AI",
        });

        const text = (r as any).output_text ?? "no text";
        return NextResponse.json({ok: true, fromOpenAI: text});
    } catch (err: any) {
        return NextResponse.json({ok: false, error: err.message});
    }
}
export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const file = form.get("image");

        if (!(file instanceof File)) {
            return NextResponse.json({ok: false, error: "No image file provided"});
        }
        const isImage = file.type.startsWith("image/");
        const maxBytes = 512 * 1024 * 1024; // 512MB
        if (!isImage || file.size > maxBytes) {
            return NextResponse.json({ok: false, error: "File must be an image under 512 MB"});
        }
        return NextResponse.json({ok: true, message: "image received", filename: file.name, sizeBytes: file.size}); // later will need file.arrayBuffer(), convert to data url, and call OpenAI
    } catch (e: any) {
        return NextResponse.json({ok: false, error: e.message || String(e)});
    }
}