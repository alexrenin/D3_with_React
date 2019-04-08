import React, { Component } from 'react'
import {scaleLinear} from 'd3-scale'
import * as d3 from "d3"

class LineChart extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: getData(),
		}

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.setState({
			data: getData()
		})
	}

	componentDidMount() {
		this.createChart()
		this.updateChart()
	}

	componentDidUpdate() {
		this.updateChart()
	}

	createChart() {


	}

	updateChart() {
		const {data} = this.state

		let xScale = scaleLinear()
			.domain(d3.extent(data, d => d.x))
			.range([0, this.props.width])

		let yScale = scaleLinear()
			.domain([0, 1])
			.range([0, this.props.height])

		const xyLine = d3.line()
			.x(d => xScale(d.x))
			.y(d => yScale(d.y))

		let svg = d3.select(this.svgId)

		let line = svg.select('.line')

		if (!line.node()) {
			svg.append('path')
				.attr("class", "line")
				.datum(data)
				.attr('d', xyLine)
		} else {
			line.datum(data)
				.transition()
				.duration(750)
				.attr('d', xyLine)
		}

	}

	render() {
		return (
			<div>
				<svg
					width={this.props.width}
					height={this.props.height}
					ref={id => this.svgId = id}
				/>
				<div>
					<button onClick={this.handleClick}>
						Update
					</button>
				</div>
			</div>
		)
	}
}

function generateChart ({
	width = 500,
	height = 200,
}) {
	const xScale = scaleLinear()
		.range([0, width])

	const yScale = scaleLinear()
		.domain([0, 1])
		.range([0, height])

	return {
		xScale,
		yScale,
	}
}

function getData() {
	let numItems = 20 + Math.floor(20 * Math.random())
	let data = []
	for(let i=0; i<numItems; i++) {
		data.push({
			x: (i + Math.random())*10,
			y: Math.random(),
		})
	}
	return data
}

export default LineChart