const port = process.env.PORT || 3001;
//for webserver to be created
const express = require('express');
//create a webserver using express
const app = express();
//serve all the files in the frontend folder

const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static('views'));

//start the webserver on port 3000
app.listen(port);

//import rest api functionality
const setupRESTapi = require('./rest-api');
setupRESTapi(app);
