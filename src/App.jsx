import { useState,useEffect,useRef } from 'react';
import './App.scss';
import test from './data/test.json';
import { formatWeatherData } from './util/formatData';
import TopBar from './components/TopBar';
import Main from './components/main';
import WeekForcast from './components/WeekForcast';
function App() {
  let today = new Date().toDateString().substring(4)
  const [weather, setWeather] = useState(test);
  const [selectedDayWeather,setSelectedDayWeather] = useState(weather.weekly[today])
  let textInput = useRef(null)

  const getWeather = async (city)=>{
    // let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
    const jsonData = await response.json();
    let formattedWeather = formatWeatherData(jsonData)
    console.log('data:',formattedWeather)
    setWeather(prev=> formattedWeather)
  }

  const handleClick = ()=>{
    console.log('clicked',textInput.current)
    let city = textInput.current.value
    if(!city.length) return 
    getWeather(city)
  }


  return (
    <div className='container'>
      <TopBar textInput={textInput} handleClick={handleClick}/>

      <div className="card-container">
        {weather&&
          <div>
            <Main currentWeather = {selectedDayWeather} city={weather.city}/>
            <WeekForcast weather={weather} setDay={setSelectedDayWeather}/>
            
          </div>
        }
      </div>
    </div>
  )
}

export default App
