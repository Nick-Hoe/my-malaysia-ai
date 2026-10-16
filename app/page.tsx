'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent, FormEvent, KeyboardEvent } from 'react'
import {
  Check,
  Copy,
  Crown,
  ImagePlus,
  Loader2,
  Lock,
  Sparkles,
  Truck,
  Globe2,
  Upload,
  X,
  Zap,
  RefreshCw,
} from 'lucide-react'

type Platform = 'commerce' | 'social' | 'youtube'
type Tone = 'en' | 'zh' | 'ms'
type OverlayKey = 'slogan' | 'worldwide' | 'fastship' | 'shock'

const PLATFORMS: { id: Platform; label: string; short: string }[] = [
  { id: 'commerce', label: 'Shopee / Lazada / TikTok Shop', short: 'Marketplace' },
  { id: 'social', label: 'Xiaohongshu / Instagram', short: 'Social' },
  { id: 'youtube', label: 'YouTube Thumbnail', short: 'YouTube' },
]

const TONES: { id: Tone; label: string }[] = [
  { id: 'en', label: 'Premium English' },
  { id: 'zh', label: 'Localized Chinese' },
  { id: 'ms', label: 'Bahasa Melayu' },
]

const PLACEHOLDERS: Record<Platform, string> = {
  commerce:
    'e.g. Stainless steel insulated tumbler, 1.2L, keeps drinks cold 24h, 6 colours, RM39 flash deal, free gift wrap…',
  social:
    'e.g. Minimalist linen summer dress, soft beige tone, perfect for café hopping & beach trips, lifestyle vibe…',
  youtube:
    'e.g. I tested the cheapest vs most expensive wireless earbuds for 30 days — the result shocked me…',
}

const OVERLAYS: { id: OverlayKey; label: string; platforms: Platform[] }[] = [
  { id: 'slogan', label: 'Big Slogan Banner', platforms: ['commerce', 'social', 'youtube'] },
  { id: 'worldwide', label: 'Worldwide Shipping Badge', platforms: ['commerce', 'social'] },
  { id: 'fastship', label: '24H Fast Ship Badge', platforms: ['commerce', 'social'] },
  { id: 'shock', label: 'Shock Face Emoji', platforms: ['youtube'] },
]

const SLOGANS: Record<Tone, Record<Platform, string>> = {
  en: { commerce: 'MEGA SALE · TODAY ONLY', social: 'Your New Everyday Essential', youtube: 'YOU WON’T BELIEVE THIS' },
  zh: { commerce: '限时特惠 · 今日抢购', social: '今日份精致生活', youtube: '结果太震撼了！' },
  ms: { commerce: 'JUALAN MEGA · HARI INI', social: 'Wajib Ada Setiap Hari', youtube: 'KORANG TAK PERCAYA!' },
}

const MAX_CREDITS = 3
const MAX_FILE_BYTES = 10 * 1024 * 1024

