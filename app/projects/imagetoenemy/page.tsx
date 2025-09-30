"use client";

import { useState, useRef,} from "react";
import Navbar from "../../components/Navbar";

type UploadResult = { ok: boolean; error?: string; message?: string; filename?: string; sizeBytes?: number; enemy?: any };


export default function Home() {
    const [msg, setMsg] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [result, setResult] = useState<UploadResult | null>(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dropzoneRef = useRef<HTMLDivElement | null>(null);

    const onPick = (f: File | null) => {
        setResult(null);
        setFile(f);
        setErr(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(f ? URL.createObjectURL(f) : null);

        // allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            onPick(e.target.files[0]);
        }
    }

    const openPicker = () => fileInputRef.current?.click();

    async function upload(e: React.FormEvent) {
        e.preventDefault();
        if (!file) return;
        setLoading(true);
        setErr(null);
        setResult(null);
        try {
            const form = new FormData();
            form.append("image", file);
            const r = await fetch("/api/ai", { method: "POST", body: form });
            const data: UploadResult = await r.json();
            if (!r.ok) throw new Error(data.error || "Upload failed");
            setResult(data);
        } catch (error) {
            setErr(String(error));
        } finally {
            setLoading(false);
        }
    }
    async function ping() {
        setMsg(""); setErr("");
        try {
            const r = await fetch("/api/ai");
            const data = await r.json();
            if (!r.ok) throw new Error(data.error || "Request failed");
            setMsg(String(data.fromOpenAI));
        } catch (error) {
            setErr(String(error));
        }
    }
    return (
        <main>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <div>
                    <h1>Image to Enemy Project</h1>
                    <p className="text-lg">This is a school project. It will take images, identify the focus object in the image, and based on that generate a JSON file that can be converted into an enemy in Unity.</p>
                </div>
                <div>
                    <p className="text-sm"> Note: please do not spam it. I did not implement a way to prevent you from using up all my credits. It will not automatically buy more credits, so once its out of credits, it will no longer work. Please be nice.</p>
                </div>
                <h1 className="text-2xl font-bold">Image to Enemy Converter</h1>
                <form onSubmit={upload} className="flex flex-col items-center mt-4">
                    <div ref={dropzoneRef} onClick={openPicker} className="w-64 h-64 border-4 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500">
                        <p className = "mb-2">Drag and drop an image here, or click to select</p>
                        <p className = "text-sm opacity-80">PNG, JPG, GIF up to 10MB</p>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
                    </div>
                    <button type="submit" disabled={!file || loading} className="self-start rounded-lg px-4 py-2 border border-gray-600 hover:border-gray-400 disabled:opacity-50">
                        {loading ? "Uploading..." : "Upload Image"}
                    </button>
                </form>
                {msg && <p className="mt-4 text-green-400">Response: {msg}</p>}
                {err && <p className="mt-4 text-red-400">Error: {err}</p>}
                {result?.ok && result.enemy && (
                    <div className="mt-4 p-4 border border-green-400 rounded-lg max-w-md text-left">
                        <h2 className="text-lg font-bold mb-2">Generated Enemy JSON:</h2>
                        <pre className="bg-gray-800 p-2 rounded-lg overflow-x-auto"><code>{JSON.stringify(result.enemy, null, 2)}</code></pre>
                        <a href = {`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result.enemy, null, 2))}`} download={result.filename ? result.filename.replace(/\.[^/.]+$/, ".json") : "enemy.json"} className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Download JSON
                        </a>
                    </div>
                )}
            </div>
        </main>
    );
}