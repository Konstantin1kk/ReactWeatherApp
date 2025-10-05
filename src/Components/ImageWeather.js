import React from 'react'
import '../Styles/ImageWeather.css'
import сleary from '../Images/clear.png'
import rain from '../Images/rain.png'
import cloudy from '../Images/cloudy.png'
import snow from '../Images/snow.png'

function ImageWeather(props) {
	const imageWeather = function (main) {
		switch (main) {
			case 'Clear':
				return <img src={сleary}></img>
			case 'Clouds':
				return <img src={cloudy}></img>
			case 'Rain':
				return <img src={rain}></img>
			case 'Snow':
				return <img src={snow}></img>
		}
	}
	return (
		<React.Fragment>
			<div className='image-state-weather'>{imageWeather(props.main)}</div>
		</React.Fragment>
	)
}

export default ImageWeather
