import { setTechBlogById } from '@/server'
import { NextRequest } from 'next/server'

// setTechBlogById api
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { id, title, content } = body
  await setTechBlogById(id, title, content)
  return { statusCode: 200 }
}
