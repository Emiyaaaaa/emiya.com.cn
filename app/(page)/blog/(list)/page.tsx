import fs from "node:fs";
import Card from "@/components/Card";
import { serverSlideAPI } from "@/server/route";
import listPaths from "list-paths";
import Link from "next/link";
import React from "react";

const posts = listPaths("../posts", { includeFiles: true })
	.filter((p) => p.endsWith(".mdx"))
	.map((p) => p.split(".")?.[0])
	.filter(Boolean);

console.log(posts);

export default function ExampleClientComponent() {
	return <div>1</div>;
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

export const revalidate = 300;
