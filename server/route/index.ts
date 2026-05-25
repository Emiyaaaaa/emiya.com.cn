import type { NextResponse } from "next/server";
import wakaTimeRoute from "./wakaTime";

const route = { ...wakaTimeRoute };

const serverSlideAPI = route;

// typing
type ServerSideAPIInterface = typeof serverSlideAPI;
type RouteKey = keyof ServerSideAPIInterface;
type RouteString<T extends RouteKey> = `${T}`;
interface RequestHooks {
	getResponseInit?: () => ResponseInit;
	afterResponseHandler?: (response: NextResponse) => void | Promise<void>;
}
// typing end

// export default route
export { serverSlideAPI, type RequestHooks };
export type { ServerSideAPIInterface, RouteKey, RouteString };
