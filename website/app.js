// Base URL and API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=8737684b4d28ba0663a38e7b0e2a8fc3&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
const generate=document.getElementById('generate');
generate.addEventListener('click', presentData);

/* Function called by event listener */
function presentData(d) {
   d.preventDefault();
   // Get user input values
   const Zip = document.getElementById('zip').value;
   const feeling = document.getElementById('feelings').value;

   getWeatherData(baseURL,Zip, apiKey)
       .then(data => {
          // Add returned data to a new POST request
          postData('/add', { date: newDate, temp: data.main.temp,content:feeling })
       }).then(data => {
      // Update the browser content with the returned data
      UpdateData();
   });
}

/* Function to GET Web API Data*/
const getWeatherData= async (baseURL, Zip, apiKey) => {
   const Respond = await fetch (baseURL + Zip + apiKey);

   try {
      return await Respond.json();
   } 
   catch (error) {
      console.log("error", error);
   }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
   const res = await fetch (url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   })

   try {
      /*return await res.json();*/
      const newData = await res.json();
      console.log(newData);
      return newData;
   } catch (error) {
      console.log("Error", error);
   }
};

/* Function to GET Project Data */
const UpdateData = async () =>{
  const req = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await req.json();
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = `Temperature : ${allData.temp} degrees`;
  document.getElementById('content').innerHTML = ` Feeling : ${allData.content}`;
  document.getElementById("date").innerHTML =`Date : ${allData.date}`;
  }
  catch(error) {
    console.log("error", error);
  }
 }
