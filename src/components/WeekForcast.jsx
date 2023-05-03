import React from 'react'

const WeekForcast = props => {
    return (
        <div className='week-forcast-container'>
            WeekForcast
            {/* {Object.keys(weather.weekly).map((v,i)=>{
              // console.log(v)
              return (
                <div key={i} className='card'>
                  <h3>{v}</h3>
                  <span>low:{weather.weekly[v].range.min}</span><br/>
                  <span>high:{weather.weekly[v].range.max}</span>
                  {
                    weather.weekly[v].forcast.map((day,idx)=>{
                      return(
                        <p key={idx}>
                          {day.day.date} - 
                          {day.day.time} -
                          {Math.ceil(day.main.temp) }- 
                          {day.weather[0].description}
                        </p>
                      )
                    })
                  }
                </div>
              )
            })} */}
        </div>
    )
}



export default WeekForcast