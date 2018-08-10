const baseUrl = 'https://m.yaojunrong.com'

export const axios = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: 'GET',
        data,
        header: {'content-type': 'application/json'},
        success (res) {
          resolve(res.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: 'POST',
        data,
        header: {'content-type': 'application/json'},
        success (res) {
          resolve(res.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  }
}
