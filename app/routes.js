//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/application', (req, res) => {
  const applicationID = req.session.data['application_id']

  res.render('application.html')
})

router.get('/application/:applicationID', (req, res) => {
  const locals = {}

  res.render('application.html', locals)
})