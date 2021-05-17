require('dotenv').config()

const PORT = process.env.PORT
if (process.env.NODE_ENV === 'test') {
  console.log('no kyllä!')
  console.log(PORT)
}

else { console.log('EIH') }

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}