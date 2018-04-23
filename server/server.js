const path =  require('path')
const express =  require('express')
const bodyParser =  require('body-parser')
const http =  require('http')
const proxy =  require('express-http-proxy')


const server = (port, apiAddress) => {
  const app = express()
  const server = http.createServer(app)
  app.use(bodyParser.json())

  app.use(express.static(path.join(__dirname, '../client')))
    app.use('/api', proxy(apiAddress))

  // Always fallback to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
  })


  server.listen(port, () => {
    console.log(`Listening on ${port} ${__dirname}`)
  })

}
module.exports = server
