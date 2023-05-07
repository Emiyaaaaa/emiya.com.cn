import { get } from '@/server/http'
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  getAuthorization(options, callback) {
    get('/api/getAuthorization').then((res) => {
      console.log('res', res)
      callback({
        TmpSecretId: res.data.credentials.tmpSecretId,
        TmpSecretKey: res.data.credentials.tmpSecretKey,
        XCosSecurityToken: res.data.credentials.sessionToken,
        ExpiredTime: res.data.expiredTime,
        StartTime: res.data.startTime,
      })
    })
  },
  SecretId: 'AKIDQjx0vfML9tVSIzd8E6w8FI7j7GH5g5F9',
  SecretKey: 'udAamW2KNAk6D73rT6YpvnRu9Bya3KNB',
})

export async function uploadFile(file: File) {
  return new Promise<COS.PutObjectResult>((resolve, reject) => {
    cos.putObject(
      {
        Bucket: 'emiya-com-cn-1313350710',
        Region: 'ap-beijing',
        Key: `${Date.now()}_${file.name}`,
        Body: file,
      },
      function (err, data) {
        if (err) {
          console.log('上传出错', err)
          reject(err)
        } else {
          console.log('上传成功', data)
          resolve(data)
        }
      },
    )
  })
}
