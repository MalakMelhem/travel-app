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
export {validatePlaceName, countDown};
