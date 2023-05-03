import React from 'react'

const TopBar = props => {
    let date = new Date().toDateString()
    let day = date.slice(0,3)
return (
    <>
    <div className='top-bar'>
        <div>
            <h3>{day}</h3>
            <h4>{date.substring(3)}</h4>
        </div>
        <section className='search'>
            <input type="text" ref={props.textInput} id="textInput"  placeholder='Enter a city...'/>
            <i className="fa-solid fa-magnifying-glass" onClick={()=>props.handleClick()}></i>
        </section>
    </div>
    </>
  )
}


export default TopBar