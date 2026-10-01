import fs from 'fs'

const sitePath = 'src/styles/site.css'
let css = fs.readFileSync(sitePath, 'utf8')
const pfOriginal = fs.readFileSync('scripts/original-pf.css', 'utf8').trim() + '\n'

// Live screenshot sits inside the original laptop frame
const liveShot = `
/* live screenshots inside original laptop frame */
.lap .scr > div{padding:0;height:132px}
.lap .scr-shot{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;border-radius:5px 5px 0 0}
.lap .hero-f,.lap .nav-f,.lap h6,.lap .btns{display:none}
@media (max-width:700px){
  .lap .scr > div{height:100px}
}
`

const startA = css.indexOf('/* portfolio (scroll showcase) */')
const startB = css.indexOf('/* portfolio */')
const s = startA !== -1 ? startA : startB
const end = css.indexOf('/* testimonials (tilted cards) */')
if (s === -1 || end === -1) {
  console.error('portfolio markers missing', s, end)
  process.exit(1)
}

// Keep original stage behavior but slightly tighter to reduce dead space after unpin
let restored = pfOriginal.replace('.pf-stage{height:260vh;', '.pf-stage{height:180vh;')

css = css.slice(0, s) + restored + '\n' + liveShot + '\n' + css.slice(end)

// Remove leftover marquee/pf-head overrides from responsive polish that fight original
css = css.replace(/\n\s*\.pf-stage\{height:120vh\}[\s\S]*?\.pf-badge\{width:170px;height:170px\}/g, '')
css = css.replace(/\n\s*\.pf-stage\{height:auto\}[\s\S]*?\.pf-hint\{font-size:\.68rem\}/g, '')
css = css.replace(/\n\s*\.pf\{padding:40px 0 48px\}[\s\S]*?\.pf-marquee--reverse \.pf-row\{animation-duration:32s\}/g, '')
css = css.replace(/\n\s*\.pf-cta\{padding:0 12px\}/g, '')

fs.writeFileSync(sitePath, css)
console.log('restored original portfolio CSS')
