import { RequestHooks, serverSlideAPI } from '@/server/route'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const url = new URL(`${request.url}`)
  const requestHooks: RequestHooks = {}

  const slug = params.slug[0] as keyof typeof serverSlideAPI
  if (!slug) return NextResponse.rewrite('/404')

  const query = url.searchParams.get('params')?.split(',') ?? []

  if (serverSlideAPI[slug]) {
    try {
      const result = await (serverSlideAPI[slug] as any)(...query, requestHooks)

      const responseInit = requestHooks.getResponseInit?.() ?? {}

      const response = NextResponse.json({ data: result }, responseInit)

      await requestHooks.afterResponseHandler?.(response)

      return response
    } catch (err: any) {
      return NextResponse.json(
        { error: `get request "${slug}" error: ${err.message ?? err.code}` },
        {
          status: err.code ?? 500,
          statusText: err.message ?? err.code ?? '',
        },
      )
    }
  }

  // return 404
  return NextResponse.json({ error: `slug ${slug} not found` })
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const requestHooks: RequestHooks = {}

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

  if (serverSlideAPI[slug]) {
    try {
      const result = await (serverSlideAPI[slug] as any)(...query, requestHooks)

      const responseInit = requestHooks.getResponseInit?.() ?? {}

      const response = NextResponse.json({ data: result }, responseInit)

      await requestHooks.afterResponseHandler?.(response)

      return response
    } catch (error) {
      // 500 response code
      return NextResponse.json({ error })
    }
  }

  // return 404
  return NextResponse.json({ error: `slug ${slug} not found` })
}

export const revalidate = 300
