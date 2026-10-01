import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(scriptDir, '..')
const html = fs.readFileSync(path.join(root, '../appcrates-website.html'), 'utf8')
let css = html.match(/<style>([\s\S]*?)<\/style>/)[1].trim()

const teamCss = `/* team */
.team-row{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:flex-end;gap:48px}
.member{background:transparent;border:0;border-radius:0;padding:0;text-align:left;box-shadow:none;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.member:hover{transform:translateY(-4px);box-shadow:none}
.member-photo{width:min(220px,42vw);height:auto;aspect-ratio:4/5;object-fit:cover;object-position:center top;margin-bottom:16px;background:transparent}
.member h3{font-size:1.35rem;text-align:left}
.member p{color:var(--brand-ink);font-weight:700;font-size:.9rem;margin-top:4px;text-align:left}
@media (max-width:600px){
  .team-row{flex-direction:column;align-items:flex-start;gap:36px}
  .member-photo{width:min(200px,70vw)}
}

`

css = css.replace(/\/\* team \*\/[\s\S]*?(?=\/\* global \*\/)/, teamCss)
fs.mkdirSync(path.join(root, 'src/styles'), { recursive: true })
fs.writeFileSync(path.join(root, 'src/styles/site.css'), css + '\n')
console.log('Wrote site.css', css.length)