function buildCopy(platform: Platform, tone: Tone, brief: string): string {
  const subject = brief.trim().length > 0 ? brief.trim().replace(/\s+/g, ' ').slice(0, 140) : 'your signature product'

  if (tone === 'zh') {
    if (platform === 'commerce') {
      return [
        '【标题】',
        `🔥 爆款直降｜${subject}｜正品保障 · 24小时极速发货`,
        '',
        '【卖点】',
        '✅ 严选材质，品质看得见',
        '✅ 全球包邮，送货到家',
        '✅ 7天无理由退换，购物零风险',
        '',
        '【促销钩子】',
        '前100名下单立减15%，库存告急，手慢无！',
        '',
        '【行动号召】',
        '👉 立即加入购物车，锁定今日最低价！',
        '',
        '#限时秒杀 #好物推荐 #全球包邮',
      ].join('\n')
    }
    if (platform === 'social') {
      return [
        '【标题】',
        `谁懂啊！这件宝藏好物让我回购了3次 🥹`,
        '',
        '【正文】',
        `最近被问爆的 ${subject}，`,
        '质感真的绝了，拍照超出片 📸',
        '日常通勤 / 周末约会都能轻松拿捏～',
        '',
        '【种草亮点】',
        '✨ 高级感满满，氛围感拉满',
        '✨ 平价也能拥有大牌质感',
        '',
        '【互动】',
        '姐妹们觉得值不值？评论区告诉我 👇',
        '',
        '#小红书好物 #氛围感 #平价好物 #今日穿搭',
      ].join('\n')
    }
    return [
      '【视频标题】',
      `我测试了30天…结果太震撼了！😱 ${subject}`,
      '',
      '【缩略图文案】',
      '真的假的？！',
      '',
      '【描述前两行】',
      `这期视频我把 ${subject} 实测到底，`,
      '最后的结果连我自己都没想到…一定要看到最后！',
      '',
      '【章节】',
      '00:00 开场悬念',
      '01:12 开箱实测',
      '05:40 意想不到的结果',
      '',
      '#开箱 #实测 #必看',
    ].join('\n')
  }

  if (tone === 'ms') {
    if (platform === 'commerce') {
      return [
        '[TAJUK PRODUK]',
        `🔥 HARGA TERBAIK | ${subject} | Ori 100% · Pos 24 Jam`,
        '',
        '[KELEBIHAN]',
        '✅ Kualiti premium, tahan lama',
        '✅ Penghantaran ke seluruh dunia',
        '✅ Jaminan pulangan 7 hari tanpa soal',
        '',
        '[TAWARAN]',
        'Diskaun 15% untuk 100 pembeli pertama — stok terhad!',
        '',
        '[CTA]',
        '👉 Jom tekan "Beli Sekarang" sebelum habis!',
        '',
        '#JualanKilat #BarangViral #PosPercuma',
      ].join('\n')
    }
    if (platform === 'social') {
      return [
        '[HOOK]',
        'Serius, ni barang paling berbaloi aku beli tahun ni 🥹',
        '',
        '[CAPTION]',
        `Ramai DM tanya pasal ${subject} —`,
        'kualiti dia memang tip-top, gambar pun cantik gila 📸',
        'Sesuai untuk kerja, lepak, dan jalan-jalan!',
        '',
        '[HIGHLIGHT]',
        '✨ Nampak mahal, harga mesra poket',
        '✨ Stok baru sampai minggu ni',
        '',
        '[ENGAGEMENT]',
        'Korang rasa okay tak? Komen kat bawah 👇',
        '',
        '#BarangViral #OOTD #ShoppingMalaysia',
      ].join('\n')
    }
    return [
      '[TAJUK VIDEO]',
      `Aku Uji Selama 30 Hari… Keputusan Dia MENGEJUTKAN! 😱 ${subject}`,
      '',
      '[TEKS THUMBNAIL]',
      'BIAR BETUL?!',
      '',
      '[DESKRIPSI]',
      `Dalam video ni aku test ${subject} habis-habisan.`,
      'Tengok sampai habis — ending dia memang tak sangka!',
      '',
      '[BAB]',
      '00:00 Intro',
      '01:12 Unboxing & ujian',
      '05:40 Keputusan mengejutkan',
      '',
      '#Review #Unboxing #MalaysiaYouTuber',
    ].join('\n')
  }

  if (platform === 'commerce') {
    return [
      '[PRODUCT TITLE]',
      `🔥 Best Seller | ${subject} | Authentic · Ships in 24H`,
      '',
      '[KEY BENEFITS]',
      '✅ Premium-grade materials, built to last',
      '✅ Worldwide shipping, tracked to your door',
      '✅ 7-day hassle-free returns',
      '',
      '[OFFER HOOK]',
      'First 100 orders get 15% OFF — limited stock remaining.',
      '',
      '[CALL TO ACTION]',
      '👉 Add to cart now and lock in today’s lowest price.',
      '',
      '#FlashSale #MustHave #FreeShipping',
    ].join('\n')
  }
  if (platform === 'social') {
    return [
      '[HOOK]',
      'The one purchase I keep recommending to everyone 🤍',
      '',
      '[CAPTION]',
      `Everyone keeps asking about ${subject} —`,
      'the quality is unreal and it photographs beautifully 📸',
      'Effortless from morning coffee to weekend getaways.',
      '',
      '[HIGHLIGHTS]',
      '✨ Looks luxe, priced for real life',
      '✨ New drop just landed this week',
      '',
      '[ENGAGEMENT]',
      'Would you wear / use this? Tell me below 👇',
      '',
      '#EverydayEssentials #AestheticFinds #ShopSmall',
    ].join('\n')
  }
  return [
    '[VIDEO TITLE]',
    `I Tested It for 30 Days… The Result SHOCKED Me 😱 ${subject}`,
    '',
    '[THUMBNAIL TEXT]',
    'WAIT, WHAT?!',
    '',
    '[DESCRIPTION — FIRST 2 LINES]',
    `I pushed ${subject} to the absolute limit.`,
    'Stay until the end — nobody expected this outcome.',
    '',
    '[CHAPTERS]',
    '00:00 The setup',
    '01:12 Unboxing & first test',
    '05:40 The shocking result',
    '',
    '#Review #Tested #MustWatch',
  ].join('\n')
}

