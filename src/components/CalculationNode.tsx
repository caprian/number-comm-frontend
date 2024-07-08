import React, { useState } from "react";
import "./Calculation.css";

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
	calc: Calculation;
	isAuthenticated: boolean;
	currentCalculation: Calculation | null;
	setCurrentCalculation: (calc: Calculation) => void;
	commentValue: number;
	setCommentValue: (value: number) => void;
	operator: string;
	setOperator: (value: string) => void;
	handleAddComment: () => void;
	calculations: Calculation[];
}

const CalculationNode = ({
	calc,
	isAuthenticated,
	currentCalculation,
	setCurrentCalculation,
	commentValue,
	setCommentValue,
	operator,
	setOperator,
	handleAddComment,
	calculations,
}: Props) => {
	return (
		<li className="calculation-node" key={calc._id}>
			<div className="calculation-wrapper">
				<strong className="user-name-element">{calc.userId?.username}:</strong>{" "}
				{calc.parent === null ? (
					<span className="calculation-element">{calc.left}</span>
				) : (
					<div>
						{calc.left} {calc.operator} {calc.right} = {calc.initialResult}
					</div>
				)}
				{isAuthenticated && (
					<button onClick={() => setCurrentCalculation(calc)}>
						Add Comment
					</button>
				)}
			</div>
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
			{calculations.filter((c) => c.parent === calc._id).length > 0 && (
				<ul className="calculations-tree">
					{calculations
						.filter((c) => c.parent === calc._id)
						.map((childCalc) => (
							<CalculationNode
								key={childCalc._id}
								calc={childCalc}
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
				</ul>
			)}
		</li>
	);
};

export default CalculationNode;
