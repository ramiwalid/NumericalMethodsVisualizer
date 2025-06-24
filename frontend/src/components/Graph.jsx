import React from "react";
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from "recharts";

function Graph({ data }) {
	return (
		<ResponsiveContainer className="graph" width="50%" height={400}>
			<LineChart data={data}>
				<XAxis dataKey="x" tickFormatter={(value) => value.toFixed(3)}>
					<Label value="x-value" position="insideBottom" offset={-15} />
				</XAxis>
				<YAxis>
					<Label value="y-value" angle={-90} position="insideLeft" offset={-1} />
				</YAxis>
				<CartesianGrid opacity={0.3} />
				<Tooltip content={<CustomToolTip />} /> 
				<Legend />
				<Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={true}/>
			</LineChart>
		</ResponsiveContainer>
	);
}

const CustomToolTip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
				<p className="text-medium text-lg">X:{label.toFixed(4)}</p>
				<p className="text-sm text-blue-400">
					Y: 
					<span className="ml-2">{payload[0].value.toFixed(4)}</span>
				</p>
			</div>
		);
	}
};

export default Graph;
