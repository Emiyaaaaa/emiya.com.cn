'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { postAPI, getAPI } from '@/utils/http'
import './index.scss'

import type { OutputData } from '@editorjs/editorjs'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEditor } from '@/components/Editor/hooks'
import { Blog } from '@/server/database/typing'

type FormInterface = Pick<Blog, 'title' | 'visibility'>

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

async function getBlog(id: string) {
  const res = await getAPI('getBlog', id).catch((err) => {
    console.error(err)
  })
  return res?.data
}

const EditorPage = ({ params }: { params: { id: string | 'new' } }) => {
  const { editorReady, editorRef, registerEditor } = useEditor()
  const [initialData, setInitialData] = React.useState<OutputData>()
  const { register, handleSubmit, watch, setValue } = useForm<FormInterface>()

  React.useEffect(() => {
    if (!editorRef.current) return
    if (!editorReady) return
    if (params.id === 'new') return
    if (!initialData) return
    editorRef.current?.render(initialData)
  }, [editorRef.current, editorReady, initialData])

  // 获取初始数据
  React.useEffect(() => {
    if (params.id !== 'new')
      getBlog(params.id).then((data) => {
        if (data && Object.keys(data).length !== 0) {
          Object.keys(data).forEach((d) => {
            const value = data[d as keyof FormInterface]
            setValue(d as keyof FormInterface, value as any)
          })
          setInitialData(JSON.parse(data.content))
        }
      })
  }, [])

  // 保存数据
  const save: SubmitHandler<FormInterface> = React.useCallback(
    async (form) => {
      const content = await editorRef.current?.save()
      if (!content) return

      const submitData = {
        ...form,
        content: JSON.stringify(content),
        author: 'test author',
      }
      if (params.id === 'new') postAPI('createBlog', submitData)
      else postAPI('updateBlog', params.id, submitData)
    },
    [editorRef.current],
  )

  // 删除数据
  const deleteBlog = React.useCallback(() => {
    editorRef.current?.save().then((data) => {
      if (params.id !== 'new') {
        postAPI('deleteBlog', params.id)
      }
    })
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(save)} className="m-6 flex flex-col">
        <div className="mx-auto w-full max-w-[650px]">
          <FormItem label="title">
            <input {...register('title', { required: true })} type="text" placeholder="title" />
          </FormItem>
          {/* select */}
          <FormItem label="visibility">
            <select {...register('visibility', { required: true })}>
              <option value={1}>true</option>
              <option value={0}>false</option>
            </select>
          </FormItem>
        </div>
        <Editor onRef={registerEditor} initialData={{ blocks: [] }}></Editor>
        <input type="submit" />
        <button onClick={deleteBlog}>delete</button>
      </form>
    </>
  )
}

function FormItem(props: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label>{props.label}： </label>
      {props.children}
    </div>
  )
}

export default EditorPage
