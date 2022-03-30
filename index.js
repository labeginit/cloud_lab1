//const port = process.env.PORT || 3001;
const port = 3000;
//for webserver to be created
const express = require('express');
//create a webserver using express
const app = express();
//serve all the files in the frontend folder
app.use(express.static('frontend'));

//Express.json is needed to read a request body (for POST/PUT/PATCH-request)
app.use(express.json({limit: '100MB'}));

//start the webserver on port 3000
app.listen(port, () => console.log('//http:localhost:' + port));

//import rest api functionality
//const setupRESTapi = require('./rest-api');
//setupRESTapi(app);
