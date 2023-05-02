import { useState,useEffect,useRef } from 'react'
import './App.scss'
import test from './data/test.json'
import { formatWeatherData } from './util/formatData'

function App() {
  const [weather, setWeather] = useState(test)
  let textInput = useRef(null)
  const getWeather = async (city)=>{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
    // let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
    const jsonData = await response.json();
    console.log(jsonData);
    setWeather(prev=> jsonData)
  }
  const handleClick = ()=>{
    console.log('clicked',textInput.current)
    let city = textInput.current.value
    if(!city.length) return 
    getWeather(city)
  }

  // console.log(formatWeatherData(weather));
    // useEffect(()=>{
    //   const getWeather = async (city)=>{
    //     let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
    //     const jsonData = await response.json();
    //     console.log(jsonData);
    //     setCount(JSON.stringify(jsonData))
    //   }
    //   // getWeather('Brooklyn')
    // },[])

  return (
    <div className='main'>
    <input type="text" ref={textInput} id="textInput" />
    <button onClick={()=>handleClick()}>Search</button>

      <div className="card-container">
        {weather.list.map((item,key)=>{
          let date = new Date(item.dt_txt)
          // console.log(date)
          return (
            <div className='card' key={key}>
              <p>{date.toLocaleString()}</p>
              <p>{item.main.temp}</p>
            </div>
          )}
        )}
      </div>

    
    </div>
  )
}

export default App
