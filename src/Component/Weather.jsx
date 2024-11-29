import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import few_icon from '../assets/few_cloud.png'
import shower_icon from '../assets/shower_cloud.png'
import thunderstorm_icon from '../assets/thunderstorm_cloud.png'

function Weather() {
  const inputref=useRef();
  const [weatherdata,setweatherdata]=useState(false);
  const allicon={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":few_icon,
    "02n":few_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":shower_icon,
    "09n":shower_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "11d":thunderstorm_icon,
    "11n":thunderstorm_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }
  const search=async (city)=>{
    if(city===""){
      alert("Plese Enter City Name");
      return;
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response=await fetch(url);
      const data=await response.json();
      console.log(data);
      if(!response.ok){
        alert(data.message);
        return; 
      }
      const icon=allicon[data.weather[0].icon]||clear_icon;
      setweatherdata({
        humidity:data.main.humidity,
        windspeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon
      })
    }
    catch(error){
      setweatherdata(false);
      console.error("Error in fetching Weather data");
    }
  }
  useEffect(()=>{
    search("Rajkot");
  },[])
  return (
      <div className="weather">
        <div className="search">
            <input ref={inputref} type="text" placeholder='Search City' />
            <img src={search_icon} alt="" onClick={()=>{search(inputref.current.value)}} />
        </div>
        {weatherdata?<>
        
        <img src={weatherdata.icon} className='weeather_icon' alt="" />
        <p className='temprature'>{weatherdata.temperature}°C</p>
        <p className='city'>{weatherdata.location}</p>
        <div className="weather_data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherdata.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherdata.windspeed} km/h</p>
              <span>Wind speed</span>
            </div>
          </div>
        </div>
        </>:<></>}
      </div>
  )
}

export default Weather
