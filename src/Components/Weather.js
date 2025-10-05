import React from 'react'
import { useState, useRef } from 'react'
import CartWeather from './CartWeather.js'
import TodayWeather from './TodayWeather.js'
import Slider from './Slider.js'
import '../Styles/Weather.css'
import '../Styles/Weather-falling.css'
import key from '../key.js'

function Weather() {
	const [data, setData] = useState({ today: null, fiveDays: null })
	const modalRef = useRef(null)
	const inputRef = useRef(null)

	const btnFind = useRef(null)
	const btnModal = useRef(null)

	const handleClickSubmit = function (event) {
		modalRef.current.className = 'modal'
		getWeather(event)
	}

	const handleClickReject = function (event) {
		modalRef.current.className = 'modal'
	}

	const getWeather = async function (event) {
		if (event.target === btnFind.current) {
			try {
				const textLocation = inputRef.current.value
				inputRef.current.value = ''
				const todayResponse = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${textLocation}&units=metric&appid=${key}`
				)
				const fiveDayResponse = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?q=${textLocation}&units=metric&appid=${key}`
				)

				if (!todayResponse.ok || !fiveDayResponse.ok) {
					throw new Error('Ошибка')
				}
				const dataToday = await todayResponse.json()
				const dataFiveDays = await fiveDayResponse.json()
				setData({ today: dataToday, fiveDays: dataFiveDays })
			} catch (error) {
				console.error(error)
			}
		} else if (event.target === btnModal.current) {
			try {
				if ('geolocation' in navigator) {
					const position = await new Promise((resolve, reject) => {
						navigator.geolocation.getCurrentPosition(resolve, reject)
					})
					const coords = position.coords
					const todayResponse = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${key}`
					)
					const fiveDayResponse = await fetch(
						`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${key}`
					)

					if (!todayResponse.ok || !fiveDayResponse.ok) {
						throw new Error('Ошибка')
					}
					const dataToday = await todayResponse.json()
					const dataFiveDays = await fiveDayResponse.json()
					setData({ today: dataToday, fiveDays: dataFiveDays })
				} else {
					console.log('Не поддерживается браузером')
				}
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<React.Fragment>
			<main className='weather-app'>
				<div className='modal' ref={modalRef}>
					<div className='modal__box'>
						<header className='modal__header modal__header--margin'>
							<h3 className='header__geolocation'>Geolocation</h3>
						</header>
						<p className='modal__question'>
							Хотите ли вы использовать свою локацию для получения погоды?
						</p>

						<div className='modal__actions'>
							<button
								id='confirm'
								className='button button--primary'
								onClick={handleClickSubmit}
								ref={btnModal}
							>
								Отправить локацию
							</button>
							<button
								id='reject'
								className='button button--reject'
								onClick={handleClickReject}
							>
								Отклонить
							</button>
						</div>
					</div>
				</div>

				<div className='weather-app__wrapper'>
					<div className='weather-app__container'>
						<div className='search search--style'>
							<input
								id='search'
								className='search__input'
								type='text'
								placeholder='Введите город...'
								ref={inputRef}
								autoComplete='off'
							/>
							<button
								className='button button--search'
								onClick={getWeather}
								ref={btnFind}
							>
								Поиск
							</button>
						</div>
						<div className='weather-app__today weather-app__today--element'>
							{data.today ? (
								<TodayWeather
									className='today'
									main={data.today.weather[0].main}
									temp={data.today.main.temp}
									speed={data.today.wind.speed}
									date={data.today.dt}
									name={data.today.name}
								/>
							) : null}
						</div>

						<div className='weather-app__week weather-app__week--element'>
							{data.fiveDays ? (
								<Slider className='slider'>
									{data.fiveDays
										? data.fiveDays.list.map((element, index) => {
												return (
													<CartWeather
														className='cart'
														key={index}
														main={element.weather[0].main}
														temp={element.main.temp}
														speed={element.wind.speed}
														date={element.dt_txt}
													/>
												)
										  })
										: null}
								</Slider>
							) : null}
						</div>
					</div>
				</div>
			</main>
		</React.Fragment>
	)
}

export default Weather
