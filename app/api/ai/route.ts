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
function parseJsonFromText(text: string) {
  // Remove markdown fences if the model wrapped JSON in ```json ... ```
    const cleaned = text.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
    try {
    return JSON.parse(cleaned);
    } catch {
    // fallback: try to extract the first {...} block
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
        const slice = cleaned.slice(start, end + 1);
        return JSON.parse(slice);
    }
    throw new Error("Failed to parse JSON output");
    }
}
export async function POST(req: Request) {
    try {
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ ok: false, error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get("image");

    if (!(file instanceof File)) {
        return NextResponse.json({ ok: false, error: "No image file provided" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
        return NextResponse.json({ ok: false, error: "File must be an image" }, { status: 400 });
    }
    const MAX = 10 * 1024 * 1024;
    if (file.size > MAX) {
        return NextResponse.json({ ok: false, error: "Image too large (10MB max)" }, { status: 400 });
    }

    // Read bytes -> base64 -> data URL
    const bytes = Buffer.from(await file.arrayBuffer());
    const b64 = bytes.toString("base64");
    const dataUrl = `data:${file.type};base64,${b64}`;

    // Define the JSON schema your Unity importer expects
    const enemyJsonSchema = {
        name: "enemy_schema",
        schema: {
        type: "object",
        properties: {
            name: { type: "string", description: "Human-readable enemy name" },
            level: { type: "integer", minimum: 1 },
            stats: {
                type: "object",
                properties: {
                    hp: { type: "integer", minimum: 1 },
                    attack: { type: "number", minimum: 0 },
                    defense: { type: "number", minimum: 0 },
                    speed: { type: "number", minimum: 0 }
                },
                required: ["hp", "attack", "defense", "speed"],
                additionalProperties: false
                },
                behaviors: {
                    type: "array",
                    description: "Allowed behaviors are 'ranged' and 'melee'",
                    items: { type: "string", enum: ["ranged", "melee"] },
                    minItems: 1,
                    maxItems: 1,
                },
            },
        },
        strict: true
    };

    // Ask the model to extract -> structured JSON
    const resp = await client.responses.create({
        model: "gpt-5",
        input: [
            { role: "system", content:[{type:"input_text", text: "You output ONLY valid JSON that conforms EXACTLY to the provided schema. No explanations, no apologies, no notes, no code fences. Just the raw JSON."}]},
            {
                role: "user",
                content: [
                { type: "input_text", text: JSON.stringify(enemyJsonSchema) },
                {
                    type: "input_text",
                    text: "Analyze the image. Identify the main subject and convert it into a video-game enemy JSON that fits the provided schema. Output ONLY the valid JSON. No explainations. No code fences. If the image is unclear, make a best guess. Ensure all required fields are present and valid. For fields you can't determine from the image, use reasonable defaults (e.g., level 1, hp 10). As a general rule of thumb: size corresponds to hp, material type corresponds to defense, pointiness or lack thereof corresponds to attack, and size inversely corresponds to speed. Level can be randomized. Generally, the higher the level, the higher the stats. Choose behaviors that make sense for the enemy type. Keep the JSON concise and relevant."
                },
                {
                    type: "input_image",
                    image_url: dataUrl,
                    detail: "auto"
                }
            ]
        }
    ],
    });
    
    const text =
        (resp as any).output_text ??
        (resp as any).content?.[0]?.text ??
        (resp as any).choices?.[0]?.message?.content ??
        "";

    if (!text) return NextResponse.json({ ok: false, error: "Empty response from model" }, { status: 502 });

    let enemy;
    try { enemy = parseJsonFromText(text); }
    catch (err: any) { return NextResponse.json({ ok: false, error: `JSON parse error: ${err.message}` }, { status: 502 }); }

    return NextResponse.json({ ok: true, filename: file.name, sizeBytes: file.size, enemy }, { status: 200 });
    } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
    }
}
/*
    return NextResponse.json(
        {
        ok: true,
        filename: file.name,
        sizeBytes: file.size,
        enemy
        },
        { status: 200 }
    );
    
    } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
    }
    }
*/