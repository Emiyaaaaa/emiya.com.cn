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

  const query = await request.json()

  if (serverSlideAPI[slug]) {
    const result = await (serverSlideAPI[slug] as any)(...query.data)
    return NextResponse.json(result)
  }

  // return 404
  return NextResponse.json({ slug })
}
