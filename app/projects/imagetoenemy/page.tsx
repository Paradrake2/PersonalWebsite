"use client";

import { useState, useRef, useCallback } from "react";
import Navbar from "../../components/Navbar";

type UploadResult = { ok: boolean; error?: string; message?: string; filename?: string; sizeBytes?: number; };


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

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneRef.current?.classList.add("border-blue-500");
    }
    , []);
    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneRef.current?.classList.remove("border-blue-500");
    }
    , []);
    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneRef.current?.classList.remove("border-blue-500");

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onPick(e.dataTransfer.files[0]);
        }
    }
    , []);

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
                </div>
                <h1 className="text-2xl font-bold">Image to Enemy Converter</h1>
                <form onSubmit={upload} className="flex flex-col items-center mt-4">
                    <div ref={dropzoneRef} onClick={openPicker} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} className="w-64 h-64 border-4 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500">
                        <p className = "mb-2">Drag and drop an image here, or click to select</p>
                        <p className = "text-sm opacity-80">PNG, JPG, GIF up to 512MB</p>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
                    </div>
                    <button type="submit" disabled={!file || loading} className="self-start rounded-lg px-4 py-2 border border-gray-600 hover:border-gray-400 disabled:opacity-50">
                        {loading ? "Uploading..." : "Upload Image"}
                    </button>
                </form>
                {msg && <p className="mt-4 text-green-400">Response: {msg}</p>}
                {err && <p className="mt-4 text-red-400">Error: {err}</p>}
            </div>
        </main>
    );
}