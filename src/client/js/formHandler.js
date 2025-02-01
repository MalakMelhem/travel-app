import {getCoordinates, getWeather, getImage} from './dataHandler';
import {postData} from './serverDataHandler';
import {updateUI} from './uiUtils';
import {validatePlaceName, countDown} from './formUtils';

// Function called by event listener to handle the core actions.
const performAction= async(event)=>{
    event.preventDefault();
    const placeName = document.getElementById('place').value;
    if(!validatePlaceName(placeName)) return;
    try{
        const countDays=countDown();
        if (!countDays) return;
        
        const coordinates= await getCoordinates(placeName);
        if(!coordinates.totalResultsCount){ 
            alert("Incorrect place name. Please choose a valide place."); 
            return;}
        await postData('http://localhost:3000/add-coordinates-and-date-data',
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
            const weather = await getWeather(baseURL, coordinates.geonames[0], process.env.API_KEY_WEATHERBIT);
            console.log(weather);
            tripWeather= {...weather.data[countDays.daysUntilTrip].weather,
                temp: weather.data[countDays.daysUntilTrip].temp,
                maxTemp:weather.data[countDays.daysUntilTrip].max_temp,
                minTemp:weather.data[countDays.daysUntilTrip].min_temp};
        }else{
            tripWeather= {icon: '', description: 'No forecasts available beyond 16 days'};
        }
        await postData('http://localhost:3000/add-trip-weather-data', tripWeather);

        const placeImage= await getImage(placeName, coordinates.geonames[0].countryName,process.env.API_KEY_PIXABAY);
        await postData('http://localhost:3000/add-trip-image-data',{url: placeImage.hits[0].webformatURL, alt: placeImage.hits[0].tags});
        await updateUI();

    }catch (error) {
        console.error('Error in performAction:', error);
    }

   
}

// Function to get more data from the flight info form.
const getFormData=async(event)=>{
    event.preventDefault();
    const depTime=document.getElementById('depTime').value;
    const depFlight=document.getElementById('depFlight').value;
    const arrTime=document.getElementById('arrTime').value;
    const arrFlight=document.getElementById('arrFlight').value;
    await postData('http://localhost:3000/add-flight-info-data',{depTime, depFlight, arrTime, arrFlight});
    await updateUI();
    const removeBtn=document.getElementById('remove-flight-info-data');
    removeBtn.classList.remove('remove');
}

export {performAction, getFormData};