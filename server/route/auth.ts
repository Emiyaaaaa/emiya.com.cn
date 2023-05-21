import { cookies } from 'next/dist/client/components/headers'
import STS from 'qcloud-cos-sts'
import { RequestHooks } from '.'

export async function getCOSAuthorization() {
  return STS.getCredential({
    secretId: process.env.COS_SECRET_ID,
    secretKey: process.env.COS_SECRET_KEY,
    proxy: '',
    durationSeconds: 60 * 60,
    policy: {
      version: '2.0',
      statement: [
        {
          action: [
            // 简单上传
            'name/cos:PutObject',
            'name/cos:PostObject',
            // 分片上传
            'name/cos:InitiateMultipartUpload',
            'name/cos:ListMultipartUploads',
          ],
          effect: 'allow',
          principal: { qcs: ['*'] },
          resource: ['qcs::cos:ap-beijing:uid/1313350710:emiya-com-cn-1313350710/*'],
        },
      ],
    },
  })
}

export async function getGithubAccessToken(code: string, requestHooks: RequestHooks) {
  const client_id = '09e7ce4c4f506bc4d754'
  const client_secret = '3fa86adcbe8cd1a039ca36d797fff536870fb509'

  const res = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error(`getGithubAccessToken 捕获到错误： ${res.statusText}`)
  }
  const data = await res.json()

  requestHooks.getResponseInit = () => {
    return {
      headers: {
        'Set-Cookie': `github_access_token=${data.access_token}; Path=/`,
      },
    }
  }
  return data as { access_token: string; scope: string; token_type: string }
}

export async function getGithubUserInfo(accessToken: string, requestHooks: RequestHooks) {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    throw new Error(`getGithubUserInfo 捕获到错误： ${res.statusText}`)
  }

  const userInfo = await res.json()

  requestHooks.getResponseInit = () => {
    return {
      headers: {
        'Set-Cookie': `github_user_id=${userInfo.id}; Path=/`,
      },
    }
  }

  return userInfo
}

export function checkPermission(githubUserId: string | number) {
  const masterUser = [117248956]
  return masterUser.includes(Number(githubUserId))
}

export default {
  getCOSAuthorization,
  getGithubAccessToken,
  getGithubUserInfo,
  checkPermission,
}
