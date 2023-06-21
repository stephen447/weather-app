import './App.css';
import React, {useState, useEffect} from "react";
import ReactAnimatedWeather from 'react-animated-weather';

function App() {
  const [location, setLocation] = useState("")
  const [data, setData] = useState('')
  const [localdata, setLocaldata] = useState("")
  const [longitude, setLongitude] = useState(undefined)
  const [latitude, setLatitude] = useState(undefined)

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

    if(location !==""){
      fetch(`http://api.openweathermap.org/data/2.5/weather?id=524901&q=${location},IE&units=metric&appid=${apikey}`)
      .then(response => response.json())
      .then(data =>{setData(data)})
    }
    else{
      

    }
  }

  function getlocaldata(){

    let apikey = '6e7e45fd86e60c1ed32d3373a9b51508'
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`)
      .then(response => response.json())
      .then(data =>{setLocaldata(data)})
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
  useEffect(getlocaldata)
  return (
    <div className="App">
      <div className='form'>
        <label>Enter your location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
          <input type="submit" onClick={handleSubmit}/>
        </label>
      </div>

        {data ==='' && localdata==='' ?(
          
        <div className='city'>
          <div className="city">
            <h1>{localdata.name}</h1>
          </div>

        <div className="weather-info">
          <div className="container">
            <div className="column">
              <p> Current Temperature: {localdata.main.temp} Celcius</p>
              <p> Maximum temperature: {localdata.main.temp_max} Celcius</p>
              <p> Minimum temperature: {localdata.main.temp_min} Celcius</p>          
            </div>
            <div className='column'>
              <p> Feels like: {localdata.main.feels_like}</p>      
              <p>{localdata.weather[0].main}</p> 
            </div>
          </div>
          <div className='icon'>
            <ReactAnimatedWeather icon={getIcon(localdata.weather[0].main)} color={getIconColor(localdata.weather[0].main)} size={200} animate={true}/>
          </div>
        </div>
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
              <p> Feels like: {data.main.feels_like}</p>      
              <p>{data.weather[0].main}</p> 
            </div>
          </div>
          <div className='icon'>
            <ReactAnimatedWeather icon={getIcon(data.weather[0].main)} color={getIconColor(data.weather[0].main)} size={200} animate={true}/>
          </div>
        </div>
        </div>
        )
        }
    </div>
  );

}

export default App;
