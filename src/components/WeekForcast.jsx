import Icon from "./Icon"
import { useState } from "react"

const WeekForcast = props => {
    let today = new Date().toDateString().substring(4);
    const [active,setActive] = useState(today);

    const handleClick = (weatherData)=>{
        setActive(prev=>weatherData.forcast[0].day.date);
        props.setDay(weatherData)

    }
    return (
        <div className='week-forcast-container'>
            <h4>Week Forcast</h4>
            {Object.values(props.weather.weekly).map((v,i)=>{
            //   console.log(v)
            return (
                <div key={i} className={'card  ' + v.range.condition} id={v.forcast[0].day.date === active?'selected-day':' '} onClick={()=>handleClick(v)}>
                    <h4 className="z-5">{v.forcast[0].day.date === today?'Today':v.forcast[0].day.day}</h4>
                    <span className="z-5"> <span className="tdown"><i class="fa-solid fa-arrow-down"></i>  {v.range.min}°</span>  /  <span className="tup"> {v.range.max}°  <i class="fa-solid fa-arrow-up"></i></span> </span>
                    <span className="icon-container">
                        <Icon name={v.range.condition} />
                    </span>
                </div>
            )
            })}
        </div>
    )
}



export default WeekForcast