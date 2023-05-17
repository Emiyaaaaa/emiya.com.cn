import type EditorJS from '@editorjs/editorjs'
import React from 'react'

const useEditor = () => {
  const ref = React.useRef<EditorJS>()
  const [ready, setReady] = React.useState(false)

  const registerEditor = React.useCallback((editor: EditorJS) => {
    ref.current = editor
    editor.isReady.then(() => setReady(true))
  }, [])

  return { editorReady: ready, editorRef: ref, registerEditor }
}

export { useEditor }
