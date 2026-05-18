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
const colors = ['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185']

const pets: { name: string; category: string; description: string }[] = [
  { name: 'Pug Puppy', category: 'dog', description: 'A playful little pug who loves naps and snacks.' },
  { name: 'Tabby Cat', category: 'cat', description: 'An independent tabby with a taste for adventure.' },
  { name: 'Lop Rabbit', category: 'rabbit', description: 'A gentle lop with silky ears that drag on the floor.' },
  { name: 'Parakeet', category: 'bird', description: 'A chatty parakeet who sings every morning.' },
  { name: 'Golden Retriever', category: 'dog', description: 'The friendliest dog you will ever meet. Loves fetch.' },
  { name: 'Tuxedo Cat', category: 'cat', description: 'Always dressed for a formal event. Very dignified.' },
  { name: 'Beagle', category: 'dog', description: 'Follows every scent trail and howls at the mailman.' },
  { name: 'Hamster', category: 'hamster', description: 'Tiny, fast, and obsessed with running on wheels.' },
  { name: 'Ferret', category: 'ferret', description: 'A mischievous noodle who hides your socks.' },
  { name: 'Chinchilla', category: 'chinchilla', description: 'The softest fur you have ever touched. Dust bath expert.' },
  { name: 'Cockatiel', category: 'bird', description: 'Whistles TV theme songs and demands head scratches.' },
  { name: 'Dachshund', category: 'dog', description: 'Long body, short legs, big personality.' },
  { name: 'Siamese Cat', category: 'cat', description: 'Loud, opinionated, and absolutely gorgeous.' },
  { name: 'Mini Rex Rabbit', category: 'rabbit', description: 'Velvety fur and a calm temperament. Great for cuddles.' },
  { name: 'Cockapoo', category: 'dog', description: 'A curly-haired charmer who never stops wagging.' },
  { name: 'Persian Cat', category: 'cat', description: 'A fluffy cloud of serenity. Prefers window-sitting.' },
  { name: 'Budgie', category: 'bird', description: 'A tiny acrobat who hangs upside down for fun.' },
  { name: 'Dwarf Hamster', category: 'hamster', description: 'Fits in your palm and stuffs cheeks with sunflower seeds.' },
  { name: 'Angora Ferret', category: 'ferret', description: 'Extra fluffy and extra curious about everything.' },
  { name: 'Silver Chinchilla', category: 'chinchilla', description: 'Shimmery coat and loves to bounce off walls at midnight.' },
  { name: 'Corgi', category: 'dog', description: 'Short legs, big smile, maximum zooms.' },
  { name: 'Maine Coon', category: 'cat', description: 'Basically a small lion who purrs like a tractor.' },
  { name: 'Holland Lop', category: 'rabbit', description: 'Compact, round, and ready for unlimited pets.' },
  { name: 'Canary', category: 'bird', description: 'A golden singer who fills the room with melody.' },
  { name: 'Labrador', category: 'dog', description: 'Will eat anything and love everyone unconditionally.' },
  { name: 'Bengal Cat', category: 'cat', description: 'Wild-looking but secretly a lap cat.' },
  { name: 'Flemish Giant', category: 'rabbit', description: 'A rabbit the size of a small dog. Gentle giant.' },
  { name: 'Lovebird', category: 'bird', description: 'Deeply attached to their favorite human.' },
  { name: 'Shiba Inu', category: 'dog', description: 'Much wow. Very doge. So independence.' },
  { name: 'Ragdoll Cat', category: 'cat', description: 'Goes completely limp when you pick them up. Pure trust.' },
  { name: 'Syrian Hamster', category: 'hamster', description: 'A chubby hamster who hoards treats like treasure.' },
  { name: 'Guinea Pig', category: 'guinea pig', description: 'Wheeks loudly whenever the fridge opens.' },
  { name: 'Pomeranian', category: 'dog', description: 'A tiny fluffball with the heart of a wolf.' },
  { name: 'Scottish Fold', category: 'cat', description: 'Round face, folded ears, owl-like stare.' },
  { name: 'Netherland Dwarf', category: 'rabbit', description: 'Perpetually baby-faced and absolutely adorable.' },
  { name: 'Zebra Finch', category: 'bird', description: 'Tiny but with a surprisingly big voice.' },
  { name: 'Border Collie', category: 'dog', description: 'The Einstein of dogs. Will herd your family.' },
  { name: 'Abyssinian Cat', category: 'cat', description: 'Athletic, curious, and always on top of the bookshelf.' },
  { name: 'Roborovski Hamster', category: 'hamster', description: 'The fastest hamster alive. Blink and you miss them.' },
  { name: 'Abyssinian Guinea Pig', category: 'guinea pig', description: 'Wild bedhead fur that goes in every direction.' },
  { name: 'French Bulldog', category: 'dog', description: 'Snorts, drools, and melts every heart in the room.' },
  { name: 'Sphynx Cat', category: 'cat', description: 'No fur, no shame. Loves wearing tiny sweaters.' },
  { name: 'Rex Rabbit', category: 'rabbit', description: 'Plush velvet fur and a dignified stance.' },
  { name: 'Cockatoo', category: 'bird', description: 'Screams at sunrise and demands constant attention.' },
  { name: 'Husky', category: 'dog', description: 'Talks back, escapes yards, and is dramatic about everything.' },
  { name: 'Russian Blue', category: 'cat', description: 'Elegant, shy, and devoted to exactly one person.' },
  { name: 'Teddy Guinea Pig', category: 'guinea pig', description: 'Rough-coated and always looks perpetually surprised.' },
  { name: 'Cinnamon Ferret', category: 'ferret', description: 'Warm-toned fur and a talent for getting into cabinets.' },
  { name: 'Maltese', category: 'dog', description: 'A flowing white coat and a princess attitude.' },
  { name: 'British Shorthair', category: 'cat', description: 'Round, chunky, and perpetually judging you.' },
  { name: 'Lionhead Rabbit', category: 'rabbit', description: 'A majestic mane around a tiny bunny face.' },
  { name: 'African Grey Parrot', category: 'bird', description: 'Can learn 1000 words and will use them to boss you around.' },
  { name: 'Goldendoodle', category: 'dog', description: 'Hypoallergenic, goofy, and impossible not to hug.' },
  { name: 'Birman Cat', category: 'cat', description: 'Blue eyes, white paws, and a calm demeanor.' },
  { name: 'Winter White Hamster', category: 'hamster', description: 'Changes color with the seasons. Nature is amazing.' },
  { name: 'Peruvian Guinea Pig', category: 'guinea pig', description: 'Long flowing hair that needs daily grooming.' },
  { name: 'Dalmatian', category: 'dog', description: 'Spotted, speedy, and born to ride on fire trucks.' },
  { name: 'Norwegian Forest Cat', category: 'cat', description: 'Built for winter. Fluffy enough to survive a blizzard.' },
  { name: 'English Angora Rabbit', category: 'rabbit', description: 'Basically a living cotton ball with eyes.' },
  { name: 'Sun Conure', category: 'bird', description: 'Looks like a sunset and screams like an alarm clock.' },
  { name: 'Cavalier King Charles', category: 'dog', description: 'Royalty in the streets, cuddle bug in the sheets.' },
  { name: 'Turkish Angora', category: 'cat', description: 'Graceful, silky, and surprisingly athletic.' },
  { name: 'Sable Ferret', category: 'ferret', description: 'Classic coloring and a classic troublemaker personality.' },
  { name: 'Havanese', category: 'dog', description: 'A happy little dog that prances instead of walks.' },
  { name: 'Exotic Shorthair', category: 'cat', description: 'A squishy-faced Persian without the grooming drama.' },
  { name: 'Dutch Rabbit', category: 'rabbit', description: 'Classic black-and-white markings. Very photogenic.' },
  { name: 'Macaw', category: 'bird', description: 'Big, bold, and could outlive your grandchildren.' },
  { name: 'Australian Shepherd', category: 'dog', description: 'Needs a job, a yard, and a puzzle toy at all times.' },
  { name: 'Chartreux Cat', category: 'cat', description: 'Blue-gray fur and a mysterious, quiet personality.' },
  { name: 'Chinese Hamster', category: 'hamster', description: 'Long-tailed and loves to climb everything in sight.' },
  { name: 'Skinny Guinea Pig', category: 'guinea pig', description: 'Mostly hairless and surprisingly warm to the touch.' },
  { name: 'Samoyed', category: 'dog', description: 'A cloud that barks. The original smiling dog.' },
  { name: 'Manx Cat', category: 'cat', description: 'No tail, no problem. Round as a bowling ball.' },
  { name: 'Harlequin Rabbit', category: 'rabbit', description: 'Two-toned face like a living work of art.' },
  { name: 'Quaker Parrot', category: 'bird', description: 'Builds elaborate nests and talks about it constantly.' },
  { name: 'Bernese Mountain Dog', category: 'dog', description: 'A massive teddy bear who thinks they are a lap dog.' },
  { name: 'Tonkinese Cat', category: 'cat', description: 'A perfect blend of Siamese sass and Burmese charm.' },
  { name: 'Albino Ferret', category: 'ferret', description: 'Red eyes, white fur, and zero fear of anything.' },
  { name: 'Bichon Frise', category: 'dog', description: 'A powder puff that does tricks for treats.' },
  { name: 'Bombay Cat', category: 'cat', description: 'A mini panther with copper eyes. Sleek and social.' },
  { name: 'Angora Rabbit', category: 'rabbit', description: 'Produces enough fluff to knit a sweater annually.' },
  { name: 'Eclectus Parrot', category: 'bird', description: 'Males are green, females are red. Both are gorgeous.' },
  { name: 'Miniature Schnauzer', category: 'dog', description: 'A distinguished gentleman with a fantastic beard.' },
  { name: 'Ocicat', category: 'cat', description: 'Looks wild but acts like a golden retriever.' },
  { name: 'Campbell Hamster', category: 'hamster', description: 'Social and prefers having hamster roommates.' },
  { name: 'Texel Guinea Pig', category: 'guinea pig', description: 'Curly-haired and permanently fabulous.' },
  { name: 'Weimaraner', category: 'dog', description: 'The ghost dog. Gray, graceful, and glued to your side.' },
  { name: 'Somali Cat', category: 'cat', description: 'A foxy face with a bushy tail. Very photogenic.' },
  { name: 'Himalayan Rabbit', category: 'rabbit', description: 'White body, dark points. Looks perpetually surprised.' },
  { name: 'Amazon Parrot', category: 'bird', description: 'Will sing opera in the shower if you let them.' },
  { name: 'Boxer', category: 'dog', description: 'All muscle, all heart, and absolutely no chill.' },
  { name: 'Devon Rex Cat', category: 'cat', description: 'Huge ears, wavy fur, and an alien-like charm.' },
  { name: 'Panda Ferret', category: 'ferret', description: 'Black-and-white markings and double the chaos.' },
  { name: 'Vizsla', category: 'dog', description: 'A velcro dog who refuses to be more than two feet away.' },
  { name: 'Burmese Cat', category: 'cat', description: 'Silky, compact, and follows you room to room.' },
  { name: 'Silver Fox Rabbit', category: 'rabbit', description: 'Silvery fur that sparkles in the sunlight.' },
  { name: 'Pionus Parrot', category: 'bird', description: 'The quiet parrot. Yes, they exist. A rare gem.' },
  { name: 'Great Dane', category: 'dog', description: 'Taller than most humans and scared of the vacuum.' },
  { name: 'Calico Cat', category: 'cat', description: 'Three colors, one attitude. Sassy and unpredictable.' },
  { name: 'Cocker Spaniel', category: 'dog', description: 'Long ears, soulful eyes, and a wagging tail that never stops.' },
]

async function main() {
  const dogsDir = path.join(process.cwd(), 'public', 'dogs')
  let dogFiles: string[] = []
  if (fs.existsSync(dogsDir)) {
    dogFiles = fs.readdirSync(dogsDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.webp'))
  }

  // Clear existing items
  await prisma.vote.deleteMany()
  await prisma.item.deleteMany()

  for (let i = 1; i <= 100; i++) {
    const id = `pet-${i.toString().padStart(3, '0')}`
    const pet = pets[i - 1]
    
    // Assign a real image from the dogs folder
    let imageUrl = ''
    if (dogFiles.length > 0) {
      imageUrl = `/dogs/${dogFiles[(i - 1) % dogFiles.length]}`
    } else {
      imageUrl = `/items/${id}.svg` // Fallback
    }

    await prisma.item.create({
      data: {
        id,
        name: pet.name,
        description: pet.description,
        category: pet.category,
        imageUrl,
      }
    })
  }

  console.log('Seeded 100 pets using real images from public/dogs.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
