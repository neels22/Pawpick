import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { itemId, choice, sessionId, decisionMs } = body

    if (!itemId || !choice || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (choice !== 'yes' && choice !== 'no') {
      return NextResponse.json({ error: 'Invalid choice' }, { status: 400 })
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId }
    })

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    await prisma.vote.upsert({
      where: {
        sessionId_itemId: {
          sessionId,
          itemId
        }
      },
      update: {
        choice,
        decisionMs: decisionMs ? Number(decisionMs) : null
      },
      create: {
        sessionId,
        itemId,
        choice,
        decisionMs: decisionMs ? Number(decisionMs) : null
      }
    })

    return NextResponse.json({ ok: true, itemId, choice })
  } catch (error) {
    console.error('Error recording vote:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
