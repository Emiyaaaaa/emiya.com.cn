import { postAPI } from '@/utils/http'
import { urlSearch } from '../url'
import { getCookie } from '../cookie'
import { singlePromise } from '../singlePromise'

const needLogin = process.env.NODE_ENV === 'production'

const redirectToGithubLogin = () => {
  const githubOauthUrl = new URL('https://github.com/login/oauth/authorize')
  githubOauthUrl.searchParams.append('client_id', '09e7ce4c4f506bc4d754')
  githubOauthUrl.searchParams.append('redirect_uri', location.href)
  location.href = githubOauthUrl.toString()
}

const getGithubAccessToken = async () => {
  const tokenFormCookie = getCookie('github_access_token')
  if (tokenFormCookie) {
    return Promise.resolve(tokenFormCookie)
  } else {
    const { code } = urlSearch()
    if (!code) return Promise.resolve(null)
    return postAPI('getGithubAccessToken', code)
      .then((res) => res.data.access_token)
      .catch((error) => {
        console.error('getAccessToken error', { error })
      })
  }
}

const getGithubUserId = async (accessToken: string) => {
  const githubUserIdFormCookie = getCookie('github_user_id')
  if (githubUserIdFormCookie) return Promise.resolve(githubUserIdFormCookie)
  const githubUserInfo = await postAPI('getGithubUserInfo', accessToken)
  return githubUserInfo.data.id
}

const checkPermission = async (githubUserId: string) => {
  return postAPI('checkPermission', githubUserId).then((res) => res.data)
}

export default function useGithubLogin() {
  const checkLogin = singlePromise(async () => {
    if (!needLogin) return Promise.resolve(true)
    const githubUserIdFormCookie = getCookie('github_user_id')
    if (githubUserIdFormCookie) return checkPermission(githubUserIdFormCookie)

    const accessToken = await getGithubAccessToken()
    if (!accessToken) return false
    const userId = await getGithubUserId(accessToken)
    if (!userId) return false
    return checkPermission(userId)
  })

  return { redirectToGithubLogin, checkLogin }
}
