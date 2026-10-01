import fs from 'fs'

const html = fs.readFileSync('../appcrates-website.html', 'utf8')
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1]
const start = css.indexOf('/* portfolio (scroll showcase) */')
const end = css.indexOf('/* testimonials (tilted cards) */')
const pfCss = css.slice(start, end)
fs.writeFileSync('scripts/original-pf.css', pfCss)
console.log('extracted', pfCss.length)