function isValidContact(value: string): boolean {
  const trimmed = value.trim()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const phoneDigits = trimmed.replace(/[\s\-()+]/g, '')
  const phonePattern = /^\d{7,15}$/
  return emailPattern.test(trimmed) || phonePattern.test(phoneDigits)
}

export default function Page() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [credits, setCredits] = useState(0)
  const [authOpen, setAuthOpen] = useState(false)
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [upgradeRequested, setUpgradeRequested] = useState(false)
  const [contact, setContact] = useState('')
  const [contactError, setContactError] = useState('')

  const [platform, setPlatform] = useState<Platform>('commerce')
  const [tone, setTone] = useState<Tone>('en')
  const [brief, setBrief] = useState('')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageName, setImageName] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [overlays, setOverlays] = useState<Record<OverlayKey, boolean>>({
    slogan: false,
    worldwide: false,
    fastship: false,
    shock: false,
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const contactInputRef = useRef<HTMLInputElement>(null)
  const generateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toneId = useId()
  const briefId = useId()
  const contactId = useId()

  const isLocked = isAuthed && credits <= 0
  const visibleOverlays = OVERLAYS.filter((o) => o.platforms.includes(platform))
  const isOverlayActive = (key: OverlayKey) =>
    overlays[key] && OVERLAYS.some((o) => o.id === key && o.platforms.includes(platform))

  useEffect(() => {
    const shouldLock = authOpen || paywallOpen
    document.body.style.overflow = shouldLock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [authOpen, paywallOpen])

  useEffect(() => {
    if (authOpen) contactInputRef.current?.focus()
  }, [authOpen])

  useEffect(() => {
    return () => {
      if (generateTimerRef.current) clearTimeout(generateTimerRef.current)
    }
  }, [])

  const requireAuth = useCallback(
    (action: () => void) => {
      if (!isAuthed) {
        setAuthOpen(true)
        return
      }
      if (credits <= 0) {
        setPaywallOpen(true)
        return
      }
      action()
    },
    [isAuthed, credits],
  )

  const handleAuthSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValidContact(contact)) {
      setContactError('Please enter a valid email address or mobile number.')
      return
    }
    setContactError('')
    setIsAuthed(true)
    setCredits(MAX_CREDITS)
    setAuthOpen(false)
  }

  const handleContactKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) {
      event.preventDefault()
    }
  }

  const readImageFile = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setUploadError('Unsupported file. Please choose a PNG, JPG, WEBP or GIF image.')
      return
    }
    if (file.size > MAX_FILE_BYTES) {
      setUploadError('Image is larger than 10MB. Please choose a smaller file.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSrc(reader.result)
        setImageName(file.name)
        setUploadError('')
      }
    }
    reader.onerror = () => setUploadError('Could not read that file. Please try another image.')
    reader.readAsDataURL(file)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    readImageFile(event.target.files?.[0])
    event.target.value = ''
  }

  const openFilePicker = () => requireAuth(() => fileInputRef.current?.click())

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (isAuthed && !isLocked) setIsDragging(true)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    requireAuth(() => readImageFile(file))
  }

  const toggleOverlay = (key: OverlayKey) =>
    requireAuth(() => setOverlays((prev) => ({ ...prev, [key]: !prev[key] })))

  const handleGenerate = () =>
    requireAuth(() => {
      if (isGenerating) return
      setIsGenerating(true)
      setOutput('')
      setCopied(false)
      generateTimerRef.current = setTimeout(() => {
        setOutput(buildCopy(platform, tone, brief))
        setIsGenerating(false)
        setCredits((prev) => {
          const next = Math.max(prev - 1, 0)
          if (next === 0) setPaywallOpen(true)
          return next
        })
      }, 1800)
    })

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 selection:bg-amber-400/30">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.14),transparent_65%)]"
      />

      <header className="sticky top-0 z-30 border-b border-amber-400/15 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="flex min-w-0 items-center gap-2.5" aria-label="AI create home">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.35)]">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <span className="truncate text-lg font-semibold tracking-tight">
              AI create
              <span className="ml-2 rounded-full border border-amber-400/40 px-2 py-0.5 align-middle text-[10px] font-medium uppercase tracking-widest text-amber-300">
                Beta
              </span>
            </span>
          </a>

          {isAuthed ? (
            <div
              className="flex shrink-0 items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.25)] sm:px-4 sm:text-sm"
              aria-live="polite"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 text-[11px] font-bold text-slate-950">
                B
              </span>
              <span>
                Hi, Boss! ({credits} {credits === 1 ? 'Credit' : 'Credits'} Left)
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="shrink-0 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(251,191,36,0.35)] transition hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(251,191,36,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
            <Globe2 className="size-3.5" aria-hidden="true" />
            Worldwide AI Marketing Studio
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Create assets that{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
              sell everywhere
            </span>
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
            Instant premium visuals and conversion copies for Global Sellers &amp; Content Creators Worldwide
          </p>
        </section>

        <section
          aria-labelledby="config-heading"
          className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-2xl shadow-black/40 sm:mt-12 sm:p-6 lg:p-8"
        >
          <h2 id="config-heading" className="sr-only">
            Asset configuration
          </h2>

          <div role="tablist" aria-label="Target platform" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PLATFORMS.map((p) => {
              const active = p.id === platform
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPlatform(p.id)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                    active
                      ? 'border-amber-400/70 bg-amber-400/10 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.18)]'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-amber-400/40 hover:text-slate-200'
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-[0.2em] opacity-70">{p.short}</span>
                  <span className="mt-0.5 block">{p.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <div className="flex flex-col gap-5 lg:col-span-2">
              <div>
                <label htmlFor={toneId} className="mb-2 block text-sm font-medium text-slate-300">
                  Content Tone
                </label>
                <select
                  id={toneId}
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:border-amber-400/40 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                >
                  {TONES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={briefId} className="mb-2 block text-sm font-medium text-slate-300">
                  Product / Video Brief
                </label>
                <textarea
                  id={briefId}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder={PLACEHOLDERS[platform]}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm leading-relaxed text-slate-100 placeholder:text-slate-600 transition hover:border-amber-400/40 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-slate-300">Design Element Overlays</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {visibleOverlays.map((o) => {
                    const checked = overlays[o.id]
                    return (
                      <label
                        key={o.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                          checked
                            ? 'border-amber-400/60 bg-amber-400/10 text-amber-100'
                            : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-amber-400/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleOverlay(o.id)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition peer-focus-visible:ring-2 peer-focus-visible:ring-amber-300 ${
                            checked ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-600'
                          }`}
                        >
                          {checked && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        {o.label}
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            </div>

            <div className="lg:col-span-3">
              <span className="mb-2 block text-sm font-medium text-slate-300">Source Image</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />
              <div
                role="button"
                tabIndex={0}
                aria-label={imageSrc ? `Replace uploaded image ${imageName}` : 'Upload an image'}
                onClick={openFilePicker}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openFilePicker()
                  }
                }}
                onDragOver={handleDragOver}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`group relative flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:min-h-80 ${
                  isDragging
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-slate-700 bg-slate-950/60 hover:border-amber-400/60 hover:bg-slate-950'
                }`}
              >
                {imageSrc ? (
                  <>
                    <img
                      src={imageSrc}
                      alt={`Uploaded asset ${imageName}`}
                      className="absolute inset-0 size-full object-cover opacity-40 transition group-hover:opacity-30"
                    />
                    <div className="relative flex flex-col items-center gap-2">
                      <span className="flex size-12 items-center justify-center rounded-full border border-amber-400/50 bg-slate-950/80 text-amber-300">
                        <RefreshCw className="size-5" aria-hidden="true" />
                      </span>
                      <p className="max-w-full truncate text-sm font-medium text-slate-100">{imageName}</p>
                      <p className="text-xs text-slate-300">Click or drop to replace</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <span className="flex size-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.35)]">
                      {isAuthed ? <ImagePlus className="size-6" aria-hidden="true" /> : <Lock className="size-6" aria-hidden="true" />}
                    </span>
                    <p className="text-base font-medium text-slate-100">Drag &amp; drop your product shot</p>
                    <p className="text-sm text-slate-400">
                      or <span className="font-medium text-amber-300 underline-offset-4 group-hover:underline">browse your files</span>
                    </p>
                    <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 10MB · processed 100% in your browser</p>
                  </div>
                )}
              </div>
              {uploadError && (
                <p role="alert" className="mt-2 text-sm text-red-400">
                  {uploadError}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 px-6 py-4 text-base font-semibold text-slate-950 shadow-[0_0_32px_rgba(251,191,36,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(251,191,36,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 sm:text-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                Generating premium assets…
              </>
            ) : (
              <>
                <Zap className="size-5" aria-hidden="true" />
                Jom! Generate High-Converting Assets
              </>
            )}
          </button>
        </section>

        <section aria-labelledby="preview-heading" className="mt-10">
          <h2 id="preview-heading" className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
            Live Preview Dashboard
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <header className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-200">AI Visual Preview</h3>
                <span className="rounded-full border border-slate-700 px-2 py-0.5 font-mono text-[11px] text-slate-400">
                  {platform === 'youtube' ? '16:9' : '1:1'}
                </span>
              </header>
              <div
                className={`relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 transition-[aspect-ratio] duration-500 ${
                  platform === 'youtube' ? 'aspect-video' : 'aspect-square'
                }`}
                style={
                  imageSrc
                    ? { backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : undefined
                }
                role="img"
                aria-label={imageSrc ? 'Composited preview of your uploaded image with selected overlays' : 'Empty preview canvas'}
              >
                {!imageSrc && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,rgba(30,41,59,0.6)_25%,transparent_25%,transparent_50%,rgba(30,41,59,0.6)_50%,rgba(30,41,59,0.6)_75%,transparent_75%)] bg-[length:24px_24px] text-slate-500">
                    <Upload className="size-6" aria-hidden="true" />
                    <p className="text-xs">Upload an image to start compositing</p>
                  </div>
                )}

                {isOverlayActive('slogan') && (
                  <div className="absolute inset-x-0 bottom-[8%] flex justify-center px-3">
                    <p className="max-w-[92%] -rotate-2 rounded-md bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 px-3 py-1.5 text-center text-sm font-black uppercase tracking-tight text-slate-950 shadow-[0_6px_24px_rgba(0,0,0,0.5)] sm:px-5 sm:py-2 sm:text-xl">
                      {SLOGANS[tone][platform]}
                    </p>
                  </div>
                )}

                {isOverlayActive('worldwide') && (
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-slate-950/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200 backdrop-blur sm:text-xs">
                    <Globe2 className="size-3.5" aria-hidden="true" />
                    Worldwide Shipping
                  </div>
                )}

                {isOverlayActive('fastship') && (
                  <div className="absolute right-3 top-3 flex size-16 rotate-12 flex-col items-center justify-center rounded-full bg-red-600 text-center text-white shadow-[0_6px_20px_rgba(0,0,0,0.5)] ring-2 ring-amber-300 sm:size-20">
                    <Truck className="size-4 sm:size-5" aria-hidden="true" />
                    <span className="text-sm font-black leading-none sm:text-base">24H</span>
                    <span className="text-[8px] font-bold uppercase sm:text-[10px]">Fast Ship</span>
                  </div>
                )}

                {isOverlayActive('shock') && (
                  <div className="absolute right-[5%] top-1/2 -translate-y-1/2 select-none text-6xl drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)] sm:text-7xl lg:text-8xl" aria-hidden="true">
                    😱
                  </div>
                )}
              </div>
            </article>

            <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <header className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-200">AI Copywriting Framework</h3>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!output}
                  className="flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-300 transition hover:border-amber-400/60 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </header>
              <div className="relative min-h-72 flex-1 overflow-hidden rounded-xl border border-slate-800 bg-black/60">
                <div className="flex items-center gap-1.5 border-b border-slate-800 px-3 py-2" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-slate-700" />
                  <span className="size-2.5 rounded-full bg-slate-700" />
                  <span className="size-2.5 rounded-full bg-amber-400/70" />
                  <span className="ml-2 font-mono text-[11px] text-slate-500">
                    output.{tone}.{platform}.txt
                  </span>
                </div>
                <div aria-live="polite" className="max-h-[28rem] overflow-auto p-4">
                  {isGenerating ? (
                    <div className="space-y-2.5 font-mono text-xs text-amber-300/80">
                      <p>{'> analysing brief & platform signals…'}</p>
                      <p className="animate-pulse">{'> composing localized conversion hooks…'}</p>
                      <div className="mt-4 space-y-2">
                        <div className="h-3 w-3/4 animate-pulse rounded bg-slate-800" />
                        <div className="h-3 w-full animate-pulse rounded bg-slate-800" />
                        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-800" />
                        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-800" />
                      </div>
                    </div>
                  ) : output ? (
                    <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-slate-200 animate-in fade-in duration-500">
                      {output}
                    </pre>
                  ) : (
                    <p className="font-mono text-xs leading-relaxed text-slate-500">
                      {'// Your high-converting copy will appear here.'}
                      <br />
                      {'// Choose a platform & tone, then hit Generate.'}
                    </p>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        AI create (Beta) · Images are processed locally in your browser and never uploaded.
      </footer>

      {authOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setAuthOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setAuthOpen(false)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-amber-400/30 bg-slate-950 p-6 shadow-[0_0_60px_rgba(251,191,36,0.15)] animate-in zoom-in-95 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setAuthOpen(false)}
              className="absolute right-4 top-4 rounded-md p-1 text-slate-500 transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-yellow-600 text-slate-950">
              <Lock className="size-5" aria-hidden="true" />
            </span>
            <h2 id="auth-title" className="mt-5 text-2xl font-semibold tracking-tight">
              Unlock AI create
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Register with your email or mobile number to get{' '}
              <span className="font-semibold text-amber-300">3 free generation credits</span>.
            </p>
            <form onSubmit={handleAuthSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor={contactId} className="mb-2 block text-sm font-medium text-slate-300">
                  Email or Mobile Phone
                </label>
                <input
                  ref={contactInputRef}
                  id={contactId}
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value)
                    if (contactError) setContactError('')
                  }}
                  onKeyDown={handleContactKeyDown}
                  placeholder="you@brand.com or +60 12 345 6789"
                  aria-invalid={Boolean(contactError)}
                  aria-describedby={contactError ? `${contactId}-error` : undefined}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
                {contactError && (
                  <p id={`${contactId}-error`} role="alert" className="mt-2 text-sm text-red-400">
                    {contactError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(251,191,36,0.35)] transition hover:shadow-[0_0_36px_rgba(251,191,36,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Get Free Trial
              </button>
              <p className="text-center text-xs text-slate-500">No credit card required.</p>
            </form>
          </div>
        </div>
      )}

      {paywallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="paywall-title"
            aria-describedby="paywall-desc"
            className="w-full max-w-md rounded-2xl border border-amber-400/40 bg-slate-950 p-6 text-center shadow-[0_0_80px_rgba(251,191,36,0.2)] animate-in zoom-in-95 sm:p-8"
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-600 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.45)]">
              <Crown className="size-7" aria-hidden="true" />
            </span>
            <h2 id="paywall-title" className="mt-5 text-2xl font-semibold tracking-tight">
              {"You're out of credits, Boss"}
            </h2>
            <p id="paywall-desc" className="mt-2 text-sm leading-relaxed text-slate-400">
              {"You've used all 3 free generations. Upgrade to the Pro plan for unlimited premium visuals, every language, and priority rendering."}
            </p>
            <ul className="mt-6 space-y-2 text-left text-sm text-slate-300">
              {['Unlimited AI generations', 'All platforms & overlay packs', 'HD export without watermark'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-amber-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setUpgradeRequested(true)}
              autoFocus
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(251,191,36,0.35)] transition hover:shadow-[0_0_36px_rgba(251,191,36,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Upgrade to Pro
            </button>
            {upgradeRequested && (
              <p role="status" className="mt-3 text-xs text-amber-200">
                {"Thanks, Boss! You're on the Pro early-access list — we'll reach out shortly."}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
