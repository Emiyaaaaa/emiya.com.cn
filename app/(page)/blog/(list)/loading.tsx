'use client'
import Card from '@/components/Card'
import { useTimeout } from '@/utils/hooks/useTimeout'
import React from 'react'

const cardLength = 10

function LoadingCard() {
  return <Card title={'Title Loading................'} created_at={new Date()} className="loading"></Card>
}

export default function Loading() {
  const shouldShowLoading = useTimeout(300)

  if (!shouldShowLoading) return null

  return (
    <>
      {new Array(cardLength).fill(0).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </>
  )
}
