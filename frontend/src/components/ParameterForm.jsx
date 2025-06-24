import React, { use, useState } from "react";
import axios from "axios";

function ParameterForm({ onSubmit }) {
	const [formData, setFormData] = useState({
		equation: "",
		x_initial: 0,
		y_initial: 0,
		step_size: 0.1,
		x_end: 0
	})
	const sendData = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:8000", {
				equation: formData.equation,
				x_initial: formData.x_initial,
				y_initial: formData.y_initial,
				step_size: formData.step_size,
				x_end: formData.x_end,
			});
			console.log("Server response: ", response);
		} catch (error) {
			console.log(formData);
			console.error("Error sending data: ", error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			sendData(e);
		}
		catch (error) {
			console.log("Error sending data");
		}
		onSubmit(formData);
		console.log("Form data to submit: ", formData);
	}

	return (
		<div className="input-parameters">
			<form onSubmit={handleSubmit}> 
				<ul>
					<label htmlFor="function" className="function-label"> 
						<span className="dy-dx">
						<math display="inline"> 
							<mfrac>
								<mi>dy</mi>
								<mi>dx</mi>
							</mfrac>
						</math>
						</span>
						<span className="function-eq">=</span> 
					</label>
					<input type="text" id="function" className="function-input" placeholder="Enter differential equation" value={formData.equation} onChange={(e) => setFormData({ ...formData, equation: e.target.value })}></input> 
					<br></br>

					<div className="initial-conditions">
						<label htmlFor="initial-x" className="initial-x-label">
							<span>x<sub>0</sub></span>
							<span className="initial-eq">=</span>
						</label>
						<input type="number" id="initial-x" className="initial-x" placeholder="Initial x-value" value={formData.x_initial} onChange={(e) => setFormData({ ...formData, x_initial: e.target.value})}></input>
						<br></br>
						<label htmlFor="initial-y" className="initial-y-label">
							<span>y<sub>0</sub></span>
							<span className="initial-eq">=</span>
						</label>
						<input type="number" id="initial-y" className="initial-y" placeholder="Initial y-value" value={formData.y_initial} onChange={(e) => setFormData({ ...formData, y_initial: e.target.value})}></input>
					</div>
					<label htmlFor="step-size" className="step-size-label">
						<span className="step-size-text">Step-size</span>
						<span className="step-size-eq">=</span>
					</label>
					<input type="number" id="step-size" className="step-size" placeholder="e.g. 0.1" value={formData.step_size} onChange={(e) => setFormData({ ...formData, step_size: e.target.value})}></input>
					<br></br>
					<label htmlFor="x-end" className="x-end-label">
						<span className="x-end-text">X-end</span>
						<span className="x-end-eq">=</span>
					</label>
					<input type="number" id="x-end" className="x-end" placeholder="e.g. 1.5" value={formData.x_end} onChange={(e) => setFormData({ ...formData, x_end: e.target.value})}></input>
				
					<br></br>
					<button type="submit" className="submit-btn">Visualize</button>
				</ul>
			</form>
		</div>
	);
};

export default ParameterForm;
