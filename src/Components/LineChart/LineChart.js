import React, { Component } from 'react'
import {scaleLinear} from 'd3-scale'
import './LineChart.css'
import * as d3 from "d3"

class LineChart extends Component {
	constructor(props) {
		super(props)

		const generated = generateChart(props),
			data = getData()

		this.state = {
			data,
			...generated
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
		const svg = d3.select(this.svgId)
			.append("g")
			.attr("transform", "translate(" + C.padding + "," + C.padding + ")");

		svg.append('path')
			.attr("class", "area")

		svg.append('path')
			.attr("class", "line")

		svg.append("g")
			.attr("class", "axisX")
			.attr("transform", `translate(${0},${this.props.height - C.padding*2})`)

		svg.append("g")
			.attr("class", "axisY")

		svg.append("g")
			.attr("class", "dots")
	}

	updateChart() {
		let {data,
			yScale,
			xScale,
			xyLine,
			xyArea} = this.state

		xScale.domain(d3.extent(data, d => d.x))
		yScale.domain([0, 1])

		xyLine.x(d => xScale(d.x))
			.y(d => yScale(d.y))
			.curve(d3.curveMonotoneX)

		xyArea.x(d => xScale(d.x))
			.y0(yScale(0))
			.y1(d => yScale(d.y))
			.curve(d3.curveMonotoneX)

		const svg = d3.select(this.svgId)

		const line = svg.select('.line')
		line.datum(data)
			.transition()
			.duration(750)
			.attr('d', xyLine)

		const area = svg.select('.area')
		area.datum(data)
			.transition()
			.duration(750)
			.attr('d', xyArea)

		const axisX = d3.axisBottom(xScale),
			axisY = d3.axisLeft(yScale)

		svg.select('.axisY')
			.transition()
			.duration(750)
			.call(axisY)

		svg.select('.axisX')
			.transition()
			.duration(750)
			.call(axisX)

		const circle = svg.select('.dots')
			.selectAll(".dot")
			.data(data)

		circle.exit()
			.remove()

		circle.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d) => xScale(d.x))
			.attr("cy", (d) => yScale(d.y))
			.attr("r", 5)

		circle.transition()
			.duration(750)
			.attr("cx", (d) => xScale(d.x))
			.attr("cy", (d) => yScale(d.y))
			.attr("r", 5)
	}

	render() {
		return (
			<div className='chartContainer'>
				<div className='svg-container'>
					<svg
						className='svg-content-responsive'
						preserveAspectRatio='xMinYMin meet'
						viewBox={`0 0 ${this.props.width} ${this.props.height}`}
						ref={id => this.svgId = id}
					/>
				</div>
				<div>
					<button onClick={this.handleClick}>
						Update
					</button>
				</div>
			</div>
		)
	}
}

function generateChart({
	width = 1024,
	height = 720,
}) {
	const xScale = scaleLinear()
		.range([0, width - C.padding*2])

	const yScale = scaleLinear()
		.range([height - C.padding*2, 0])

	const xyLine = d3.line()

	const xyArea = d3.area()

	return {
		xScale,
		yScale,
		xyLine,
		xyArea,
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

const C = {
	padding: 25
}
export default LineChart