import axios from 'axios'

let BASE_URL = 'http://localhost:8080/api/users'

if (process.env.NODE_ENV !== 'development') {
  BASE_URL = window.location.origin
}

export { BASE_URL }

export default ({ method, urlEndpoint, params, module, headers, data }) => {
  let request = {
    params,
    method,
    url: `${BASE_URL}/${urlEndpoint}`,
    headers: {
      'content-type': 'application/json',
      ...headers
    }
  }
  if (data) {
    request = { ...request, data }
  }
  return axios(request)
    .then(({ data: { data, messages, status } }) => ({
      data,
      messages,
      status
    }))
    .catch(err => {
      console.error('Something went wrong', err)
    })
}
