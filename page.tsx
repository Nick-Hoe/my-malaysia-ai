"use client";
import { useState } from "react";

export default function Home() {
  const [platform, setPlatform] = useState("shopee");
  const [tone, setTone] = useState("english");
  const [productInfo, setProductInfo] = useState("");
  const [enableImageRef, setEnableImageRef] = useState(false);
  const [burnSlogan, setBurnSlogan] = useState(false);
  const [stickerReady, setStickerReady] = useState(false);
  const [stickerFast, setStickerFast] = useState(false);
  const [stickerShock, setStickerShock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      if (platform === "youtube") {
        setGeneratedText("🔥 [VIRAL TITLES]\n1. I Tried The Most Dangerous Food In KL!\n2. Real Reason Why Malaysian SMEs Are Failing...\n\n📝 [VIDEO DESCRIPTION]\nJom! In this video, we dive deep into the hidden spots of Malaysia. Watch until the end!");
      } else {
        setGeneratedText("1. Premium Quality Stock ready in Malaysia.\n2. Fast fulfillment within 24 hours.\n3. High-converting copywriting designed for local SME.\n4. Boost your sales today.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">AI create (Beta)</h1>
          <p className="text-sm text-zinc-400 mt-2">Instant premium visuals and conversion copies for Malaysian Sellers & Creators.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Target Platform</label>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => { setPlatform("shopee"); setStickerShock(false); }} className={`px-5 py-2 rounded-xl text-sm font-medium ${platform === "shopee" ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>Shopee / Lazada / TikTok</button>
              <button onClick={() => { setPlatform("xiaohongshu"); setStickerShock(false); }} className={`px-5 py-2 rounded-xl text-sm font-medium ${platform === "xiaohongshu" ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>Xiaohongshu / Instagram</button>
              <button onClick={() => { setPlatform("youtube"); setStickerReady(false); setStickerFast(false); }} className={`px-5 py-2 rounded-xl text-sm font-medium ${platform === "youtube" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400"}`}>YouTube Thumbnail</button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Content Tone & Language</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white">
              <option value="english">Premium Standard English (Business & Brand)</option>
              <option value="chinese">Localized Chinese (High-converting Style)</option>
              <option value="malay">Bahasa Melayu (Professional & Engaging)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">{platform === "youtube" ? "Video Topic / Core Concept" : "Product Name / Key Selling Points"}</label>
            <textarea value={productInfo} onChange={(e) => setProductInfo(e.target.value)} placeholder="Type here..." rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white resize-none" />
          </div>

          <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-4 space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked={enableImageRef} onChange={(e) => setEnableImageRef(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" />
              <span className="text-sm font-medium text-zinc-200">Enable Reference & Visual Overlay (Advanced)</span>
            </label>

            {enableImageRef && (
              <div className="pt-4 border-t border-zinc-800 space-y-4">
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800 text-center space-y-3">
                  <span className="text-xs text-zinc-400 block font-semibold">{selectedImage ? "✓ Photo loaded!" : "Select your photo from phone/tablet/PC:"}</span>
                  <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-xs text-zinc-500 cursor-pointer" />
                </div>
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800 flex flex-wrap gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={burnSlogan} onChange={(e) => setBurnSlogan(e.target.checked)} className="w-4 h-4 accent-orange-500" /><span className="text-xs text-zinc-300">Big Slogan</span></label>
                  {platform !== "youtube" && (
                    <><label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={stickerReady} onChange={(e) => setStickerReady(e.target.checked)} className="w-4 h-4 accent-orange-500" /><span className="text-xs text-zinc-300">🇲🇾 Ready Stock</span></label><label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={stickerFast} onChange={(e) => setStickerFast(e.target.checked)} className="w-4 h-4 accent-orange-500" /><span className="text-xs text-zinc-300">🚚 24H Fast Ship</span></label></>
                  )}
                  {platform === "youtube" && (<label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={stickerShock} onChange={(e) => setStickerShock(e.target.checked)} className="w-4 h-4 accent-orange-500" /><span className="text-xs text-zinc-300">😱 Shock Face</span></label>)}
                </div>
              </div>
            )}
          </div>

          <button type="button" onClick={handleGenerate} disabled={!productInfo} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-xl text-sm">Jom! Generate Assets</button>
        </div>

        {generatedText && (
          <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase">AI Visual Preview</h3>
              <div className={`w-full rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center relative overflow-hidden ${platform === "youtube" ? "aspect-video" : "aspect-square"}`}>
                {selectedImage ? ( <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" /> ) : ( <div className="text-zinc-700 text-xs">{platform === "youtube" ? "16:9 HD Thumbnail" : "1:1 Product Container"}</div> )}
                {platform !== "youtube" && stickerReady && <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">🇲🇾 READY STOCK</div>}
                {platform !== "youtube" && stickerFast && <div className="absolute top-3 right-3 bg-teal-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">🚚 24H SHIPPING</div>}
                {platform === "youtube" && stickerShock && <div className="absolute top-3 right-3 text-2xl animate-bounce">😱💥</div>}
                {burnSlogan && ( <div className="absolute bottom-4 left-4 right-4 bg-orange-600 text-white py-1.5 text-center rounded-lg font-black text-xs">{platform === "youtube" ? "⚠️ OMG! SHOCKING REVEAL" : tone === "chinese" ? "🔥 爆款特惠 LIMITED OFFER" : "🔥 PREMIUM COLLECTION"}</div> )}
              </div>
            </div>
            <div className="space-y-2 flex flex-col">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase">{platform === "youtube" ? "AI Video SEO Title" : "AI Copywriting"}</h3>
              <div className="flex-1 w-full rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-300 min-h-[150px] whitespace-pre-line">{generatedText}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
