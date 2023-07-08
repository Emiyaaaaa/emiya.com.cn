'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { postAPI, getAPI } from '@/utils/http'

import type { OutputData } from '@editorjs/editorjs'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { useEditor } from '@/components/Editor/hooks'
import { Blog } from '@/server/database/typing'
import any from '@/utils/any'
import markdown2obj from '@/utils/md2obj'

const formField: Array<keyof Blog> = ['title', 'visibility', 'en_title']
interface FormInterface extends Blog {
  tags: string[]
}

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

const EditorPage = ({ params }: { params: { id: string | 'new' } }) => {
  const { editorReady, editorRef, registerEditor } = useEditor()
  const [initialData, setInitialData] = React.useState<OutputData>()
  const { register, handleSubmit, setValue, control } = useForm<FormInterface>()
  const { fields, append } = useFieldArray<any>({ control, name: 'tags' })

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
      getAPI('getBlogById', params.id)
        .then((data) => {
          if (data && Object.keys(data).length !== 0) {
            Object.keys(data).forEach((key) => {
              if (formField.includes(any(key))) {
                const value = data[any(key)]
                setValue(any(key), any(value))
              }
              setValue('tags', data.tag?.split(';') ?? [])
            })
            setInitialData(data.old ? markdown2obj(data.content) : JSON.parse(data.content))
          }
        })
        .catch((err) => {
          console.error(err)
        })
  }, [])

  // 保存数据
  const save: SubmitHandler<FormInterface> = React.useCallback(
    async (form) => {
      const content = await editorRef.current?.save()
      if (!content) return

      const submitForm: Partial<FormInterface> = {}
      formField.forEach((field) => {
        submitForm[field] = form[field] as any
      })
      const submitData = {
        ...submitForm,
        tag: form.tags.join(';'),
        content: JSON.stringify(content),
        author: 'test author',
        old: 0,
      }
      if (params.id === 'new') postAPI('createBlog', submitData as any)
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
          <FormItem label="en_title">
            <input {...register('en_title')} type="text" placeholder="en_title" />
          </FormItem>
          {/* select */}
          <FormItem label="visibility">
            <select {...register('visibility', { required: true })}>
              <option value={1}>true</option>
              <option value={0}>false</option>
            </select>
          </FormItem>
          <FormItem label="tags">
            {fields.map((field, index) => (
              <span key={field.id}>
                <input {...register(`tags.${index}`)} list="tag-list"></input>
                <datalist id="tag-list">
                  {['React', 'HTML', 'JavaScript', 'Git', 'Next.js', 'Typescript', 'Node.js', 'CSS'].map((tag, i) => (
                    <option value={tag} key={i}></option>
                  ))}
                </datalist>
              </span>
            ))}
            <button onClick={() => append('')}>add</button>
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
