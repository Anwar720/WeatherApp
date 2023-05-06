import Icon from "./Icon"

const Main = (props) => {
  const currWeather = props.currentWeather.forcast;
  return (
      <div className='main'>
        {/* current temp */}
          <div className="main-tmp">
            <h3>{props.city.name}</h3>
            <h1>{Math.ceil(currWeather[0].main.temp)}°</h1>
              <Icon name={currWeather[0].weather[0].main} class={"weather-icon " + currWeather[0].weather[0].main}/>
            <p className="clr-suddle">{currWeather[0].weather[0].description}<br/></p>
            <span>
            H: {Math.ceil(props.currentWeather.range.max)}°
            <span className="space-1"></span>
            L:{Math.ceil(props.currentWeather.range.min)}°

              
            </span>
            </div>

          <div className="main-stats">              
              {/* weather stats */}

              <section>
                <p className="heighlight">{Math.ceil(currWeather[0].main.feels_like)}°</p>
                <p> <i class="fa-solid fa-temperature-half"></i> Feels like</p>
              </section>
              <section>
                <p className="heighlight">{Math.ceil(currWeather[0].wind.speed)}mph</p>
                <p> <i class="fa-solid fa-wind"></i> Wind</p>
              </section>
              <section>
                <p  className="heighlight">{Math.ceil(currWeather[0].main.humidity)}% </p>
                <p> <i class="fa-solid fa-droplet"></i> Humidity</p>
              </section>
              <section>
                <p className="heighlight">{(currWeather[0].main.pressure * 0.03).toFixed(2)} inHg</p>
                <p><i class="fa-solid fa-weight-scale"></i> Pressure</p>
              </section>
              <section>
                <p className="heighlight">{props.city.sunrise}</p>
                <p> <i class="fa-solid fa-sun"></i> Sunrise</p>
              </section>
              <section>
                <p className="heighlight">{props.city.sunset}</p>
                <p> <i class="fa-solid fa-moon"></i> Sunset</p>
              </section>

          </div>
          <h4 className="float"><i class="fa-solid fa-calendar-day"></i> {currWeather[0].day.day} forcast</h4>

          {/* 3hour forcast */}
          <div className="slide">
            <div className="slide-frame">
              {currWeather.map((hour,key)=>{
                return(
                  <div className="hour-card" key={key}>
                      <li>{Math.ceil(hour.main.temp)}°</li>
                      <Icon name={hour.weather[0].main}/>
                      {
                        hour.rain?<li >{ (hour.rain['3h']).toFixed(1)}mm</li>:
                        hour.snow?<li >{ (hour.snow['3h']).toFixed(1)}mm</li>:<li></li>
                      }
                      <li className="gray time">{hour.day.time.replace(/[0,:,' ']/g,'')}</li>
                  </div>
                )
              })}
              
            </div>
          </div>
      </div>
    )
}

export default Main 