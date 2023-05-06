import { useState,useEffect,useRef } from 'react';
import './App.scss';
import test from './data/test.json';
import { formatWeatherData } from './util/formatData';
import TopBar from './components/TopBar';
import Main from './components/main';
import WeekForcast from './components/WeekForcast';
function App() {
  let today = new Date().toDateString().substring(4)
  const [weather, setWeather] = useState('');
  const [selectedDayWeather,setSelectedDayWeather] = useState('')
  let textInput = useRef(null)

  const getWeather = async (city)=>{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
    const jsonData = await response.json();
    console.log(jsonData)
    let formattedWeather = formatWeatherData(jsonData)
    setWeather(prev=> formattedWeather)
    if(!formattedWeather || !formattedWeather.weekly) return
    setSelectedDayWeather(prev=> formattedWeather.weekly[today])
    localStorage.setItem("city", city);
  }
  const handleClick = ()=>{
    console.log('clicked',textInput.current)
    let city = textInput.current.value;
    if(!city.length) return 
    getWeather(city)
  }
  useEffect(()=>{
    if(localStorage.getItem('city')){
      getWeather(localStorage.getItem('city'))
    }
  },[])

  return (
    <div className='container'>
      <TopBar textInput={textInput} handleClick={handleClick}/>

      <div className="card-container">
        {weather&&weather.city?
          <div>
            <Main currentWeather = {selectedDayWeather} city={weather.city}/>
            <WeekForcast weather={weather} setDay={setSelectedDayWeather}/>
            
          </div>
          :weather&&weather.cod === '404'?<h2 className='error'>Unable to find city <span >{textInput.current.value}</span> </h2>
          :''
        }
      </div>
    </div>
  )
}

export default App
