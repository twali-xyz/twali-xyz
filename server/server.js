  const express = require('express')
  const next = require('next')
  
  const port = parseInt(process.env.PORT, 10) || 3000
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })
  const handle = app.getRequestHandler()
  
  app.prepare().then(() => {
    const server = express()
  
    server.all('*', (req, res) => {
      return handle(req, res)
    })
  
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })

    server.post('/api/company', (req, res) => {
        var clearbit = require('clearbit')('sk_6bcc4eeacc2e0695ccd95e414e0633a6');
        console.log(clearbit);
    
        clearbit.Company.find({domain: 'segment.com', stream: true})
        .then(function (company) {
            console.log('Name: ', company.name);
            console.log('Logo: ', company.logo);
            res.json(company);
        });
       
    })

  }).catch(ex => { // kills the server on exceptions
    console.error(ex.stack);
    process.exit(1);
})
