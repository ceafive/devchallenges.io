import axios from 'axios'

const api = () => {
  let uri = ''
  if (process.env.NODE_ENV === 'production') {
    uri = 'https://react-apollo-express-graphql.herokuapp.com/api'
  } else {
    uri = '/api'
  }
  return uri
}

export default axios.create({
  baseURL: api(),
  headers: { 'Access-Control-Allow-Origin': '*' },
})
