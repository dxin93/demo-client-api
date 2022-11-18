const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.post('/determine_preferred_modules', jsonParser, (req, res) => {
  tenant = req.body["tenant_name"]
  preferred_panels = [
    {
      "id": 1,
      "name": "Aurora Default Panel"
    }
  ]
  if (tenant == "Freedom Forever") {
    preferred_panels.push(
      {
        "name": "Freedom Forever Special Panel",
        "id": 2
      }
    )
  } else if (tenant == "Freedom Forever") {
    preferred_panels.push(
      {
        "name": "Powerhome Special Panel",
        "id": 3
      }
    )
  }

  res.json({ preferred_panels: preferred_panels })
})


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)

server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})