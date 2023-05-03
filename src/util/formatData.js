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
    if(!dataObj) return {}
    let weather = {weekly:{},city:{}}
    weather.city.sunrise = formatTimestampDate(dataObj.city.sunrise).time;
    weather.city.sunset = formatTimestampDate(dataObj.city.sunset).time;
    weather.city.name = dataObj.city.name;
    //format week forcast
    for(let hourData of dataObj.list){
        let dt = formatTimestampDate(hourData.dt);
        //initialize object for each day
        weather.weekly[dt.date] = weather.weekly[dt.date] || {range:{min:1000,max:0},forcast:[]};
        hourData.day = dt; // set day info
        // temp range 
        weather.weekly[dt.date].range.min = (weather.weekly[dt.date].range.min > hourData.main.temp)?hourData.main.temp:weather.weekly[dt.date].range.min;
        weather.weekly[dt.date].range.max = (weather.weekly[dt.date].range.max < hourData.main.temp)?hourData.main.temp:weather.weekly[dt.date].range.max;
        
        weather.weekly[dt.date].forcast.push(hourData);
    }
    return weather;
}
// console.log(formatTimestampDate(1683007200))
export{
    formatTimestampDate,
    formatWeatherData
}