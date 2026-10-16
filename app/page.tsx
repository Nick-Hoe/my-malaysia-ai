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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthModalMode] = useState("login"); 
  const [userContact, setUserContact] = useState("");
  const [credits, setCredits] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userContact) return;
    setIsLoggedIn(true);
    setCredits(5); 
    setShowAuthModal(false);
  };

  const handleGenerate = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    if (credits <= 0) {
      alert("Your Free Credits running out! Please upgrade to Pro Version.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (platform === "youtube") {
        if (tone === "chinese") {
          setGeneratedText("1. 我挑战了KL最恐怖的隐藏吃播店\n2. 大马微商正在面临的3个扎心真相，难怪不赚钱...\n\nJom! 这期视频带大家沉浸式打卡马来西亚不为人知的宝藏探店。");
        } else if (tone === "malay") {
          setGeneratedText("1. Saya Cuba Makanan Paling Pedas Dekat KL\n2. Sebab Sebenar Kenapa Content Creator Dekat Malaysia Susah Cari Makan...\n\nJom! Dalam video kali ini, kami bongkar port baik yang ramai orang Malaysia tak tahu.");
        } else {
          setGeneratedText("1. I Tried The Most Dangerous Food In KL\n2. Real Reason Why Malaysian SMEs Are Secretly Failing...\n\nJom! In this video, we dive deep into the hidden spots of Malaysia.");
        }
      } else {
        if (tone === "chinese") {
          setGeneratedText("1. 大马独立品牌天花板，全网高赞爆款现货！\n2. 质感和排版直接拉满，绝不搞烂大街那一套。\n3. 本地发货极速响应，下单后24小时内必定出库。");
        } else if (tone === "malay") {
          setGeneratedText("1. Stok sedia ada di Malaysia, kualiti premium luar biasa.\n2. Penghantaran terpantas dijamin post out dalam 24 jam.\n3. Rekaan eksklusif dan amat sesuai untuk listing Shopee & TikTok Shop.");
        } else {
          setGeneratedText("1. Premium Quality Stock ready in Malaysia.\n2. Fast fulfillment within 24 hours.\n3. High-converting copywriting designed for local SME.");
        }
      }
      setCredits(prev => prev - 1); 
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative">
      <div className="absolute top-4 right-4 sm:right-8 z-10 flex items-center space-x-3">
        {isLoggedIn ? (
          <div className="flex items-center space-x-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-zinc-200">Hi, Boss! ({credits} Credits Left)</span>
          </div>
        ) : (
          <button type="button" onClick={() => { setAuthModalMode("login"); setShowAuthModal(true); }} className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold shadow-md">Sign In / Register</button>
        )}
      </div>

      <div className="max-w-4xl w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-2xl backdrop-blur-md mt-12">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">Malaysia AI create (Beta)</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Instant premium visuals and conversion copies for Malaysian Sellers & Creators.</p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Target Platform</label>
            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={() => { setPlatform("shopee"); setStickerShock(false); }} className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border ${platform === "shopee" ? "bg-orange-500 border-orange-500 text-white shadow-lg" : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400"}`}>Shopee/TikTok</button>
              <button type="button" onClick={() => { setPlatform("xiaohongshu"); setStickerShock(false); }} className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border ${platform === "xiaohongshu" ? "bg-orange-500 border-orange-500 text-white shadow-lg" : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400"}`}>Xiaohongshu/Insta</button>
              <button type="button" onClick={() => { setPlatform("youtube"); setStickerReady(false); setStickerFast(false); }} className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border ${platform === "youtube" ? "bg-red-600 border-red-600 text-white shadow-lg" : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400"}`}>YouTube Thumbnail</button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Content Tone & Language</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none font-medium">
              <option value="english">Premium English</option>
              <option value="chinese">Localized Chinese</option>
              <option value="malay">Bahasa Melayu</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">{platform === "youtube" ? "Video Topic" : "Product Name"}</label>
            <textarea value={productInfo} onChange={(e) => setProductInfo(e.target.value)} placeholder="Type here..." rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder-zinc-600 resize-none" />
          </div>

          <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-4 space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" checked={enableImageRef} onChange={(e) => setEnableImageRef(e.target.checked)} className="w-4 h-4 rounded accent-orange-500" /><span className="text-xs sm:text-sm font-semibold text-zinc-200">Enable Reference & Visual Overlay (Advanced)</span></label>
            {enableImageRef && (
              <div className="pt-4 border-t border-zinc-800 space-y-4">
                <div className="bg-zinc-950/40 p-4 rounded-xl border-2 border-dashed border-zinc-800 text-center space-y-3">
                  <span className="text-xs text-zinc-400 block font-semibold">{selectedImage ? "✓ Photo loaded!" : "Select photo from device:"}</span>
                  <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-xs text-zinc-500 cursor-pointer" />
                </div>
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800 flex flex-wrap gap-2.5">
                  <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={burnSlogan} onChange={(e) => setBurnSlogan(e.target.checked)} className="w-3.5 h-3.5 accent-orange-500" /><span className="text-xs text-zinc-300">Big Slogan</span></label>
                  {platform !== "youtube" && (
                    <div className="flex gap-2.5">
                      <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={stickerReady} onChange={(e) => setStickerReady(e.target.checked)} className="w-3.5 h-3.5 accent-orange-500" /><span className="text-xs text-zinc-300">Ready Stock</span></label>
                      <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={stickerFast} onChange={(e) => setStickerFast(e.target.checked)} className="w-3.5 h-3.5 accent-orange-500" /><span className="text-xs text-zinc-300">24H Ship</span></label>
                    </div>
                  )}
                  {platform === "youtube" && (
                    <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={stickerShock} onChange={(e) => setStickerShock(e.target.checked)} className="w-3.5 h-3.5 accent-orange-500" /><span className="text-xs text-zinc-300">Shock Face</span></label>
                  )}
                </div>
              </div>
            )}
          </div>

          <button type="button" onClick={handleGenerate} disabled={!productInfo} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm tracking-wide">Jom! Generate Assets</button>
        </div>

        {generatedText && (
          <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">

AI Visual Preview
<div className={w-full rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center relative overflow-hidden ${platform === "youtube" ? "aspect-video" : "aspect-square"}}>
{selectedImage ? (  ) : ( {platform === "youtube" ? "16:9 HD Thumbnail" : "1:1 Product Container"} )}
{platform !== "youtube" && stickerReady && READY STOCK}
{platform !== "youtube" && stickerFast && 24H SHIPPING}
{platform === "youtube" && stickerShock && Shock!}
{burnSlogan && ( {platform === "youtube" ? "OMG! SHOCKING REVEAL" : tone === "chinese" ? "LIMITED OFFER" : "PREMIUM COLLECTION"} )}



{platform === "youtube" ? "AI Video SEO Title" : "AI Copywriting"}
{generatedText}


)}
{showAuthModal && (


<button type="button" onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 text-sm font-bold">✕

{authMode === "login" ? "Welcome Back, Boss!" : "Claim 5 Free Credits"}
{authMode === "login" ? "Sign in to unlock your custom templates." : "Register today to test premium Malaysia AI engine."}


Email / WhatsApp Number
<input type="text" required value={userContact} onChange={(e) => setUserContact(e.target.value)} placeholder="e.g., alex@gmail.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white" />

Password
{authMode === "login" ? "Sign In & Unlock" : "Get My Free Credits Now"}



{authMode === "login" ? (
New seller here? <button type="button" onClick={() => setAuthModalMode("register")} className="text-orange-400 font-bold hover:underline">Create Account
) : (
Already registered? <button type="button" onClick={() => setAuthModalMode("login")} className="text-orange-400 font-bold hover:underline">Sign In Here
)}



)}

);
}
