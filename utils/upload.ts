import { getAPI } from '@/utils/http'
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  getAuthorization(options, callback) {
    getAPI('getCOSAuthorization').then((res) => {
      callback({
        TmpSecretId: res.credentials.tmpSecretId,
        TmpSecretKey: res.credentials.tmpSecretKey,
        XCosSecurityToken: res.credentials.sessionToken,
        ExpiredTime: res.expiredTime,
        StartTime: res.startTime,
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
          console.error('上传出错', err)
          reject(err)
        } else {
          resolve(data)
        }
      },
    )
  })
}
