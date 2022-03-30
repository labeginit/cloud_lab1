//for webserver to be created
const express = require('express');
//create a webserver using express
const app = express();
//serve all the files in the frontend folder
app.listen(5001); 

app.set('view engine', 'ejs');

app.use(express.static('views'));

//import rest api functionality
const setupRESTapi = require('./rest-api');
setupRESTapi(app);
