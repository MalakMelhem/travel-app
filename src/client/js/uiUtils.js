// import {getData} from './serverDataHandler';

// Function to scroll to the entry section.
const scrollTo=()=>{
    const entrySection = document.getElementById('entry-section'); 
    const firstInput = document.getElementById('place');
    entrySection.scrollIntoView({ behavior: 'smooth' }); 
    if (firstInput) firstInput.focus();
}

// Function to add a class to enable the form.
const enableForm=()=>{
  const form= document.getElementById('flight-info-form');
  form.classList.toggle("remove"); 
} 

// Function to update the Project UI.
const updateUI = async () => {
    const para=document.getElementById('temp');
    const icon=document.getElementById('weather-icon');
    const infoDiv=document.getElementById('flight-info-div');
    const infobtn=document.getElementById('flight-info-btn');
    const removeTripDataBtn=document.getElementById('remove-trip-data');
    const removeflightInfoBtn=document.getElementById('remove-flight-info-data');
    const img = document.getElementById('place-image');
    const form= document.getElementById('flight-info-form');
    try{

    const tripData = await Client.getData('http://localhost:3000/all');

    if(tripData.place){
      infobtn.classList.remove("remove");
      removeTripDataBtn.classList.remove("remove");
    }else{
      infobtn.classList.add("remove");
      removeTripDataBtn.classList.add("remove");
      form.classList.add("remove"); 
    }
      document.getElementsByClassName('place-country-result')[0].innerHTML = tripData.place? ` ${tripData.place}, ${tripData.country}`:'';
      document.getElementsByClassName('place-country-result')[1].innerHTML = tripData.place? `${tripData.place}, ${tripData.country}` :'';

      document.getElementById('departing-date-result').innerHTML = tripData.date?`${tripData.date}`:'';
      document.getElementById('duration-result').innerHTML= tripData.daysUntilTrip>=0? ` is ${tripData.daysUntilTrip}  days away`:'';

      if(tripData.weather && tripData.weather.temp){
        para.classList.remove("remove");
        document.getElementById('high-temp-result').innerHTML= `${tripData.weather.maxTemp}°c`;
        document.getElementById('low-temp-result').innerHTML= `${tripData.weather.minTemp}°c`;
        icon.classList.remove("remove");
        icon.src=`https://www.weatherbit.io/static/img/icons/${tripData.weather.icon}.png`;
        document.getElementById('weather-description-result').innerHTML= `Mostly ${tripData.weather.description} throughout the day.`;
      }else{
        para.classList.add("remove");
        icon.classList.add("remove");
        document.getElementById('weather-description-result').innerHTML= tripData.weather?`${tripData.weather.description}`:'';
      }
      if(tripData.image){
        img.src = tripData.image.url;
        img.alt = tripData.image.alt;
      }else{
        img.src = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';
        img.alt = '(No) Thumbnail image, vector graphic';
      }
      if(tripData.flightInfo){
        infoDiv.classList.remove("remove");
        removeflightInfoBtn.classList.remove('remove');
        document.getElementById('depTime-result').innerHTML= `${tripData.flightInfo.depTime}`;
        document.getElementById('depFlight-result').innerHTML= `${tripData.flightInfo.depFlight}`;
        document.getElementById('arrTime-result').innerHTML= `${tripData.flightInfo.arrTime}`;
        document.getElementById('arrFlight-result').innerHTML= `${tripData.flightInfo.arrFlight}`;
      }else{
        infoDiv.classList.add("remove");
        removeflightInfoBtn.classList.add('remove');
      }
      
    }catch(error){
      console.log("error", error);
    }
  }
  export {updateUI, enableForm, scrollTo};