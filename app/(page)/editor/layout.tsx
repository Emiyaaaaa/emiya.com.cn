'use client'
import React from 'react'
import useGithubLogin from '@/utils/hooks/useGithubLogin'
import { Block } from '@/ui/Block'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { redirectToGithubLogin, checkLogin } = useGithubLogin()
  const [isLogin, setIsLogin] = React.useState(false)

  React.useEffect(() => {
    checkLogin().then(setIsLogin)
  }, [])

  return isLogin ? (
    children
  ) : (
    <Block full center>
      <div onClick={redirectToGithubLogin} className="w-3/4 text-3xl font-bold">
        You need sign in with github, Click here to sign in
      </div>
    </Block>
  )
}
