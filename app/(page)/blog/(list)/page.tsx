import fs from 'fs'
import Card from '@/components/Card'
import { serverSlideAPI } from '@/server/route'
import Link from 'next/link'
import React from 'react'

// fs.readdir(__dirname + '/', 'utf-8', (_, files) => {
//   console.log(files)
// })

export default function ExampleClientComponent() {
  return <div>1</div>
}

// export default function ArticleList() {
//   return (
//     <div>
//       {/* {data.map((d, index) => (
//         <Link key={index} href={`/blog/${d.en_title ? d.en_title.replace(/\s/g, '-') : `untitled-${d.id}`}`}>
//           <Card {...d} tags={d.tag?.split(';')}></Card>
//         </Link>
//       ))} */}
//     </div>
//   )
// }

export const revalidate = 300
