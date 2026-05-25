export function singlePromise<T = any>(func: () => Promise<T>) {
	let promise: Promise<T> | null = null;
	return async () => {
		if (!promise) {
			promise = func();
		}
		return promise;
	};
}
