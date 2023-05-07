import { NextRequest, NextResponse } from 'next/server'
import { serverSlideAPI } from '@/server/route'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  console.log('request.url', request.url)
  const url = new URL(`${request.url}`)

  const slug = params.slug[0] as keyof typeof serverSlideAPI
  if (!slug) return NextResponse.rewrite('/404')

  const query = url.searchParams.get('data')?.split(',') ?? []
  if (serverSlideAPI[slug]) {
    const result = await (serverSlideAPI[slug] as any)(...query)
    return NextResponse.json({ data: result })
  }

  // return 404
  return NextResponse.json({ slug })
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug[0] as keyof typeof serverSlideAPI
  if (!slug) return NextResponse.rewrite('/404')

  let query: any[] = []

  if (request.headers.get('content-type') !== 'application/json') {
    // handle form data
    query = [request]
  } else {
    // handle json data
    const json = await request.json()
    query = json.data
  }

  console.log('slug', slug)

  if (serverSlideAPI[slug]) {
    try {
      const result = await (serverSlideAPI[slug] as any)(...query)
      return NextResponse.json({ data: result })
    } catch (error) {
      // 500 response code
      return NextResponse.json({ error })
    }
  }

  // return 404
  return NextResponse.json({ slug })
}
