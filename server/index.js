const api = require('./api')
const server = require('./server')
const apiAddress = 'localhost:3011/'
api(3011)
  .then(({ port }) => {
    console.log(`Proxy is up: ${port}`)
    server(3022, apiAddress)
  })
