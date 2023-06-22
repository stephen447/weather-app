import './App.css';
import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';  
import ReactAnimatedWeather from 'react-animated-weather';

function App() {
  const [location, setLocation] = useState(undefined)
  const [currentloc, setCurrentloc] = useState(true)
  const [data, setData] = useState(undefined)
  const [longitude, setLongitude] = useState(undefined)
  const [latitude, setLatitude] = useState(undefined)
  const [colour, setColour] = useState("green")

  function componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let apikey = '6e7e45fd86e60c1ed32d3373a9b51508'
    if (currentloc===true){
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`)
      .then(response => response.json())
      .then(data =>{setData(data)})
    }
    else{
      setLocation("")
      fetch(`http://api.openweathermap.org/data/2.5/weather?id=524901&q=${location},IE&units=metric&appid=${apikey}`)
      .then((response)=>{
        if (response.ok){
          return response.json()
        }
        else{
          throw new Error("Status code error :" + response.status)
        }}) 
      .then(data =>{setData(data)})
      .catch((error)=>{console.log("caught error", error)})
    }
  }

  const handleclick = (e) =>{
    if(currentloc===true){
      setColour("black")
    }
    else{
      setColour("green")
    }
    setCurrentloc((current) => !current);
    
    if(currentloc===false){
      let apikey = '6e7e45fd86e60c1ed32d3373a9b51508'
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`)
      .then(response => response.json())
      .then(data =>{setData(data)})
      .catch((error)=>{console.log("caught error")})
      
    }
    
    console.log(data)
  }


  function getIcon(weather){
    switch(weather){
      case 'Fog':
        return 'FOG'
      case 'Clear':
        return 'CLEAR_DAY'
      case 'Thunderstorm':
        return 'RAIN'
      case 'Drizzle':
        return 'RAIN'
      case 'Rain':
        return 'RAIN'
      case 'Snow':
        return 'SNOW'
      case 'Mist':
        return 'FOG'
      case 'Clouds':
        return 'CLOUDY'
      default:
        return 'CLEAR_DAY'
    }
  }

  function getIconColor(weather){
    switch(weather){
      case 'Fog':
        return 'WHITE'
      case 'Clear':
        return 'YELLOW'
      case 'Thunderstorm':
        return 'BLUE'
      case 'Drizzle':
        return 'BLUE'
      case 'Rain':
        return 'BLUE'
      case 'Snow':
        return 'WHITE'
      case 'Mist':
        return 'WHITE'
      case 'Clouds':
        return 'WHITE'
      default:
        return 'YELLOW'
    }
  }
  useEffect(componentDidMount)
  return (
    <div className="App">
      <Button variant='contained' sx={{ ":hover":{backgroundColor:"coral", color:"black"}, backgroundColor: colour, color: 'coral' }} className="location_button"onClick={handleclick}>Current location </Button>
      {currentloc===true?(
        <p> Weather for your current location</p>
      ):(
        <div className='form'>
          <input type="text" value={location} className="textfield" placeholder="Enter a location" onChange={(e) => setLocation(e.target.value)}/>
          <input type="submit" className="submitbutton" onClick={handleSubmit}/>
        </div>
      )
      }
      
      {typeof data ==='undefined' ? (
      <div>
        <p>Welcome to the weather app!</p>
      </div>
      ) : (
      <div className='city'>
        <div className="city">
        <h1>{data.name}</h1>
        </div>

      <div className="weather-info">
        <div className="container">
          <div className="column">
            <p> Current Temperature: {data.main.temp} Celcius</p>
            <p> Maximum temperature: {data.main.temp_max} Celcius</p>
            <p> Minimum temperature: {data.main.temp_min} Celcius</p>    
          </div>
          <div className='column'>
            <p> Feels like: {data.main.feels_like} Celcius</p>      
            <p>{data.weather[0].main}</p> 
            <p>Wind speed: {data.wind.speed} km/h</p>
          </div>
        </div>
        <div className='icon'>
          <ReactAnimatedWeather icon={getIcon(data.weather[0].main)} color={getIconColor(data.weather[0].main)} size={200} animate={true}/>
        </div>
      </div>
    </div>
      )}
  </div>
        
  );

}

export default App;
