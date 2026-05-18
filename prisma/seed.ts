import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

function generateSvg(color: string, letter: string): string {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">',
    `  <rect width="100" height="100" fill="${color}"/>`,
    `  <text x="50" y="50" dominant-baseline="middle"`,
    `    text-anchor="middle" font-size="40"`,
    `    fill="white" font-family="sans-serif">${letter}</text>`,
    '</svg>',
  ].join('\n');
}

const categories = ['dog', 'cat', 'rabbit', 'bird', 'hamster', 'ferret', 'chinchilla', 'guinea pig']
const names = ['Buddy', 'Luna', 'Charlie', 'Bella', 'Max', 'Milo', 'Lucy', 'Bailey', 'Daisy', 'Cooper', 'Rocky', 'Lola', 'Sadie', 'Stella', 'Oliver', 'Chloe', 'Zeus', 'Penny', 'Zoey', 'Duke']
const colors = ['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185']

async function main() {
  const itemsDir = path.join(process.cwd(), 'public', 'items')
  if (!fs.existsSync(itemsDir)) {
    fs.mkdirSync(itemsDir, { recursive: true })
  }

  // Clear existing items
  await prisma.vote.deleteMany()
  await prisma.item.deleteMany()

  for (let i = 1; i <= 100; i++) {
    const id = `pet-${i.toString().padStart(3, '0')}`
    const category = categories[i % categories.length]
    const baseName = names[i % names.length]
    const name = `${baseName} the ${category}`
    const description = `A wonderful ${category} looking for a loving home. Extremely friendly and playful.`
    const imageUrl = `/items/${id}.svg`
    
    const color = colors[i % colors.length]
    const letter = baseName.charAt(0).toUpperCase()
    const svgContent = generateSvg(color, letter)
    
    fs.writeFileSync(path.join(itemsDir, `${id}.svg`), svgContent)

    await prisma.item.create({
      data: {
        id,
        name,
        description,
        category,
        imageUrl,
      }
    })
  }

  console.log('Seeded 100 pets and generated SVGs.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
