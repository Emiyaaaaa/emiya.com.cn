'use client'
import EditorJS from '@editorjs/editorjs'
import React from 'react'

const EditorJSHolder = 'EditorJS'

function Editor({ onRef }: { onRef?: (editorInstance: EditorJS) => void }) {
  const ref = React.useRef<EditorJS>()

  React.useEffect(() => {
    // prevent re-render
    if (ref.current) return
    const editor = new EditorJS({ holder: EditorJSHolder })
    ref.current = editor
    onRef?.(editor)
  }, [])
  return <div id={EditorJSHolder}></div>
}

export default Editor
