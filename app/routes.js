//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/application', (req, res) => {
  const applicationID = req.session.data['application_id']
  res.redirect('/application/' + applicationID)
})

router.get('/application/:applicationID', async (req, res) => {
  const locals = {}
  locals.applicationID = req.params.applicationID
  locals.applicationData = await getApplication(locals.applicationID);
  console.log(locals.applicationData)

  locals.similarApplications = await getSimilarApplications(locals.applicationData.data.description);
  console.log(JSON.stringify(locals.similarApplications))
  
  res.render('application.html', locals)
})

async function queryAPI(application_id, method='GET', endpoint='') {
  const apiUrl = `http://localhost:5001/api/${endpoint}/${application_id}`;

  const response = await fetch(apiUrl, { method: method }).catch(e => console.error(e));

  if (response.status != 200) {
    console.error(response)
  } else {
    const json = await response.json();
    return json
  }
}

async function getApplication(application_id) {
  return await queryAPI(application_id, 'GET', '/application');
}

async function getSimilarApplications(description) {
  const apiUrl = `http://localhost:5001/api/similar-applications`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: description })
  }).catch(e => console.error(e));

  if (response.status != 200) {
    console.error('Error fetching similar applications:', response.status);
    return null;
  } else {
    const json = await response.json();
    return json;
  }
}

