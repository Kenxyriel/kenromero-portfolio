// Converts work samples to WebP, adds a 480px copy for small cards, and writes
// the size of every image to src/data/imageSizes.json so pages can reserve
// space before an image loads. Run after adding images: npm run images
import { readdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import sharp from 'sharp'

const PUBLIC = 'public'
// Folders whose JPG/PNG files are replaced by WebP.
const CONVERT = ['va/work', 'va/services']
// Large images that also get a 480px (or 640px for portraits) copy.
const SMALL_COPY = ['va/work', 'va/services', 'ken-romero.webp', 'ken-romero-hero.webp']
const MAX_WIDTH = 1600

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const isSmallCopy = (path) => /-(480|640)\.webp$/.test(path)
const rel = (path) => '/' + relative(PUBLIC, path).split('\\').join('/')

for (const path of walk(PUBLIC)) {
  const inConvert = CONVERT.some((dir) => rel(path).startsWith(`/${dir}/`))
  if (!inConvert || !/\.(jpe?g|png)$/i.test(path)) continue
  const out = path.replace(/\.(jpe?g|png)$/i, '.webp')
  await sharp(path).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
  unlinkSync(path)
}

for (const path of walk(PUBLIC)) {
  if (!path.endsWith('.webp') || isSmallCopy(path)) continue
  const wanted = SMALL_COPY.some((entry) => rel(path) === `/${entry}` || rel(path).startsWith(`/${entry}/`))
  if (!wanted) continue
  const width = rel(path).startsWith('/ken-romero') ? 640 : 480
  await sharp(path).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.replace(/\.webp$/, `-${width}.webp`))
}

const sizes = {}
for (const path of walk(PUBLIC).sort()) {
  if (!/\.(jpe?g|png|webp)$/i.test(path) || isSmallCopy(path) || rel(path).startsWith('/brand/')) continue
  const { width, height } = await sharp(path).metadata()
  sizes[rel(path)] = [width, height]
}
writeFileSync('src/data/imageSizes.json', JSON.stringify(sizes, null, 2) + '\n')
console.log(`Sized ${Object.keys(sizes).length} images`)
