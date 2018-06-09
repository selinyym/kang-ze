import axios from 'axios'

export function getSearchList(id, page, key) {
  const url = '/api/KzAjax/GetProductList'

  const data = Object.assign({}, {
    id,
    page,
    key
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
