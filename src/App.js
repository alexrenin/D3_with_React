import React, {Component} from "react"
import LineChart from "./Components/LineChart/LineChart"
import "./App.css"
import HeaderMenu from "./Components/MenuHeaderDesctopAndMobile/HeaderMenu"

class App extends Component {

	render () {
		const {contentList} = storage.headerMenu
		
		return (
			<div className="App">
				<HeaderMenu {...{
					contentList,
				}} />
				<div className="contentContainer">
					<LineChart
						height={300}
						width={600}
					/>
				</div>
			</div>
		)
	}
}

const storage = {
	headerMenu: {
		contentList: [
			{
				title: 'Line & area chart',
				href: 'linechart00',
			}
		]
	}
}

export default App
