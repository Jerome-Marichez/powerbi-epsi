import React from 'react';
import { BarChart, Bar, CartesianGrid, YAxis } from 'recharts';

interface IChartProps {
	data: any[];
}

export function Chart({ data }: IChartProps): JSX.Element {
	if (!data || data.length === 0) {
		// Handle empty data or null/undefined cases
		return <div>No data available for the chart</div>;
	}

	const accumulateByKey = (originalArray: any[]): any => {
		const result: any = {};

		originalArray.forEach((obj) => {
			for (const key in obj) {
				if (key in result) {
					result[key].push({ uv: obj[key] });
				} else {
					result[key] = [{ uv: obj[key] }];
				}
			}
		});

		return result;
	};

	// Get the accumulated result
	const accumulatedResult: any = accumulateByKey(data);

	// Print the result
	console.log(accumulatedResult);

	const backtoArray = Object.entries(accumulatedResult);



	return (
		<>
			{backtoArray.map(([key, value], index) => (
				<div key={index}>
					<h2>{key}</h2>
					<BarChart width={600} height={600} data={value as any[]}>
						<Bar dataKey="uv" fill="lightgreen" />
						<CartesianGrid stroke="#ccc" />
						<YAxis />
					</BarChart>
				</div>
			))}
		</>
	);
}
