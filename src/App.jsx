import React from "react";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
// import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from '@arcgis/core/config.js';

import "./App.scss";

// Required: Set this property to insure assets resolve correctly.
esriConfig.assetsPath = './assets'; 

class Map extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				map: null,
				view: null,
				popupTemplate: null,
				layers: []
			};
	}

	async componentDidMount() {
		console.log("Map Mounted");
		
		const theMap = new ArcGISMap({basemap: "streets-vector"});
		this.setState({map: theMap});

		this.setState((state,props) => {
			let theView = new MapView(
				{
					map: state.map,
					container: 'mapDiv',
					extent: this.props.extent
				}
			);
			theView.watch("extent", (oldVal, newVal) => {
				console.log("Extent Changed!");
				this.props.updateExtent(newVal);
			});
			return theView;
		});

	}

	render() {
		console.log("Map Rendered");
		return <div id="mapDiv" className="mapDiv"/>;
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			extent: {
				spatialReference: {
					wkid: 102100,
				},
				xmax: -7532018.743065212,
				xmin: -8597856.665473426,
				ymax: 5651193.164536728,
				ymin: 5225591.79104498
			}
		};
		this.updateExtent = this.updateExtent.bind(this);
	}

	updateExtent(newExtent) {
		console.log("updateExtent() called");
		this.setState({extent: newExtent});
	};

	componentDidUpdate(prevProps, prevState) {
		console.log("Map App Updated");
	};

	render() {
		return <div id="mapApp">
			<div className="header">
				<pre>{JSON.stringify(this.state.extent,null,"  ")}</pre>
			</div>
			<Map extent={this.state.extent} updateExtent={this.updateExtent}/>
		</div>;  
	}
}

export default App;