
# **Travel App Project**

This project is a web app that allows users to enter a trip location and date. It fetches the weather forecast for up to 16 days and displays an image of the location using data from external APIs.

## **Project Structure**

The project is organized as follows:
- **`__test__`**: Contains Jest tests for server and client-side JavaScript functions.
- **`dist`**: Holds production-ready files.
- **`src`**: Contains the **`client`** and **`server`** subfolders, where the core functionality resides.
- **`babelrc`**: Babel configuration file.
- **`.env`**: Stores sensitive data such as API keys and username.
- **`webpack.dev.js`**: Webpack configuration for development.
- **`webpack.prod.js`**: Webpack configuration for production.


## **Features and Functionality**

**Server-Side**
- **A POST route**: Receives data from the client and stores it in the `tripData` object.
- **A GET route**: Sends back the `tripData` object. 

**Client-Side files** 
- **`dataHandler.js`**: Handles API integrations:
  - **Geonames API**: Fetches latitude, longitude, and country name for a given place.
  - **Weatherbit API**: Retrieves the weather forecast if the trip date is within 16 days.
  - **Pixabay API**: Fetches an image of the location; if unavailable, returns a country image.

- **`formHandle.js`**: 
  - `performAction`: Handles the core logic for processing trip data.
  - `getFormData`: Gathers additional trip details such as flight information.
- **`formUtils.js`**: Helper functions for `performAction`:
  - `validatePlaceName`: Ensures the place name is valid.
  - `countDown`: Calculates days until the trip.

- **`serverDataHandler.js`**: Handles communication with the local server.
  - `postData`: Sends data to the server.
  - `getData`: Retrieves stored trip data.

- **`uiUtils.js`**: 
  - `scrollTo`: Scrolls to the Trip Entry Form when a user clicks "Add Trip."
  - `enableForm`: Opens the flight info form.
  - `updateUI`: Updates the UI when trip data changes.
- **`uiHelpers.js`**: UI-related helper functions:
  - `cleanEntryForm`: Clears input fields.
  - `cleanFlightInfoForm`: Clears flight info fields.
  - `deleteFlightInfo`: Removes flight details from the trip object.
  - `deleteTripData`: Deletes the trip data.

## **Technology Used**

- **Environment**: Node.js and Express.js.
- **Dependencies**: 
  - `body-parser`, and `cors`.
  - Webpack and Webpack Loaders/Plugins (`clean-webpack-plugin`, `html-webpack-plugin`, `workbox-webpack-plugin`).
  - Babel (`@babel/core`, `@babel/preset-env`).
  - Jest (for testing).
  - Sass (`css-loader`, `style-loader`, `sass`, `sass-loader`).
  - Workbox (for service workers).
- **APIs**: Geonames API, Weatherbit API, Pixabay API  
- **Local Server**: Stores and serves trip data.

## **Installation**

   1. Clone the repository:
    git clone <repo-url>
   2. Navigate to the project directory:
    cd travel-app
   3. Install dependencies:
    npm install

## **API Key Setup**

Before running the app, create a `.env` file in the project root and add your API keys:  

```
API_KEY_WEATHERBIT=your_weatherbit_api_key
API_KEY_PIXABAY=your_pixabay_api_key
API_KEY_GEONAMES=your_geonames_username

```
## **Environment Setup**

This project requires **Node.js v18** (or v20).  
Ensure you have the correct version installed before running the project.

### Recommended Node.js Version
We recommend using **Node.js v18**. If you use `nvm`, you can switch to the correct version with:

```
nvm use 18
```

## **How to Run the Application**

   1. Start the Server:
    npm start

   2. Run Webpack Dev Server for Development:
    npm run build-dev

   3. Build the App for production:
    npm run build-prod


