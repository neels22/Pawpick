import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sort = searchParams.get('sort') || 'mostLoved'

  try {
    const items = await prisma.item.findMany({
      include: {
        votes: true
      }
    })

    const results = items.map(item => {
      let yesCount = 0
      let noCount = 0

      for (const vote of item.votes) {
        if (vote.choice === 'yes') yesCount++
        else if (vote.choice === 'no') noCount++
      }

      const totalVotes = yesCount + noCount
      const yesRate = totalVotes > 0 ? yesCount / totalVotes : 0

      return {
        itemId: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        imageUrl: item.imageUrl,
        yesCount,
        noCount,
        totalVotes,
        yesRate
      }
    })

    results.sort((a, b) => {
      if (sort === 'mostLoved') {
        if (b.yesRate !== a.yesRate) return b.yesRate - a.yesRate
        return b.totalVotes - a.totalVotes
      } else if (sort === 'mostVoted') {
        if (b.totalVotes !== a.totalVotes) return b.totalVotes - a.totalVotes
        return b.yesRate - a.yesRate
      } else if (sort === 'mostDivisive') {
        const aDiv = Math.abs(a.yesRate - 0.5)
        const bDiv = Math.abs(b.yesRate - 0.5)
        
        if (a.totalVotes === 0 && b.totalVotes > 0) return 1
        if (b.totalVotes === 0 && a.totalVotes > 0) return -1
        
        if (aDiv !== bDiv) return aDiv - bDiv
        return b.totalVotes - a.totalVotes
      }
      return 0
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Error fetching results:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
