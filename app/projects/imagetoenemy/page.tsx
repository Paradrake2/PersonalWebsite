"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { isEnemy, validateImage, type UploadResult } from "@/app/lib/ai-contract";

export default function ImageToEnemyPage() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<Extract<UploadResult, { ok: true }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    const abort = new AbortController();
    fetch("/api/ai", { signal: abort.signal }).then(response => response.json()).then((status: unknown) => setEnabled(Boolean(status && typeof status === "object" && "enabled" in status && status.enabled === true))).catch(() => { if (!abort.signal.aborted) setEnabled(false); });
    return () => { abort.abort(); controller.current?.abort(); };
  }, []);
  useEffect(() => {
    if (!file) { setPreviewUrl(null); return; }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  function pick(selected: File | null) {
    setError(null); setResult(null); setFile(null);
    if (!selected) return;
    const invalid = validateImage(selected);
    if (invalid) { setError(invalid); return; }
    setFile(selected);
  }
  async function upload(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !enabled || loading) return;
    setLoading(true); setError(null); setResult(null);
    const abort = new AbortController(); controller.current = abort;
    const timeout = setTimeout(() => abort.abort(), 25_000);
    try {
      const form = new FormData(); form.append("image", file);
      const response = await fetch("/api/ai", { method: "POST", body: form, headers: token ? { "x-demo-token": token } : {}, signal: abort.signal });
      const value: unknown = await response.json().catch(() => { throw new Error("The preview is temporarily unavailable. Please try again later."); });
      if (!value || typeof value !== "object" || !("ok" in value)) throw new Error("The preview returned an unexpected response.");
      if (!response.ok || value.ok !== true) throw new Error("error" in value && typeof value.error === "string" ? value.error : "The upload could not be completed.");
      if (!("enemy" in value) || !isEnemy(value.enemy)) throw new Error("The preview returned an invalid enemy.");
      setResult({ ok: true, enemy: value.enemy, filename: file.name, sizeBytes: file.size });
    } catch (caught) {
      setError(caught instanceof Error && caught.name === "AbortError" ? "The request timed out or was cancelled. Please try again." : caught instanceof Error ? caught.message : "The preview is temporarily unavailable.");
    } finally { clearTimeout(timeout); controller.current = null; setLoading(false); }
  }
  return <main id="main-content" className="page-shell"><header className="page-heading"><p className="eyebrow">Experimental preview</p><h1>Image to Enemy</h1><p className="lead">A school project exploring how an image can become structured enemy data for a Unity game.</p></header><p className="notice" role="status">{enabled === null ? "Checking preview availability…" : enabled ? "Limited-access experiment. Images are sent to OpenAI for analysis. Use images you have permission to share, without personal or sensitive information." : "The live preview is currently disabled. This experiment converts an image’s main subject into a downloadable JSON definition with stats and behavior."}</p><form onSubmit={upload} className="upload-form" aria-busy={loading}><div className="upload-field"><label htmlFor="enemy-image">Choose an image</label><p id="image-hint">PNG, JPEG, or WebP · maximum 4 MB</p><input id="enemy-image" type="file" accept="image/png,image/jpeg,image/webp" aria-describedby="image-hint" disabled={!enabled || loading} onChange={event => { pick(event.target.files?.[0] ?? null); event.target.value = ""; }} /></div>{previewUrl && <Image src={previewUrl} alt="Preview of the image selected for enemy generation" width={640} height={400} unoptimized className="upload-preview" />}<div><label htmlFor="preview-token">Preview access code</label><input id="preview-token" type="password" value={token} onChange={event => setToken(event.target.value)} autoComplete="off" disabled={!enabled || loading} className="block mt-2 w-full rounded border border-gray-600 bg-transparent p-3" /><p className="mt-2 text-sm">Use the code provided for a supervised preview.</p></div><div className="actions"><button className="button button-primary" type="submit" disabled={!enabled || !file || loading}>{loading ? "Generating enemy…" : "Generate enemy JSON"}</button>{loading && <button className="button button-secondary" type="button" onClick={() => controller.current?.abort()}>Cancel</button>}</div></form>{error && <p role="alert" className="upload-error mt-6">{error}</p>}<div aria-live="polite">{result && <section className="upload-result"><h2>Generated enemy</h2><pre><code>{JSON.stringify(result.enemy, null, 2)}</code></pre><a className="button button-secondary" href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result.enemy, null, 2))}`} download="enemy.json">Download JSON</a></section>}</div></main>;
}
