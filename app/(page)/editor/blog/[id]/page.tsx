'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { post, get } from '@/server/http'

import type EditorJS from '@editorjs/editorjs'
import type { OutputData } from '@editorjs/editorjs'
import axios from 'axios'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

async function getBlog(id: string) {
  const res = await get('/api/getBlog', id).catch((err) => {
    console.error(err)
  })
  return res?.data ? JSON.parse(res.data.content) : undefined
}

const EditorPage = ({ params }: { params: { id: string | 'new' } }) => {
  const editorRef = React.useRef<EditorJS>()
  const [initialData, setInitialData] = React.useState<OutputData>()

  React.useEffect(() => {
    if (params.id === 'new') {
      setInitialData({ blocks: [] })
    } else {
      getBlog(params.id).then((data) => setInitialData(data))
    }
  }, [])

  const saveHandler = React.useCallback(() => {
    editorRef.current?.save().then((data) => {
      if (params.id === 'new') {
        post('/api/createBlog', {
          title: 'test title',
          content: JSON.stringify(data),
          author: 'test author',
        })
      } else {
        post('/api/updateBlog', params.id, {
          title: 'test title',
          content: JSON.stringify(data),
        })
      }
    })
  }, [])

  const deleteHandler = React.useCallback(() => {
    editorRef.current?.save().then((data) => {
      if (params.id === 'new') {
        console.log('new blog')
      } else {
        post('/api/deleteBlog', params.id)
      }
    })
  }, [])

  return (
    <>
      <div className="m-6">
        {initialData && <Editor onRef={(editorInstance) => (editorRef.current = editorInstance)} initialData={initialData}></Editor>}
        <button onClick={saveHandler}>save</button>
        <button onClick={deleteHandler}>delete</button>
      </div>
    </>
  )
}

export default EditorPage
