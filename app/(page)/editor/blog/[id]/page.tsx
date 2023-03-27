'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import type EditorJS from '@editorjs/editorjs'
import post from '@/utils/post'

const Editor = dynamic(() => import('@/app/component/editor'), { ssr: false })

const EditorPage = ({ params }: { params: { id: string | 'new' } }) => {
  const editorRef = React.useRef<EditorJS>()

  const saveHandler = React.useCallback(() => {
    editorRef.current?.save().then((data) => {
      if (params.id === 'new') return
      post('/api/setTechBlogById', {
        id: params.id,
        title: 'test title',
        content: JSON.stringify(data),
      })
    })
  }, [])

  return (
    <>
      <h1>Editor</h1>
      <Editor onRef={(editorInstance) => (editorRef.current = editorInstance)}></Editor>
      <div onClick={saveHandler}>save</div>
    </>
  )
}

export default EditorPage
