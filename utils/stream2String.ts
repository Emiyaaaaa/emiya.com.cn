export function stream2String(stream?: ReadableStream | null) {
  if (!stream) return
  return (
    Promise.resolve(stream)
      .then((stream) => {
        const reader = stream.getReader()
        return new ReadableStream({
          start(controller) {
            function pump(): any {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close()
                  return
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value)
                return pump()
              })
            }
            return pump()
          },
        })
      })
      // Create a new response out of the stream
      .then((stream) => new Response(stream))
      // Create an object URL for the response
      .then((response) => response.blob())
      .then((blob) => blob.text())
  )
}

export async function stream2Object(stream?: ReadableStream | null) {
  if (!stream) return
  return stream2String(stream)?.then((text) => {
    try {
      const result = JSON.parse(text)
      return result
    } catch (err) {
      return text
    }
  })
}
