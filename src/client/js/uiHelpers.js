import { postData} from './serverDataHandler';
import { updateUI} from './uiUtils';

// Function to clear the trip entry form.
const cleanEntryForm=()=>{
    document.getElementById('place').value= '';
    document.getElementById('date').value= '';
}
// Function to clear the flight information form.
const cleanFlightInfoForm=()=>{
    document.getElementById('depTime').value= '';
    document.getElementById('depFlight').value= '';
    document.getElementById('arrTime').value= '';
    document.getElementById('arrFlight').value= '';
   
}
// Function to delete flight information from the server and update the UI.
const deleteFlightInfo=async()=>{
    try{
        await postData('http://localhost:3000/delete-flight-info-data');
        await updateUI();
    }catch(error){
        console.log("error", error);
      }

}
// Function to delete all trip data from the server and update the UI.
const deleteTripData=async()=>{
    try{
        await postData('http://localhost:3000/delete-trip-data');
        await updateUI();
    }catch(error){
        console.log("error", error);
      }
}
export {cleanEntryForm, cleanFlightInfoForm, deleteFlightInfo, deleteTripData};