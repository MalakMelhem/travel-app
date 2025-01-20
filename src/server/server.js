// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port=3000;
const server=app.listen(port, listening);
function listening(){
    console.log(`server is running on localhost: ${port}`);   
}


app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});
// Initialize all route with a callback function 
// GET route
app.get('/all', function (req,res){
    res.json(projectData);
});
// POST route
app.post('/add-weather-data', function (req,res){
    projectData.key= req.body.key;
    projectData.temperature= req.body.temperature;
    projectData.date= req.body.date;
    projectData.userResponse= req.body.userResponse;
console.log(projectData);
});
