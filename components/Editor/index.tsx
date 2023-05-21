'use client'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import { EditorConfig } from '@editorjs/editorjs/types/configs'
import { ToolConstructable } from '@editorjs/editorjs/types/tools'
import {
  HeaderTools,
  DelimiterTools,
  ChecklistTools,
  QuoteTools,
  LinkTools,
  NestedListTools,
  ImageTools,
  CodeTools,
  InlineCodeTools,
} from './tools'
import React from 'react'
import { uploadFile } from '@/utils/upload'

const EditorJSHolder = 'EditorJS'

function Editor(props: { onRef?: (editorInstance: EditorJS) => void; initialData?: OutputData }) {
  const ref = React.useRef<EditorJS>()

  const editorConfig: EditorConfig = React.useMemo(() => {
    return {
      holder: EditorJSHolder,
      data: props.initialData,
      autofocus: true,
      // inlineToolbar: true,
      tools: {
        header: {
          class: HeaderTools as unknown as ToolConstructable,
          inlineToolbar: ['link'],
          config: {
            placeholder: 'Input a header',
            defaultLevel: 2,
          },
        },
        delimiter: DelimiterTools,
        checklist: ChecklistTools,
        quote: {
          class: QuoteTools,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        url: LinkTools,
        list: {
          class: NestedListTools,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
        image: {
          class: ImageTools,
          config: {
            endpoints: {
              byFile: '/api/upload',
              byUrl: '/api/uploadUrl',
            },
            field: 'file',
            uploader: {
              uploadByFile: (file: File) => {
                return uploadFile(file).then((res) => {
                  return {
                    success: 1,
                    file: {
                      url: 'https://' + res.Location,
                    },
                  }
                })
              },
            },
          },
        },
        code: {
          class: CodeTools,
          config: {
            placeholder: 'Enter a code',
            langaugeOptions: ['css', 'html', 'javascript', 'typescript', 'bash', 'json', 'markdown', 'tsx'],
          },
        },
        inlineCode: InlineCodeTools,
      },
    }
  }, [])

  React.useEffect(() => {
    if (ref.current) return
    const editor = new EditorJS(editorConfig)
    ref.current = editor
    props.onRef?.(editor)
  }, [])

  return <div id={EditorJSHolder}></div>
}

export default Editor
