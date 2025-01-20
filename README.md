
# Weather-Journal App Project

This project demonstrates an asynchronous web application that uses a Web API and user input to dynamically update the UI. The application fetches weather data from the OpenWeatherMap API and combines it with user-provided information to display a weather journal.



## Project Structure

The project consists of the following files:
- `website` **folder**: Contains client-side files:
    - `index.html`
    - `app.js`
    - `style.css`
 - `server.js`: Contains the server-side code.


> **Note**: The initial project skeleton was provided by the Udacity Classroom. Significant modifications were made, primarily in `server.js` and `website/app.js`, to implement the required functionality.


## Features and functionality :

-  **OpenWeatherMap API Integration:**
   - Fetches weather data using the fetch() API from OpenWeatherMap.
- **Server-Side POST Route:**
   - A POST route is set up to receive incoming data from the client side and store it in the projectData object.
   - The data flow includes chaining asynchronous functions to handle the POST request.
- **Server-Side GET Route:**
   - A GET route is set up to return the projectData object to the client.   
- **Dynamic UI Updates:** 
   - Chained Promises handle fetching data from the app endpoint using an asynchronous function.  
   - DOM elements are selected and updated dynamically with the latest values for: Temperature, Date and User input.

## Technology used:

- **Environment**: Node.js and Express.js.
- **Project Dependencies**: Body-Parser, and Cors.
- **Local Server**: The server provides feedback to the Command Line through a callback function.
- **API Credentials**: OpenWeatherMap API key for accessing weather data.








