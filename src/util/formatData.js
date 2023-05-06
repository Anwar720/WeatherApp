const formatTimestampDate = (int_date)=>{
    // console.log(int_date)
    let date = new Date(int_date * 1000)
    return {
    day:date.toDateString().substring(0,3),
    date:date.toDateString().substring(4),
    time:date.toLocaleTimeString([],{ hour: "2-digit", minute: "2-digit" })
    }
}
// rank of weather from high to low
const conditionRank = (condition)=>{
    const conditions = {
        'Thunderstorm':900,
        'Snow':800,
        'Rain':700,
        'Drizzle':600,
        'Clouds':500,
        'Clear':100
    }
    // console.log('condition',condition,'->',conditions[condition])
    return conditions[condition] || 200;
}

const formatWeatherData = (dataObj)=>{
    if(!dataObj) return {}
    if(dataObj.cod === '404') return dataObj;
    
    let weather = {weekly:{},city:{}}
    weather.city.sunrise = formatTimestampDate(dataObj.city.sunrise).time;
    weather.city.sunset = formatTimestampDate(dataObj.city.sunset).time;
    weather.city.name = dataObj.city.name;
    //format week forcast
    for(let hourData of dataObj.list){
        let dt = formatTimestampDate(hourData.dt);
        //initialize object for each day
        weather.weekly[dt.date] = weather.weekly[dt.date] || {range:{min:1000,max:0,condition:"Clear"},forcast:[]};
        hourData.day = dt; // set day info
        // temp range 
        const minTemp = (weather.weekly[dt.date].range.min > hourData.main.temp)?hourData.main.temp:weather.weekly[dt.date].range.min;
        const maxTemp = (weather.weekly[dt.date].range.max < hourData.main.temp)?hourData.main.temp:weather.weekly[dt.date].range.max;
        const oldCondition = conditionRank(weather.weekly[dt.date].range.condition) ;
        const newCondition = conditionRank(hourData.weather[0].main);
        const highestWeatherCondition = (oldCondition < newCondition)?hourData.weather[0].main:weather.weekly[dt.date].range.condition;

        weather.weekly[dt.date].range.min = minTemp;
        weather.weekly[dt.date].range.max = maxTemp;
        weather.weekly[dt.date].range.condition = highestWeatherCondition;
        weather.weekly[dt.date].forcast.push(hourData);
    }
    return weather;
}
export{
    formatTimestampDate,
    formatWeatherData
}