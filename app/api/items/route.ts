import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sessionId = searchParams.get('sessionId')

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
  }

  try {
    const userVotes = await prisma.vote.findMany({
      where: { sessionId },
      select: { itemId: true }
    })
    
    const votedItemIds = userVotes.map(v => v.itemId)

    const items = await prisma.item.findMany({
      where: {
        id: {
          notIn: votedItemIds
        }
      }
    })

    const itemsWithChoice = items.map(item => ({
      ...item,
      userChoice: null
    }))

    return NextResponse.json({ items: itemsWithChoice })
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
