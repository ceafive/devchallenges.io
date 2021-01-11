import axios from 'axios'

const api = () => {
  let uri = ''
  if (process.env.NODE_ENV === 'production') {
    uri = 'https://auth-app-devchallenges.herokuapp.com/api'
  } else {
    uri = '/api'
  }
  return uri
}

export default axios.create({
  baseURL: api(),
  headers: { 'Access-Control-Allow-Origin': '*' },
})
