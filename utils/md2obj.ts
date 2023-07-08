import type { OutputData, OutputBlockData } from '@editorjs/editorjs'

export function line2obj(markdownline: string): OutputBlockData[] | OutputBlockData {
  // header block
  if (markdownline.match(/^#/)) {
    const res = markdownline.match(/^(?<header>#+)(?<text>.*)/)
    return {
      type: 'header',
      data: {
        text: res?.groups?.text ?? '',
        level: res?.groups?.header?.length ?? 0,
      },
    }
  }
  // code block
  else if (markdownline.match(/```/)) {
    const res = markdownline.matchAll(/```(?<language>.*?)[\r\n]+(?<code>.*?)[\r\n]+```/gs).next().value?.groups
    return {
      type: 'code',
      data: {
        language: res.language,
        code: res.code,
      },
    }
  }
  // image block
  else if (markdownline.match(/!\[.*?\]\(.*?\)/)) {
    const res = markdownline.match(/!\[(?<caption>.*?)\]\((?<url>.*?)\)/)?.groups
    return {
      type: 'image',
      data: {
        caption: res?.caption ?? '',
        file: { url: res?.url ?? '' },
      },
    }
  }
  // paragraph block
  else if (markdownline.match(/^[^#]/)) {
    return {
      type: 'paragraph',
      data: {
        text: markdownline.replace(/`.+?`/g, (code) => {
          return `<code class='inline-code'>${code.slice(1, -1)}</code>`
        }),
      },
    }
  }
  return []
}

export default function markdown2obj(markdown: string): OutputData {
  // transform markdown to blocks
  const lines = markdown.match(/```.*?```|#.*?\n/gs) ?? []
  const blocks: OutputBlockData[] = lines.flatMap(line2obj).filter(Boolean)
  return { blocks }
}
