"use client";
import { useState } from "react";

export default function Home() {
  // 平台选项增加 'youtube'
  const [platform, setPlatform] = useState("shopee");
  const [tone, setTone] = useState("english");
  const [productInfo, setProductInfo] = useState("");
  const [enableImageRef, setEnableImageRef] = useState(false);
  const [burnSlogan, setBurnSlogan] = useState(false);
  
  // 大马电商专属标签状态
  const [stickerReadyStock, setStickerReadyStock] = useState(false);
  const [stickerFastShipping, setStickerFastShipping] = useState(false);

  // YouTube 专属标签状态
  const [stickerClickbait, setStickerClickbait] = useState(false);

  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      if (platform === "youtube") {
        setGeneratedText(
          "🔥 [VIRAL] VIDEO TITLE OPTIONS:\n" +
          "1. I Tried The Most Dangerous Food In KL (Never Again!)\n" +
          "2. Real Reason Why Malaysian SME Are Secretly Failing...\n\n" +
          "📝 HIGH-ENGAGEMENT VIDEO DESCRIPTION:\n" +
          "Jom! In this video, we dive deep into the hidden spots of Malaysia. Make sure to watch until the end for the shocking reveal! Like, subscribe, and share for more local content!"
        );
      } else {
        setGeneratedText("1. Premium Quality Stock ready in Malaysia.\n2. Fast fulfillment within 24 hours.\n3. High-converting copywriting designed for local SME.\n4. Boost your sales today.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
            🇲🇾 MY AI Content Generator (Beta)
          </h1>
          <p className="text-sm text-zinc-400 mt-2">Instant premium visuals and copies for Malaysian Sellers & Creators.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Target Platform</label>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setPlatform("shopee")} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${platform === "shopee" ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>Shopee / Lazada / TikTok</button>
              <button onClick={() => setPlatform("xiaohongshu")} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${platform === "xiaohongshu" ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>Xiaohongshu / Instagram</button>
              {/* 新增 YouTube 创作者按钮 */}
              <button onClick={() => setPlatform("youtube")} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${platform === "youtube" ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "bg-zinc-800 text-zinc-400"}`}>YouTube Thumbnail & Script</button>
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
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              {platform === "youtube" ? "Video Topic / Core Concept" : "Product Name / Key Selling Points"}
            </label>
            <textarea 
              value={productInfo} 
              onChange={(e) => setProductInfo(e.target.value)} 
              placeholder={platform === "youtube" ? "e.g., Testing Crying Tiger Char Kuey Teow in Brickfields..." : "e.g., Premium Bird Nest Gift Box..."} 
              rows={3} 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 resize-none" 
            />
          </div>

          {/* 智能条件拦截模块 */}
          <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-4 space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked={enableImageRef} onChange={(e) => setEnableImageRef(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" />
              <span className="text-sm font-medium text-zinc-200">
                {platform === "youtube" ? "Enable Thumbnail Reference & Visual Text Overlay" : "Enable Image Reference & Conversion Overlay (Advanced)"}
              </span>
            </label>

            {enableImageRef && (
              <div className="pt-4 border-t border-zinc-800 space-y-4">
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center bg-zinc-950/40">
                  <span className="text-xs text-zinc-500 block">
                    {platform === "youtube" ? "Drag and drop your thumbnail draft photo here, or click to browse" : "Drag and drop your product photo here, or click to browse"}
                  </span>
                </div>
                
                {/* 动态切换展示：如果是 YouTube 平台，完全隐藏 Ready Stock / Fast Shipping 贴纸 */}
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800 space-y-3">
                  <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wide">Add Design Elements:</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center space-x-3 cursor-pointer bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700">
                      <input type="checkbox" checked={burnSlogan} onChange={(e) => setBurnSlogan(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" />
                      <span className="text-xs text-zinc-300">{platform === "youtube" ? "Big Bold Slogan (Max 8 words)" : "Smart Slogan (Max 8 words)"}</span>
                    </label>

                    {/* 下面这两个大马电商贴纸只在非 YouTube 平台展示 */}
                    {platform !== "youtube" && (
                      <>
                        <label className="flex items-center space-x-3 cursor-pointer bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700">
                          <input type="checkbox" checked={stickerReadyStock} onChange={(e) => setStickerReadyStock(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" />
                          <span className="text-xs text-zinc-300">🇲🇾 Ready Stock Badge</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700">
                          <input type="checkbox" checked={stickerFastShipping} onChange={(e) => setStickerFastShipping(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" />
                          <span className="text-xs text-zinc-300">🚚 Fast Shipping Badge</span>
                        </label>
                      </>
                    )}

                    {/* 如果是 YouTube 平台，展示专属的点击率爆款标签开关 */}
                    {platform === "youtube" && (
                      <label className="flex items-center space-x-3 cursor-pointer bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700">
                        <input type="checkbox" checked={stickerClickbait} onChange={(e) => setStickerClickbait(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" />
                        <span className="text-xs text-zinc-300">😱 Shocking Face Emoji Layer</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={handleGenerate} disabled={!productInfo} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3.5 rounded-xl text-sm transition-all disabled:opacity-40">
            {loading ? "Analyzing Market Trends..." : "Jom! Generate Conversion Post"}
          </button>
        </div>

        {generatedText && (
          <div className="mt-10 pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Visual Preview</h3>
              <div className="aspect-video w-full rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center relative overflow-hidden bg-cover bg-center">
                
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="text-zinc-600 text-xs z-0">
                  {platform === "youtube" ? "16:9 HD Thumbnail Container" : "1:1 Product Post Container"}
                </div>

                {/* 大马电商标签动态展示 (仅限电商平台) */}
                {platform !== "youtube" && stickerReadyStock && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-[10px] px-2 py-1 rounded border border-red-400/40">
                    🇲🇾 READY STOCK IN MY
                  </div>
                )}

{platform !== "youtube" && stickerFastShipping && (

🚚 24H FAST SHIPPING

)}
{/* YouTube 专属点击率表情包图层 */}
{platform === "youtube" && stickerClickbait && (

😱 💥

)}
{/* 底部智能大字标语 (双平台自适应提示) */}
{burnSlogan && (

{platform === "youtube" ? "⚠️ OMG! CHOCKING REVEAL" : tone === "chinese" ? "🔥 爆款特惠 LIMITED OFFER" : "🔥 PREMIUM LUXURY COLLECTION"}

)}




{platform === "youtube" ? "AI Video SEO & Script Title" : "AI Copywriting (Strict Limit)"}

{generatedText}


)}


);
}