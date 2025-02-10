const validatePlaceName = (placeName) => {
    const isValid = /^[a-zA-Z0-9\s\-']+$/.test(placeName.trim());
    if (!isValid || placeName.trim().length === 0) {
        alert("Please enter a valid place name without special characters.");
        return false; 
    }
    return true;
};

/* Function to calculate days until the trip */
const countDown =()=>{
    // Create a new date instance dynamically with JS.
    let d = new Date();
    let today = new Date(d.getFullYear(), d.getMonth(), d.getDate()); 
    const tripDate=document.getElementById('date').value;
    // Dates in milliseconds.
    let tripDateInMilliSeconds = new Date(tripDate);
    let tripDay = new Date(tripDateInMilliSeconds.getFullYear(), tripDateInMilliSeconds.getMonth(), tripDateInMilliSeconds.getDate());
    if (tripDay < today) {
        alert("The selected date is in the past. Please choose a future date."); 
        return null;
    }
    // How soon the trip is.
    const diff = tripDay - today;
    const daysUntilTrip = Math.ceil(diff/ (1000 * 60 * 60 * 24));
    return {
        date: tripDate,
        daysUntilTrip: daysUntilTrip,
      };
}
export {validatePlaceName, countDown};
