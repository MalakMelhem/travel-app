/* Global Variables */

/* Function to scroll to the entry section */
const scrollTo=()=>{
    const entrySection = document.getElementById('entry-section'); 
    const firstInput = document.getElementById('place');
    entrySection.scrollIntoView({ behavior: 'smooth' }); 
    if (firstInput) firstInput.focus();
}
/* Function called by event listener */
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
const validatePlaceName = (placeName) => {
    const isValid = /^[a-zA-Z0-9\s\-']+$/.test(placeName.trim());
    if (!isValid || placeName.trim().length === 0) {
        alert("Please enter a valid place name without special characters.");
        return false; 
    }
    return true;
};
/* Function to GET get geonames coordinates Data*/
const getCoordinates = async (place) => {
    try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${place}&maxRows=1&username=${process.env.USER_NAME}`); 
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.log("Error fetching weather data:", error); 
    }
}
/* Function to calculate days until the trip */
const countDown =()=>{
    // Create a new date instance dynamically with JS
    let d = new Date();
    const tripDate=document.getElementById('date').value;
    // Dates in milliseconds.
    const tripDateInMilliSeconds = new Date(tripDate);
    if (tripDateInMilliSeconds < d) {
        alert("The selected date is in the past. Please choose a future date."); 
        return null;
    }
    // How soon the trip is.
    const diff=tripDateInMilliSeconds-d;
    const daysUntilTrip = Math.ceil(diff/ (1000 * 60 * 60 * 24));
    return {
        date: tripDate,
        daysUntilTrip: daysUntilTrip,
      };
}
/* Function to GET Weather Data with Weatherbit APIs*/
const getWeather = async (baseUrl='',coordinates={},key) => {
    const {lat, lng } = coordinates;
    try {
        const response = await fetch(`${baseUrl}lat=${lat}&lon=${lng}&key=${key}`); 
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.log("Error fetching weather data:", error); 
    }
};
/* Function to GET an image of the place with Pixabay API*/
const getImage = async (place, country, key) => {
    const encodedPlace = encodeURIComponent(place);
    try {
        let response = await fetch(`https://pixabay.com/api/?key=${key}&q=${encodedPlace}&image_type=photo&category=travel&safesearch=true`); 
        let data = await response.json(); 
        if(data.totalHits === 0){
            const encodedCountry = encodeURIComponent(country);
            response = await fetch(`https://pixabay.com/api/?key=${key}&q=${encodedCountry}&image_type=photo&category=travel&safesearch=true`);
            data = await response.json();
            if(data.totalHits === 0){
                data={
                    hits:[
                        {webformatURL:'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
                        tags:'(No) Thumbnail image, vector graphic'}
                    ]
                };
            }
        }
        return data; 
    } catch (error) {
        console.log("Error fetching an image of the place:", error); 
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data), 
        });

        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("Error posting data:", error); 
    }
}
// Function to GET data 
const getData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json();
    return allData;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };

/*function to add a class to enable the form */
const enableForm=()=>{
    const form= document.getElementById('flight-info-form');
    form.classList.toggle("remove"); 
} 
/*function to get data from the form */
const getFormData=async(event)=>{
    event.preventDefault();
    const depTime=document.getElementById('depTime').value;
    const depFlight=document.getElementById('depFlight').value;
    const arrTime=document.getElementById('arrTime').value;
    const arrFlight=document.getElementById('arrFlight').value;
    await postData('http://localhost:3000/add-flight-info-data',{depTime, depFlight, arrTime, arrFlight});
    await updateUI();
    const removeBtn=document.getElementById('flight-info-data');
    removeBtn.classList.remove('remove');

}

/* Function to GET Project Data */
const updateUI = async () => {
    try{
    const tripData = await getData('http://localhost:3000/all');
      document.getElementsByClassName('place-country-result')[0].innerHTML = `${tripData.place}, ${tripData.country}`;
      document.getElementsByClassName('place-country-result')[1].innerHTML = `${tripData.place}, ${tripData.country}`;

      document.getElementById('departing-date-result').innerHTML = `${tripData.date}`;
      document.getElementById('duration-result').innerHTML= ` is ${tripData.daysUntilTrip}  days away`;
      const para=document.getElementById('temp');
      const icon=document.getElementById('weather-icon');
      if(tripData.weather.temp!=null){
      para.classList.remove("remove");
      document.getElementById('high-temp-result').innerHTML= `${tripData.weather.maxTemp}°c`;
      document.getElementById('low-temp-result').innerHTML= `${tripData.weather.minTemp}°c`;
      icon.classList.remove("remove");
      icon.src=`https://www.weatherbit.io/static/img/icons/${tripData.weather.icon}.png`;
      document.getElementById('weather-description-result').innerHTML= `Mostly ${tripData.weather.description} throughout the day.`;
      }
      else{
        para.classList.add("remove");
        icon.classList.add("remove");
        document.getElementById('weather-description-result').innerHTML= `${tripData.weather.description}`;
      }
      const img = document.getElementById('place-image');
      img.src = tripData.image.url;
      img.alt = tripData.image.alt;
      if(tripData.flightInfo!=null){
        const infoDiv=document.getElementById('flight-info-div');
        infoDiv.classList.remove("remove");
        document.getElementById('depTime-result').innerHTML= `${tripData.flightInfo.depTime}`;
        document.getElementById('depFlight-result').innerHTML= `${tripData.flightInfo.depFlight}`;
        document.getElementById('arrTime-result').innerHTML= `${tripData.flightInfo.arrTime}`;
        document.getElementById('arrFlight-result').innerHTML= `${tripData.flightInfo.arrFlight}`;
      }
      const infobtn=document.getElementById('flight-info-btn');
      infobtn.classList.remove("remove");
      const removeTripDataBtn=document.getElementById('remove-trip-data');
      removeTripDataBtn.classList.remove("remove");
    }catch(error){
      console.log("error", error);
    }
  }
export {performAction, enableForm, getFormData, getData, postData, scrollTo};