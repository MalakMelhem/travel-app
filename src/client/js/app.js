/* Global Variables */
const userResponse=document.getElementById('feelings');



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ce9abc0310ffd441316e2c907b783221&units=imperial';


// Event listener to add function to existing HTML DOM element
document.getElementById('entryForm').addEventListener('submit', performAction);

/* Function called by event listener */
export function performAction(){
    const zipCode = document.getElementById('zip').value;
    getWeather(baseURL,zipCode,apiKey)
    .then((data)=> postData('/add-weather-data',{key:zipCode,temperature:data.main.temp, date:newDate, userResponse: userResponse.value}))
    .then(updateUI())
    .catch((error) => {
        console.error("Error in perform Action:", error);
    });
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL,zipCode,apiKey) => {
    try {
        const response = await fetch(`${baseURL}${zipCode}${apiKey}`); 
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.log("Error fetching weather data:", error); 
    }
};
'much'
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
};


/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML =Object.keys(allData).length !== 0? allData.date:'';
      document.getElementById('temp').innerHTML =Object.keys(allData).length !== 0? Math.round(allData.temperature)+ ' degrees':'';
      document.getElementById('content').innerHTML=Object.keys(allData).length !== 0? allData.userResponse:'';
    }catch(error){
      console.log("error", error);
    }
  }
