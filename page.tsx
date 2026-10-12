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
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      if (platform === "youtube") {
        setGeneratedText("🔥 [VIRAL CLICKBAIT TITLES]\n1. I Tried The Most Dangerous Food In KL (Never Again!)\n2. Real Reason Why Malaysian SMEs Are Secretly Failing...\n\n📝 [HIGH-SEO VIDEO DESCRIPTION]\nJom! In this video, we dive deep into the hidden spots of Malaysia. Watch until the end for the shocking reveal! Like, subscribe, and share for more local content!");
      } else {
        setGeneratedText("1. Premium Quality Stock ready in Malaysia.\n2. Fast fulfillment within 24 hours.\n3. High-converting copywriting designed for local SME.\n4. Boost your storefront conversions instantly and drive sales.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 select-none font-sans">
      <div className="max-w-4xl w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-2xl backdrop-blur-md">
        
        {/* Header Title Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">
            AI Creater (Beta)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Instant premium visuals and conversion copies for Malaysian Sellers & Creators.</p>
        </div>

        {/* Input Configuration Forms */}
        <div className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Target Platform</label>
            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={() => { setPlatform("shopee"); setStickerShock(false); }} className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${platform === "shopee" ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600"}`}>Shopee / Lazada / TikTok</button>
              <button type="button" onClick={() => { setPlatform("xiaohongshu"); setStickerShock(false); }} className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${platform === "xiaohongshu" ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600"}`}>Xiaohongshu / Instagram</button>
              <button type="button" onClick={() => { setPlatform("youtube"); setStickerReady(false); setStickerFast(false); }} className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${platform === "youtube" ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20" : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600"}`}>YouTube Thumbnail</button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Content Tone & Language</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 font-medium">
              <option value="english">Premium Standard English (Business & Brand)</option>
              <option value="chinese">Localized Chinese (High-converting Style)</option>
              <option value="malay">Bahasa Melayu (Professional & Engaging)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              {platform === "youtube" ? "Video Topic / Core Concept" : "Product Name / Key Selling Points"}
            </label>
            <textarea value={productInfo} onChange={(e) => setProductInfo(e.target.value)} placeholder={platform === "youtube" ? "e.g., Testing Viral Food inside Brickfields KL..." : "e.g., Premium Bird Nest Gift Box..."} rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 placeholder-zinc-600 resize-none font-sans" />
          </div>

          {/* Toggle and File Upload Area for All Devices */}
          <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-4 space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked={enableImageRef} onChange={(e) => setEnableImageRef(e.target.checked)} className="w-4 h-4 rounded accent-orange-500 cursor-pointer" />
              <span className="text-xs sm:text-sm font-semibold text-zinc-200">{platform === "youtube" ? "Enable Thumbnail Reference & Visual Overlay" : "Enable Image Reference & Conversion Overlay (Advanced)"}</span>
            </label>

            {enableImageRef && (
              <div className="pt-4 border-t border-zinc-800 space-y-4">
                <div className="bg-zinc-950/40 p-4 sm:p-5 rounded-xl border-2 border-dashed border-zinc-800 text-center space-y-3">
                  <span className="text-xs text-zinc-400 block font-semibold">
                    {selectedImage ? "✓ Photo loaded successfully!" : "Select your photo from phone/tablet/PC:"}
                  </span>
                  <input 
                    type="file" 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 file:cursor-pointer cursor-pointer"
                  />
                </div>
                
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800 space-y-3">
                  <span className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Add Custom Overlays:</span>
                  <div className="flex flex-wrap gap-2.5">
                    <label className="flex items-center space-x-2 cursor-pointer bg-zinc-900/50 px-3 py-2 rounded-lg border border-zinc-800">
                      <input type="checkbox" checked={burnSlogan} onChange={(e) => setBurnSlogan(e.target.checked)} className="w-3.5 h-3.5 accent-orange-500" />
                      <span className="text-xs text-zinc-300 font-medium">Big Slogan Banner</span>
                    </label>
                    {platform !== "youtube" && (
                      <>
                        <label className="flex items-center space-x-2 cursor-pointer bg-zinc-900/50 px-3 py-2 rounded-lg border border-zinc-800">
                          <input type="checkbox" checked={stickerReady} onChange={(e) => setStickerReady(e.target.checked)} className="w-3.5 h-3.5 accent-orange-500" />
                          <span className="text-xs text-zinc-300 font-medium">🇲🇾 Ready Stock</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer bg-zinc-900/50 px-3 py-2 rounded-lg border border-zinc-800">
                          <input type="checkbox" checked={stickerFast} onChange={(e) => setStickerFast(e.target.checked)} className="w-3.5 h-3.5 accent-orange-500" />
                          <span className="text-xs text-zinc-300 font-medium">🚚 24H Fast Ship</span>
                        </label>
                      </>
                    )}
                    {platform === "youtube" && (
                      <label className="flex items-center space-x-2 cursor-pointer bg-zinc-900/50 px-3 py-2 rounded-lg border border-zinc-800">
                        <input type="checkbox" checked={stickerShock} onChange={(e) => setStickerShock(e.target.checked)} className="w-3.5 h-3.5 accent-orange-500" />
                        <span className="text-xs text-zinc-300 font-medium">😱 Shock Emoji</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button type="button" onClick={handleGenerate} disabled={!productInfo} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-orange-500/10">
            {loading ? "Analyzing Big-Data Algorithms..." : "Jom! Generate High-Converting Assets"}
          </button>
        </div>

        {/* Output Panel with full Mobile/Tablet responsive viewports */}
        {generatedText && (
Use code with caution.
AI Visual Preview
<div className={w-full rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center relative overflow-hidden transition-all shadow-inner ${platform === "youtube" ? "aspect-video" : "aspect-square"}}>
{selectedImage ? (

) : (
{platform === "youtube" ? "16:9 Creator Framework" : "1:1 Merchant Grid"}
)}
{platform !== "youtube" && stickerReady && 🇲🇾 READY STOCK IN MY}
{platform !== "youtube" && stickerFast && 🚚 24H FAST SHIPPING}
{platform === "youtube" && stickerShock && 😱💥}
{burnSlogan && (

{platform === "youtube" ? "⚠️ AMAZING SHOCKING REVEAL" : tone === "chinese" ? "🔥 爆款特惠 LIMITED TIME DEAL" : "🔥 LUXURY BRAND COLLECTION"}

)}

{platform === "youtube" ? "AI Video SEO & Script Summary" : "AI Conversion Copywriting"}
{generatedText}


)}


);
}