import {getData, postData} from './app';

const infoDiv=document.getElementById('flight-info-div');
const infobtn=document.getElementById('flight-info-btn');
const form= document.getElementById('flight-info-form');
const removeBtn=document.getElementById('flight-info-data');

const cleanEntryForm=()=>{
    document.getElementById('place').value= '';
    document.getElementById('date').value= '';
}

const cleanFlightInfoForm=()=>{
    document.getElementById('depTime').value= '';
    document.getElementById('depFlight').value= '';
    document.getElementById('arrTime').value= '';
    document.getElementById('arrFlight').value= '';
   
}
const deleteFlightInfo=async()=>{
    try{
        const tripData = await getData('http://localhost:3000/all');
        delete tripData.flightInfo; 
        infoDiv.classList.add("remove");
        removeBtn.classList.add('remove');
        await postData('http://localhost:3000/delete-flight-info-data');
    }catch(error){
        console.log("error", error);
      }

}

const deleteTripData=async()=>{
    try{
        const infoDiv=document.getElementById('flight-info-div');
        infoDiv.classList.add("remove");
        await postData('http://localhost:3000/delete-trip-data');
        document.getElementsByClassName('place-country-result')[0].innerHTML = '';
        document.getElementsByClassName('place-country-result')[1].innerHTML = '';
        document.getElementById('departing-date-result').innerHTML = '';
        document.getElementById('duration-result').innerHTML= '';
        document.getElementById('weather-description-result').innerHTML='';
        const para=document.getElementById('temp');
        para.classList.add("remove");
        document.getElementById('high-temp-result').innerHTML= '';
        document.getElementById('low-temp-result').innerHTML= '';
        const icon=document.getElementById('weather-icon');
        icon.classList.add("remove");
        infobtn.classList.add("remove");
        const removeTripDataBtn=document.getElementById('remove-trip-data');
        removeTripDataBtn.classList.add("remove");
        const img = document.getElementById('place-image');
        img.src = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';
        img.alt = '(No) Thumbnail image, vector graphic';
        infoDiv.classList.add("remove");
        form.classList.add("remove"); 
        removeBtn.classList.add('remove');
    }catch(error){
        console.log("error", error);
      }
}
export {cleanEntryForm, cleanFlightInfoForm, deleteFlightInfo, deleteTripData};