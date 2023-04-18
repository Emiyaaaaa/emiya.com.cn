import blogRoute from './blog'

const route = { ...blogRoute }

const serverSlideAPI = route

// typing
type ServerSideAPIInterface = typeof serverSlideAPI

type RouteKey = keyof ServerSideAPIInterface

type RouteString<T extends RouteKey> = `/api/${T}`

// export default route
export { serverSlideAPI }
export type { ServerSideAPIInterface, RouteKey, RouteString }
