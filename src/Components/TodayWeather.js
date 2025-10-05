import React from 'react'
import ImageWeather from './ImageWeather.js'
import '../Styles/TodayWeather.css'

function TodayWeather(props) {
	const date = new Date(props.date * 1000)
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	}

	const formattedDate = date.toLocaleString('ru-RU', options)

	return (
		<React.Fragment>
			<div className='today__info'>
				<div className='today__inner'>
					<div className='today__date'>
						Прогноз на {formattedDate}, {props.name}
					</div>

					<div className='today__precipitation'>
						<ImageWeather main={props.main} />
						<p className='cart__cart-element today__precipitation--textmod'>
							Осадки: {props.main}
						</p>
					</div>

					<div className='cart__info-box-wrapper cart__info-box-wrapper--mod'>
						<div className='info-box'>
							<p className='cart__cart-element'>Температура {props.temp} °C</p>
							<p className='cart__cart-element'>
								Скорость ветра {props.speed} м/c
							</p>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default TodayWeather
