// app.js server code
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// urlencoded for form data, parsing application/x-www-form-urlencoded
// if extended true any data can post, if false nested object can not post
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) =>  response.sendFile(`${__dirname}/index.html`));

app.post('/api/register', (request, response) => {
    const postData = request.body;
    console.log(postData);
    response.send('Successfully received your Data! Thanks');
});

app.listen(3000, () => console.info('Application running on port 3000'));