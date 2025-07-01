import React, { useState } from 'react'
import axios from 'axios'
import ParameterForm from "./components/ParameterForm";
import Graph from "./components/Graph";
import './App.css'

function App() {
	const [solutionData, setSolutionData] = useState({
		equation: "",
		x_initial: 0,
		y_initial: 0,
		step_size: 0.1,
		x_end: 0,
	});

	const [graphData, setGraphData] = useState([]);

	const [method, setMethod] = useState('euler');

	const handleFormSubmit = async (formData) => {
		const response = await axios.post("http://localhost:8000", {
			equation: formData.equation,
			x_initial: formData.x_initial,
			y_initial: formData.y_initial,
			step_size: formData.step_size,
			x_end: formData.x_end,
			method,
		});
		const formattedPoints = response.data.points.map(([x,y]) => ({x,y}));
		setGraphData(formattedPoints);
		setSolutionData(response);
	}

	return (
		<>
			<div className="header">
				<h1 className="title">{"Numerical Methods Visualizer"}</h1>
				<h3 className="title-description">{"Visualize ODEs by estimating their solutions using Euler's method, Heun's method, or Runge-Kutta's method."}</h3>
			</div>
			<div className="result">
				<ParameterForm onSubmit={handleFormSubmit} />
				{solutionData && <pre></pre>}
				<Graph data={graphData} />
			</div>
			<div className='radio-buttons'>
				<div className='radio-group'>
					<input name='method' type='radio' value='euler' id='euler-radio' checked={method == 'euler'} onChange={e => setMethod(e.target.value)}></input>
					<label htmlFor='euler-radio'>Euler</label>
				</div>
				<div className='radio-group'>
					<input name='method' type='radio' value='heun' id='heun-radio' checked={method == 'heun'} onChange={e => setMethod(e.target.value)}></input>
					<label htmlFor='heun-radio'>Heun</label>
				</div>
				<div className='radio-group'>
					<input name='method' type='radio' value='runge' id='runge-radio' checked={method =='runge'} onChange={e => setMethod(e.target.value)}></input>
					<label htmlFor='runge-radio'>Runge-Kutta</label>
				</div>
			</div>
		</>
  	)
}

export default App
