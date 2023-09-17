import React, { useEffect, useState } from 'react'
import './style.css'
import Weathercard from './weathercard';
// let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid={WriteYourAPIKey}`;

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Indore");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure} = data.main //it dosen't have array and we extracted temp, humidity etc directly..
      const { main: weathermood } = data.weather[0] //weather is array of object & we have renamed main to weathermood
      const { name } = data // it is available directly
      const { speed } = data.wind 
      const { country, sunset } = data.sys

      // we kept all the data (temp, speed etc) in the new object "myNewWeatherInfo"
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      // we have set new object in the TempInfo state
      setTempInfo(myNewWeatherInfo)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [])
  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input type="search" placeholder='search here...' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>
      <Weathercard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp;
