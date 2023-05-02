const formatTimestampDate = (int_date)=>{
    // console.log(int_date)
    let date = new Date(int_date * 1000)
    return {
    day:date.toDateString().substring(0,3),
    date:date.toDateString().substring(4),
    time:date.toLocaleTimeString([],{ hour: "2-digit", minute: "2-digit" })
    }
}
const formatWeatherData = (dataObj)=>{
    let weather = {weekly:{},city:{}}
    weather.city.sunrise = formatTimestampDate(dataObj.city.sunrise).time;
    weather.city.sunset = formatTimestampDate(dataObj.city.sunset).time;
    weather.city.name = dataObj.city.name;
    //format week forcast
    for(let hourData of dataObj.list){
        let dt = formatTimestampDate(hourData.dt);
        console.log(dt.date)
        weather.weekly[dt.date] = weather.weekly[dt.date] || []
        hourData.day = dt;
        weather.weekly[dt.date].push(hourData)
    }
    return weather
}
// console.log(formatTimestampDate(1683007200))
export{
    formatTimestampDate,
    formatWeatherData
}