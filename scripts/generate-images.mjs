/**
 * AI Image Generator — uses Google Imagen 3 via AI Studio API
 * Run: node scripts/generate-images.mjs
 * Images saved to: public/images/
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '../public/images')

// ⚠️  Store this in .env.local as IMAGEN_API_KEY — do not commit
const API_KEY = process.env.IMAGEN_API_KEY || 'AIzaSyBpr0z9TYVSxZ5OUZMdG9ZaesBMTFQ-iww'
const IMAGEN_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`

const IMAGES = [
  {
    filename: 'hero-family.jpg',
    aspectRatio: '16:9',
    prompt:
      'Professional lifestyle photography, young Singaporean Chinese couple both holding their newborn baby together in a modern bright Singapore apartment, warm afternoon golden hour light, shallow depth of field bokeh background, joyful calm expressions, soft teal and warm neutral tones, photorealistic high quality stock photography, no text',
  },
  {
    filename: 'maternity-mother.jpg',
    aspectRatio: '4:3',
    prompt:
      'Professional lifestyle photography, young Singaporean Chinese pregnant woman sitting peacefully in a beautifully decorated modern nursery, soft natural window light, calm serene expression with hands on belly, white and sage green tones, professional stock photo quality, photorealistic, no text',
  },
  {
    filename: 'paternity-father.jpg',
    aspectRatio: '4:3',
    prompt:
      'Professional lifestyle photography, young Singaporean Indian father tenderly holding newborn baby against his chest in a bright modern hospital room, warm soft light, emotional loving expression, photorealistic high quality stock photography, no text',
  },
  {
    filename: 'spl-couple.jpg',
    aspectRatio: '16:9',
    prompt:
      'Professional lifestyle photography, young multiracial Singaporean couple Chinese and Malay sitting together on a couch both holding their infant baby, bright modern living room, natural daylight, both smiling at baby, warm family moment, photorealistic stock photography quality, no text',
  },
  {
    filename: 'childcare-parent.jpg',
    aspectRatio: '4:3',
    prompt:
      'Professional lifestyle photography, Singaporean Malay mother laughing with her smiling toddler at a bright Singapore playground, sunny daytime, vibrant natural colors, warm light, genuine joy, high quality photorealistic stock photography, no text',
  },
  {
    filename: 'baby-bonus.jpg',
    aspectRatio: '4:3',
    prompt:
      'Professional lifestyle photography, happy Singaporean Chinese family of three, mother father and newborn baby, celebrating at home, confetti and soft decorations, warm indoor light, joyful expressions, photorealistic lifestyle stock photography quality, no text',
  },
  {
    filename: 'guides-family.jpg',
    aspectRatio: '16:9',
    prompt:
      'Professional lifestyle editorial photography, diverse Singaporean family walking together outdoors in Gardens by the Bay Singapore, parents with two young children ages 2 and 4, golden hour sunset light, lush greenery background, warm joyful atmosphere, photorealistic high quality stock photography, no text',
  },
  {
    filename: 'trust-about.jpg',
    aspectRatio: '1:1',
    prompt:
      'Professional lifestyle photography, Singaporean Chinese woman in her 30s reviewing documents on a laptop at a clean bright home office desk, natural window light, focused professional expression, minimal modern interior, photorealistic stock photography quality, no text',
  },
]

async function generateImage(image) {
  const outputPath = join(OUTPUT_DIR, image.filename)
  if (existsSync(outputPath)) {
    console.log(`\n⏭️  Skipping (exists): ${image.filename}`)
    return true
  }
  console.log(`\n⏳ Generating: ${image.filename}`)
  console.log(`   Prompt: ${image.prompt.substring(0, 80)}...`)

  const response = await fetch(IMAGEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: image.prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: image.aspectRatio,
        safetySetting: 'block_low_and_above',
        personGeneration: 'allow_all',
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error(`   ❌ Failed: ${response.status} — ${error}`)
    return false
  }

  const data = await response.json()
  const base64 = data?.predictions?.[0]?.bytesBase64Encoded

  if (!base64) {
    console.error('   ❌ No image data. Full response:', JSON.stringify(data, null, 2))
    return false
  }

  writeFileSync(outputPath, Buffer.from(base64, 'base64'))
  console.log(`   ✅ Saved: public/images/${image.filename}`)
  return true
}

async function main() {
  console.log('🎨 Imagen 3 — Site Image Generator')
  console.log('====================================')
  mkdirSync(OUTPUT_DIR, { recursive: true })

  let success = 0
  let failed = 0

  for (const image of IMAGES) {
    const ok = await generateImage(image)
    if (ok) success++
    else failed++
    // Rate limit: 1 request/second to stay within free tier
    await new Promise(r => setTimeout(r, 1200))
  }

  console.log('\n====================================')
  console.log(`✅ Generated: ${success}/${IMAGES.length} images`)
  if (failed > 0) console.log(`❌ Failed: ${failed} images`)
  console.log('\nImages saved to: public/images/')
  console.log('Next: update page.tsx components to use these local paths')
}

main().catch(console.error)
