import { type } from 'os'
import STS from 'qcloud-cos-sts'

export async function getAuthorization() {
  return STS.getCredential({
    secretId: process.env.COS_SECRET_ID!,
    secretKey: process.env.COS_SECRET_KEY!,
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
export default {
  getAuthorization,
}
