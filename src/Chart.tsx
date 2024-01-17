import React from 'react';
import { BarChart, Bar, CartesianGrid, YAxis, Tooltip } from 'recharts';

interface IChartProps {
	data: any[];
}

/**
 * 
 * @returns A List of charts for each data providen
 */
export function Chart({ data }: IChartProps): JSX.Element {
	if (!data || data.length === 0) {
		// Handle empty data or null/undefined cases
		return <div>No data available for the chart</div>;
	}

	const accumulateByKey = (originalArray: any[]): any => {
		const result: any = {};

		originalArray.forEach((obj) => {
			for (const key in obj) {
				const numericValue = parseFloat(obj[key]);

				if (!isNaN(numericValue)) {
					if (key in result) {
						result[key].push({ valeur: obj[key] });
					} else {
						result[key] = [{ valeur: obj[key] }];
					}
				}
			}
		});

		return result;
	};

	// Get the accumulated result
	const accumulatedResult: any = accumulateByKey(data);

	// Print the result
	console.log(accumulatedResult);


	// Back to Array to get data ready for Recharts
	const backtoArray: [string, any[]][] = Object.entries(accumulatedResult);

	// Sort no numeric data
	backtoArray.forEach(([key, value]) => { value.sort((a, b) => a.valeur - b.valeur); });

	return (
		<>
			{backtoArray.map(([key, value], index) => {
				// Find the middle element in the array
				const middleIndex = Math.floor(value.length / 2);
				const middleValue = value[middleIndex]?.valeur;

				return (
					<div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "space-around" }}>
						<h2>{key} - Valeur à 50%: <span style={{ backgroundColor: "lightgrey", padding: "10px", borderRadius: "50px" }}>{middleValue}</span></h2>
						<BarChart width={1200} height={400} data={value as any[]}>
							<Bar dataKey="valeur" fill="lightgreen" />
							<CartesianGrid stroke="#ccc" />
							<Tooltip />
							<YAxis />
						</BarChart>
					</div>
				);
			})}
		</>
	);
}
