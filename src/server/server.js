// Setup empty JS object to act as endpoint for all routes
let tripData = {};

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
    console.log(tripData);
    res.send(tripData);
});
// POST route
app.post('/add-coordinates-and-date-data', function (req,res){
        tripData.latitude= req.body.latitude;
        tripData.longitude=req.body.longitude;
        tripData.country= req.body.country;
        tripData.place= req.body.place;
        tripData.date=req.body.date;
        tripData.daysUntilTrip= req.body.daysUntilTrip;

    res.status(200).send({ message: 'Coordinates and date data added successfully' });
});

app.post('/add-trip-weather-data', function (req,res){
    tripData.weather=req.body;
    res.status(200).send({ message: 'Trip weather data added successfully' });
});

app.post('/add-trip-image-data', function (req,res){
    tripData.image=req.body;
    res.status(200).send({ message: 'Trip image data added successfully' });
});

app.post('/add-flight-info-data', function (req,res){
    tripData.flightInfo=req.body;
    res.status(200).send({ message: 'Trip flight info data added successfully' });
});

app.post('/delete-flight-info-data', function (req,res){
    delete tripData.flightInfo;
    res.status(200).send({ message: 'Trip flight info data deleted successfully' });
}); 

app.post('/delete-trip-data', function (req,res){
    tripData={};
    res.status(200).send({ message: 'Trip data deleted successfully' });
});
