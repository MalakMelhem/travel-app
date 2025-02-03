// import {getCoordinates, getWeather, getImage} from './dataHandler';
// import {postData} from './serverDataHandler';
// import {updateUI} from './uiUtils';
// import {validatePlaceName, countDown} from './formUtils';

// Function called by event listener to handle the core actions.
const performAction= async(event)=>{
    event.preventDefault();
    const placeName = document.getElementById('place').value;
    if(!Client.validatePlaceName(placeName)) return;

 
    const countDays=Client.countDown();
        if (!countDays) return;
    try{ 
        const coordinates= await Client.getCoordinates(placeName);
        if(!coordinates.totalResultsCount){ 
            alert("Incorrect place name. Please choose a valide place."); 
            return;}
        await Client.postData('http://localhost:3000/add-coordinates-and-date-data',
        {   latitude:coordinates.geonames[0].lat, 
            longitude:coordinates.geonames[0].lng, 
            country:coordinates.geonames[0].countryName,
            place:placeName,
            date: countDays.date,
            daysUntilTrip: countDays.daysUntilTrip
        });

        let tripWeather;
        if(countDays.daysUntilTrip < 16){
            const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
            const weather = await Client.getWeather(baseURL, coordinates.geonames[0], process.env.API_KEY_WEATHERBIT);
            // console.log(weather);
            // tripWeather= {...weather.data[countDays.daysUntilTrip].weather,
            //     temp: weather.data[countDays.daysUntilTrip].temp,
            //     maxTemp:weather.data[countDays.daysUntilTrip].max_temp,
            //     minTemp:weather.data[countDays.daysUntilTrip].min_temp};
            const forecastData = weather.data[countDays.daysUntilTrip]; 

            if (forecastData) { 
                tripWeather = {
                    ...forecastData.weather,
                    temp: forecastData.temp,
                    maxTemp: forecastData.max_temp,
                    minTemp: forecastData.min_temp
                };
            } else {
                tripWeather = { icon: '', description: 'Weather data not available' };
            }
           
        }else{
            tripWeather= {icon: '', description: 'No forecasts available beyond 16 days'};
        }
        await Client.postData('http://localhost:3000/add-trip-weather-data', tripWeather);

        const placeImage= await Client.getImage(placeName, coordinates.geonames[0].countryName,process.env.API_KEY_PIXABAY);
        await Client.postData('http://localhost:3000/add-trip-image-data',{url: placeImage.hits[0].webformatURL, alt: placeImage.hits[0].tags});
        await Client.updateUI();

    }catch (error) {
        console.log('Error in performAction:', error);
    }

   
}

// Function to get more data from the flight info form.
const getFormData=async(event)=>{
    event.preventDefault();
    const depTime=document.getElementById('depTime').value;
    const depFlight=document.getElementById('depFlight').value;
    const arrTime=document.getElementById('arrTime').value;
    const arrFlight=document.getElementById('arrFlight').value;
    await Client.postData('http://localhost:3000/add-flight-info-data',{depTime, depFlight, arrTime, arrFlight});
    await Client.updateUI();
    const removeBtn=document.getElementById('remove-flight-info-data');
    removeBtn.classList.remove('remove');
}

export {performAction, getFormData};