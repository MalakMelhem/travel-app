
// Function to POST data.
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
// Function to GET data. 
const getData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    const allData = await request.json();
    return allData;
    }
    catch(error) {
      console.log("error", error);
    }
  };
  export {postData, getData};
