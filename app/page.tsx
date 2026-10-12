"use client";
import { useState } from "react";

export default function Home() {
  const [platform, setPlatform] = useState("shopee");
  const [tone, setTone] = useState("english");
  const [productInfo, setProductInfo] = useState("");
  const [enableImageRef, setEnableImageRef] = useState(false);
  const [burnSlogan, setBurnSlogan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedText("1. Premium Quality Stock ready in Malaysia.\n2. Fast fulfillment within 24 hours.\n3. High-converting copywriting designed for local SME.\n4. Boost your sales today.");
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
            Marketing Draw (Beta)
          </h1>
          <p className="text-sm text-zinc-400 mt-2">Instant premium visuals and copies for Malaysian Sellers.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Target Platform</label>
            <div className="flex space-x-4">
              <button onClick={() => setPlatform("shopee")} className={`px-6 py-2 rounded-xl text-sm font-medium ${platform === "shopee" ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>Shopee / Lazada / TikTok</button>
              <button onClick={() => setPlatform("xiaohongshu")} className={`px-6 py-2 rounded-xl text-sm font-medium ${platform === "xiaohongshu" ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>Xiaohongshu / Instagram</button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Content Tone & Language</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white">
              <option value="english">Premium Standard English (Business & Brand)</option>
              <option value="chinese">Localized Chinese (High-converting Style)</option>
              <option value="malay">Bahasa Melayu (Professional & Engaging)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Product Name / Key Selling Points</label>
            <textarea value={productInfo} onChange={(e) => setProductInfo(e.target.value)} placeholder="e.g., Premium Bird Nest Gift Box..." rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600" />
          </div>

          <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-4 space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked={enableImageRef} onChange={(e) => setEnableImageRef(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" />
              <span className="text-sm font-medium text-zinc-200">Enable Image Reference & Banner Overlay (Advanced)</span>
            </label>

            {enableImageRef && (
              <div className="pt-2 border-t border-zinc-800 space-y-4">
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center bg-zinc-950/40">
                  <span className="text-xs text-zinc-500 block">Drag and drop your product photo here, or click to browse</span>
                </div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={burnSlogan} onChange={(e) => setBurnSlogan(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" />
                  <span className="text-xs text-zinc-400">Burn marketing slogan text into the image? (Max 8 words/chars limit)</span>
                </label>
              </div>
            )}
          </div>

          <button onClick={handleGenerate} disabled={!productInfo} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3.5 rounded-xl text-sm transition-all disabled:opacity-40">
            {loading ? "Generating for Malaysia Market..." : "Jom! Generate Conversion Post"}
          </button>
        </div>

        {generatedText && (
          <div className="mt-10 pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Visual Preview</h3>
              <div className="aspect-square w-full rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                <div className="text-zinc-600 text-xs">Image Container (Beta Placeholder)</div>
                {burnSlogan && <div className="absolute bottom-4 left-4 right-4 bg-orange-600 text-white py-2 text-center rounded-lg font-bold text-xs">READY STOCK 🇲🇾</div>}
              </div>
            </div>
            <div className="space-y-3 flex flex-col">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Copywriting (Strict Limit)</h3>
              <div className="flex-1 w-full rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-300 min-h-[150px] whitespace-pre-line">{generatedText}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}