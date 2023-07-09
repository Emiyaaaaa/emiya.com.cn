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
    const res = markdownline.matchAll(/```(?<language>.*?)[\r\n]+(?<code>.*?)[\r\n]+\s*```/gs).next().value?.groups
    if (!res) return []
    return {
      type: 'code',
      data: {
        language: res.language,
        code: res.code,
      },
    }
  }
  // list block
  else if (markdownline.match(/^-/)) {
    const res = markdownline.match(/^(?<list>[-*]) (?<text>.*)/)
    const items = markdownline.split('\n').map((line) => line.match(/^(?<list>[-*]) (?<text>.*)/)?.groups?.text?.replace(/^#*/g, ''))
    return {
      type: 'list',
      data: {
        style: res?.groups?.list === '-' ? 'unordered' : 'ordered',
        items: items?.filter(Boolean).map((item) => ({ content: item })) ?? [],
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
        text: markdownline
          .replace(/`.+?`/g, (code) => {
            return `<code class='inline-code'>${code.slice(1, -1)}</code>`
          })
          .replace(/\*\*(.+?)\*\*/g, (bold) => {
            return `<b>${bold.slice(2, -2)}</b>`
          })
          .replace(/\*(.+?)\*/g, (italic) => {
            return `<i>${italic.slice(1, -1)}</i>`
          }),
      },
    }
  }
  return []
}

export default function markdown2obj(markdown: string): OutputData {
  // transform markdown to blocks
  const lines = markdown.match(/\s*```.*?```|(-.*?\n)+|#.*?\n|.*?\n|.*?$/gs) ?? []
  const blocks: OutputBlockData[] = lines.flatMap(line2obj).filter(Boolean)
  return { blocks }
}
