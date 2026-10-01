import fs from 'fs'

const path = 'src/styles/site.css'
let css = fs.readFileSync(path, 'utf8')

const startA = css.indexOf('/* portfolio (scroll showcase) */')
const startB = css.indexOf('/* portfolio */')
const s = startA !== -1 ? startA : startB
const end = css.indexOf('/* testimonials (tilted cards) */')
if (s === -1 || end === -1) {
  console.error('markers missing', { s, end })
  process.exit(1)
}

const next = `/* portfolio */
.pf{padding:56px 0 64px}
.pf-head{margin-bottom:28px}
.pf-head .lede{margin-top:12px}
.pf-tracks{display:flex;flex-direction:column;gap:18px;margin-bottom:28px}
.pf-marquee{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.pf-marquee .pf-row{display:flex;gap:18px;width:max-content;animation:pfScroll 42s linear infinite;will-change:transform}
.pf-marquee--reverse .pf-row{animation-name:pfScrollReverse;animation-duration:48s}
.pf-marquee:hover .pf-row{animation-play-state:paused}
@keyframes pfScroll{to{transform:translateX(-50%)}}
@keyframes pfScrollReverse{from{transform:translateX(-50%)}to{transform:translateX(0)}}
.pf-cta{margin-top:8px}
.pf-tile{flex:none;width:380px;height:250px;border-radius:22px;padding:22px;position:relative;overflow:hidden;box-shadow:0 18px 40px -22px rgba(10,4,4,.55);transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.pf-tile:hover{transform:translateY(-6px) rotate(-.6deg)}
.pf-tile .logo-chip{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.16);backdrop-filter:blur(6px);font-family:var(--display);font-weight:800;font-size:.8rem;border:1px solid rgba(255,255,255,.22)}
.pf-tile h4{font-size:1.28rem;line-height:1.1;max-width:12ch;margin-top:14px;position:relative;z-index:2}
.pf-tile .sub{max-width:52%;display:block;font-size:.76rem;font-weight:700;opacity:.75;margin-top:8px;position:relative;z-index:2}
.pf-tile .tech{display:flex;gap:5px;margin-top:12px;position:relative;z-index:2}
.pf-tile .tech i{font-style:normal;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:.62rem;font-weight:800;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.25)}
.pf-tile--live{display:grid;grid-template-columns:1fr 1.15fr;gap:14px;align-items:stretch;padding:16px}
.pf-tile--live .pf-meta{position:relative;z-index:2;display:flex;flex-direction:column;justify-content:center;min-width:0}
.pf-tile--live h4{margin-top:10px;max-width:14ch}
.pf-shot{position:relative;z-index:1;align-self:end;border-radius:12px 12px 8px 8px;overflow:hidden;box-shadow:0 16px 36px -18px rgba(0,0,0,.55);background:#0d0d0d;transform:translateY(8px);transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.pf-tile--live:hover .pf-shot{transform:translateY(0)}
.pf-shot-bar{height:18px;display:flex;align-items:center;gap:5px;padding:0 8px;background:#1a1a1a}
.pf-shot-bar i{width:7px;height:7px;border-radius:50%;background:#3a3a3a}
.pf-shot-bar i:first-child{background:#ff5f57}
.pf-shot-bar i:nth-child(2){background:#febc2e}
.pf-shot-bar i:nth-child(3){background:#28c840}
.pf-shot img{width:100%;height:160px;object-fit:cover;object-position:top center;display:block;background:#fff}
@media (max-width:700px){
  .pf{padding:40px 0 48px}
  .pf-tile{width:280px;height:200px;padding:16px}
  .pf-tile h4{font-size:1rem}
  .pf-tile--live{grid-template-columns:1fr;padding:12px;gap:8px}
  .pf-tile--live .pf-meta{order:2}
  .pf-shot{order:1}
  .pf-shot img{height:96px}
  .pf-marquee .pf-row{animation-duration:28s}
  .pf-marquee--reverse .pf-row{animation-duration:32s}
}
@media (prefers-reduced-motion:reduce){
  .pf-marquee .pf-row{animation:none;max-width:100%;flex-wrap:wrap;justify-content:center;width:auto;padding:0 12px}
  .pf-marquee{overflow:visible;mask-image:none;-webkit-mask-image:none}
}

`

css = css.slice(0, s) + next + css.slice(end)

// Remove obsolete sticky portfolio overrides from responsive polish
css = css.replace(/\n\s*\.pf-stage\{height:120vh\}[\s\S]*?\.pf-badge\{width:170px;height:170px\}/, '')
css = css.replace(/\n\s*\.pf-stage\{height:auto\}[\s\S]*?\.pf-hint\{font-size:\.68rem\}/, '')

fs.writeFileSync(path, css)
console.log('ok')
