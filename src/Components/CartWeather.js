import React from 'react'
import ImageWeather from './ImageWeather.js'
import '../Styles/CartWeather.css'

function CartWeather(props) {
	return (
		<React.Fragment>
			<div className='cart__wrapper'>
				<div className='image-box'>
					<ImageWeather main={props.main} />
					<p className='cart__cart-element'>{props.date}</p>
				</div>
				<div className='cart__info-box-wrapper'>
					<div className='info-box'>
						<p className='cart__cart-element'>Осадки {props.main}</p>
						<p className='cart__cart-element'>Температура {props.temp} °C</p>
						<p className='cart__cart-element'>Скорость ветра {props.speed}</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default CartWeather
