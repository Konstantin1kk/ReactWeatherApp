import React from 'react'
import '../Styles/Slider.css'

class Slider extends React.Component {
	constructor(props) {
		super(props)
		this.sliderRef = React.createRef()
		this.prevBtn = React.createRef()
		this.nextBtn = React.createRef()
		this.scrollByAmount = this.scrollByAmount.bind(this)
		this.scrollToPrev = this.scrollToPrev.bind(this)
		this.scrollToNext = this.scrollToNext.bind(this)
		this.getNextSlide = this.getNextSlide.bind(this)
		this.getNextSlideWidth = this.getNextSlideWidth.bind(this)
		this.scrollToPrev = this.scrollToPrev.bind(this)
		this.getPrevSlideWidth = this.getPrevSlideWidth.bind(this)
		this.getPrevSlideWidth = this.getPrevSlideWidth.bind(this)
		this.isSliderStart = this.isSliderStart.bind(this)
		this.isSliderFinish = this.isSliderFinish.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
	}

	scrollToPrev(event) {
		this.scrollByAmount(-this.getPrevSlideWidth())
	}

	scrollToNext(event) {
		this.scrollByAmount(this.getNextSlideWidth())
	}

	getNextSlide() {
		const currentScroll = this.sliderRef.current.scrollLeft
		return this.children.find(slide => slide.offsetLeft > currentScroll)
	}

	getPrevSlide() {
		const currentScroll = this.sliderRef.current.scrollLeft
		return this.children
			.reverse()
			.find(slide => slide.offsetLeft < currentScroll)
	}

	getPrevSlideWidth() {
		const prevSlide = this.getPrevSlide()
		if (prevSlide) {
			return this.sliderRef.current.scrollLeft - prevSlide.offsetLeft
		}
		return 0
	}

	getNextSlideWidth() {
		const nextSlide = this.getNextSlide()

		if (nextSlide) {
			return nextSlide.offsetLeft - this.sliderRef.current.scrollLeft
		}
		return 0
	}

	get children() {
		return [...this.sliderRef.current.children]
	}

	scrollByAmount(amount) {
		this.sliderRef.current.scrollBy({
			left: amount,
			behavior: 'smooth',
		})
	}

	isSliderFinish() {
		return (
			Math.ceil(
				this.sliderRef.current.scrollLeft + this.sliderRef.current.offsetWidth
			) >=
			this.sliderRef.current.scrollWidth - 1
		)
	}

	isSliderStart() {
		return this.sliderRef.current.scrollLeft <= 1
	}

	handleScroll(event) {
		this.prevBtn.current.hidden = this.isSliderStart()
		this.nextBtn.current.hidden = this.isSliderFinish()
	}

	render() {
		return (
			<React.Fragment>
				<button
					ref={this.prevBtn}
					id='slider-btn-prev'
					className='button-slider'
					onClick={this.scrollToPrev}
					hidden
				></button>

				<div
					className={this.props.className}
					ref={this.sliderRef}
					onScroll={this.handleScroll}
				>
					{this.props.children}
				</div>
				<button
					ref={this.nextBtn}
					id='slider-btn-next'
					className='button-slider'
					onClick={this.scrollToNext}
				></button>
			</React.Fragment>
		)
	}
}

export default Slider
