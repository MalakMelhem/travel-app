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

export {getCoordinates, getWeather, getImage};