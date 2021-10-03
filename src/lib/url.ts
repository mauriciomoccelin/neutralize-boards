const getUrl = (env: string) => {
  if (env === 'development') {
    return 'http://localhost:3000'
  } else if (env === 'production') {
    return 'http://localhost:3000'
  } else {
    return 'http://localhost:3000'
  }
}

const URL = getUrl(process.env.NODE_ENV)
export default URL
