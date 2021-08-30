import axios from 'axios'
let BASE_URL = 'http://localhost:8081/api/users'
if (process.env.NODE_ENV !== 'development') {
  BASE_URL = window.location.origin+':8081/api/users'
}
export { BASE_URL }
export default ({ method, urlEndpoint, params, module, headers, data }) => {
  let x_access_token = window.localStorage.getItem('x-access-token');
 // if(!x_access_token){
   // alert("User logout!!")
   // return false
  //}
  let request = {
    params,
    method,
    url: `${BASE_URL}/${urlEndpoint}`,
    headers: {
      'content-type': 'application/json',
      'x-access-token':x_access_token,
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
