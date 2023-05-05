
const Icon = (props) => {
    const codeToIcon = {
        Drizzle:"fa-solid fa-cloud-sun-rain",
        Rain:"fa-solid fa-cloud-showers-heavy",
        Thunderstorm:"fa-solid fa-cloud-bolt",
        Snow:"fa-regular fa-snowflake",
        Clear:"fa-solid fa-sun",
        Clouds:"fa-solid fa-cloud",
        Other:"fa-solid fa-wind"
    }
    const name = codeToIcon[props.name] || codeToIcon.Other
    // console.log(props.name,name)
    return (
        <i class={name + " " + props.class}></i>
    )
}

export default Icon