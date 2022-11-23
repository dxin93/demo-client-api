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
  console.log("Received body: ", req.body)
  project_state = req.body["state"]
  preferred_panels = ["a367ddcb-75f2-48ef-9472-a73738d5a661"] // Feather TP660P-275 : Talesun
  if (project_state == "CA") {
    preferred_panels = ["d57a9490-f486-4e7c-ae43-2e32c3e0f9d3"] // SPR-X21-445-COM : Sunpower Corp.
  } else if (project_state = "FL") {
    preferred_panels = ["e396b156-63bd-4187-9750-5514f35a022f"] // BVM6610M-280 : Boviet
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