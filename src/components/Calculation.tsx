import React, { useEffect, useState } from "react";
import calcService from "../services/calcService";

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

interface Props {
	isLoggedIn: boolean;
}

const CalculationComponent: React.FC = (isLoggedIn) => {
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
			} catch (error) {
				console.error("Error fetching calculations:", error);
				setError(`Error fetching calculations ${error}`);
			}
		};

		fetchCalculations();
	}, []);

	const handleStartInitialCalculation = async () => {
		try {
			if (initialValue !== null && isLoggedIn) {
				await calcService.addInitialCalculation(initialValue);
				const data = await calcService.getCalculations();
				setCalculations(data);
				setInitialValue(null);
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
				isLoggedIn &&
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
			}
		} catch (error) {
			console.error("Error adding comment:", error);
			setError(`${error}`);
		}
	};

	const renderCalculations = (calcList: Calculation[]) => {
		return (
			<ul>
				{calcList.map((calc) => (
					<li key={calc._id}>
						<strong>{calc.userId?.username}:</strong>{" "}
						{calc.parent === null ? (
							calc.left
						) : (
							<>
								{calc.left} {calc.operator} {calc.right} = {calc.initialResult}
							</>
						)}
						{isAuthenticated && (
							<button onClick={() => setCurrentCalculation(calc)}>
								Add Comment
							</button>
						)}
						{currentCalculation?._id === calc._id && (
							<div>
								<input
									type="number"
									value={commentValue}
									onChange={(e) => setCommentValue(parseFloat(e.target.value))}
									placeholder="Enter Number"
									required
								/>
								<select
									value={operator}
									onChange={(e) => setOperator(e.target.value)}>
									<option value="+">+</option>
									<option value="-">-</option>
									<option value="*">*</option>
									<option value="/">/</option>
								</select>
								<button onClick={handleAddComment}>Comment</button>
							</div>
						)}
						{renderCalculations(
							calculations.filter((c) => c.parent === calc._id)
						)}
					</li>
				))}
			</ul>
		);
	};

	return (
		<div>
			<h2>Calculations</h2>
			<div style={{ color: "red" }}>{error}</div>

			<form onSubmit={handleStartInitialCalculation}>
				<input
					type="number"
					value={initialValue !== null ? initialValue : ""}
					onChange={(e) => setInitialValue(parseFloat(e.target.value))}
					placeholder="Initial Number"
					required
				/>
				{isAuthenticated && (
					<button type="submit">Add Initial Calculation</button>
				)}
			</form>
			{calculations.length > 0 &&
				renderCalculations(calculations.filter((c) => c.parent === null))}
		</div>
	);
};

export default CalculationComponent;
