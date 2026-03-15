# Groundwork

**Own your content. Own your stream. Own your audience.**

A self-hosted personal publishing kit for creators who are tired of being controlled by platforms.

Built for people in places where big tech companies bully small creators —  
where accounts get banned, algorithms kill your reach, and your years of work can vanish overnight.

---

## What this is

A complete toolkit that gives you:

- **Your own website** — static, fast, no monthly fees
- **Your own live stream** — broadcast without depending on YouTube, Twitch, or Bilibili
- **Your own archive** — every stream auto-saved, auto-published to your site
- **Your own CMS** — write and publish without touching code

Platforms can connect to *you*. You don't go to them.

---

## The philosophy

Big platforms need content. Content needs infrastructure.  
Most creators rent their infrastructure from the same platforms that control their reach.

This kit breaks that dependency.

```
Your camera → Your server → Your website → Your audience
                    ↕
          Platforms tap in here (optional)
```

You stay at the center. Platforms become optional distribution channels, not gatekeepers.

---

## What's inside

```
Groundwork/
├── Astro website          — fast static site, deploys to Cloudflare Pages (free)
├── Decap CMS              — browser-based content editor, no code needed
├── Live streaming         — self-hosted via nginx-rtmp + OBS
├── Auto-archive           — streams auto-convert and publish to your site
└── _tools/
    ├── nginx.conf         — streaming server config
    └── watch-recordings   — auto-transcoding + publishing script
```

---

## Stack

| Layer | Tech | Cost |
|---|---|---|
| Website | Astro | Free |
| Hosting | Cloudflare Pages | Free |
| CMS | Decap CMS | Free |
| Streaming | nginx-rtmp | Free |
| Broadcast | OBS Studio | Free |
| Domain | Any registrar | ~$10/yr |

Total running cost: **~$10/year** (just your domain)

---

## Quick start

### Prerequisites
- [Node.js](https://nodejs.org) 18+
- [OBS Studio](https://obsproject.com)
- A [Cloudflare](https://cloudflare.com) account (free)
- A domain name

### 1. Clone and install

```bash
git clone https://github.com/quanweiDu/groundwork.git
cd Groundwork
npm install
```

### 2. Start local development

Open 4 terminals:

```bash
# Terminal 1 — Website
npm run dev

# Terminal 2 — CMS backend
npx decap-server

# Terminal 3 — Streaming server (Windows)
cd _tools
.\nginx.exe

# Terminal 4 — Auto-archive
node _tools/watch-recordings.mjs
```

### 3. Configure OBS

- Service: Custom
- Server: `rtmp://localhost/live`
- Stream key: `stream`

### 4. Deploy to Cloudflare Pages

```bash
git add .
git commit -m "initial deploy"
git push
```

Connect your GitHub repo to Cloudflare Pages. Done.

---

## How live streaming works

```
OBS → nginx-rtmp (local) → HLS stream → /live page
                ↓
         auto-record .flv
                ↓
         ffmpeg transcode → .mp4
                ↓
         auto-generate markdown
                ↓
         git push → Cloudflare deploys → archive page live
```

The `/live` page auto-detects whether you're streaming.  
No code changes needed to go live or offline.

---

## Roadmap / Help wanted

This is a one-person project. Community contributions welcome:

- [ ] Docker one-click deploy
- [ ] Linux / Mac support for streaming tools
- [ ] Cloud server deploy script (VPS)
- [ ] Multi-language CMS interface
- [ ] Payment integration (Stripe / Gumroad)
- [ ] Mobile app for going live

If you can build any of these, open a PR.

---

## Who built this

Built by [MR.QuanweiDU](https://chaosgrok.com) —  
10 years drifting through coal mines, surveying, crypto, AI, and code.  
Core belief: most people's problems aren't lack of information, they're lack of a clear framework.

This kit is the framework I wish I had earlier.

---

## License

MIT — use it, modify it, sell it, do whatever you want.  
Just don't tell people they can't own their content.
