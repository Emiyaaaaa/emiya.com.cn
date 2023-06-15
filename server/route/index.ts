import blogRoute from './blog'
import authRoute from './auth'
import { NextResponse } from 'next/server'
import wakaTimeRoute from './wakaTime'

const route = { ...blogRoute, ...authRoute, ...wakaTimeRoute }

const serverSlideAPI = route

// typing
type ServerSideAPIInterface = typeof serverSlideAPI

type RouteKey = keyof ServerSideAPIInterface

type RouteString<T extends RouteKey> = `${T}`

interface RequestHooks {
  getResponseInit?: () => ResponseInit
  afterResponseHandler?: (response: NextResponse) => void | Promise<void>
}

// export default route
export { serverSlideAPI, type RequestHooks }
export type { ServerSideAPIInterface, RouteKey, RouteString }
