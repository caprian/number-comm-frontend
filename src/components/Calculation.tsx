import React, { useState, useEffect } from "react";
import calcService from "../services/calcService";
import "./Calculation.css";
import CalculationNode from "./CalculationNode";

interface Calculation {
	_id: string;
	parent: string | null;
	left: number;
	operator: string;
	right: number;
	result: number;
	initialResult: number;
	userId: {
		_id: string;
		username: string;
	};
}

const CalculationComponent = () => {
	const [calculations, setCalculations] = useState<Calculation[]>([]);
	const [initialValue, setInitialValue] = useState<number | null>(null);
	const [currentCalculation, setCurrentCalculation] =
		useState<Calculation | null>(null);
	const [operator, setOperator] = useState<string>("+");
	const [commentValue, setCommentValue] = useState<number>(0);
	const isAuthenticated = !!localStorage.getItem("token");
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const fetchCalculations = async () => {
			try {
				const data = await calcService.getCalculations();
				setCalculations(data);
				setError("");
			} catch (error) {
				console.error("Error fetching calculations:", error);
				setError(`Error fetching calculations ${error}`);
			}
		};

		fetchCalculations();
	}, []);

	const handleStartInitialCalculation = async () => {
		try {
			if (initialValue !== null) {
				await calcService.addInitialCalculation(initialValue);
				const data = await calcService.getCalculations();
				setCalculations(data);
				setInitialValue(null);
				setError("");
			}
		} catch (error) {
			console.error("Error starting initial calculation:", error);
			setError(`Error starting initial calculation : ${error}`);
		}
	};

	const handleAddComment = async () => {
		try {
			if (
				currentCalculation &&
				operator &&
				commentValue !== null &&
				isAuthenticated
			) {
				await calcService.addComment(
					currentCalculation._id,
					operator,
					commentValue
				);
				const data = await calcService.getCalculations();
				setCalculations(data);
				setCurrentCalculation(null);
				setOperator("+");
				setCommentValue(0);
				setError("");
			}
		} catch (error) {
			console.error("Error adding comment:", error);
			setError(`${error}`);
		}
	};

	return (
		<div>
			<h2>Number Communications</h2>
			<div style={{ color: "red" }}>{error}</div>
			{isAuthenticated && (
				<form onSubmit={handleStartInitialCalculation}>
					<input
						type="number"
						value={initialValue !== null ? initialValue : ""}
						onChange={(e) => setInitialValue(parseFloat(e.target.value))}
						placeholder="Initial Number"
						required
					/>
					{isAuthenticated && <button type="submit">Add Initial Number</button>}
				</form>
			)}
			{calculations.length > 0 &&
				calculations
					.filter((c) => c.parent === null)
					.map((calc) => (
						<CalculationNode
							key={calc._id}
							calc={calc}
							isAuthenticated={isAuthenticated}
							currentCalculation={currentCalculation}
							setCurrentCalculation={setCurrentCalculation}
							commentValue={commentValue}
							setCommentValue={setCommentValue}
							operator={operator}
							setOperator={setOperator}
							handleAddComment={handleAddComment}
							calculations={calculations}
						/>
					))}
		</div>
	);
};

export default CalculationComponent;
