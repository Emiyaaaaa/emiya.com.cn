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
        image: ImageTools,
        code: CodeTools,
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
