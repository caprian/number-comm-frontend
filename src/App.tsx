import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
//import Auth from "./components/Auth";
//import Calculation from "./components/Calculation";
import "./App.css";
import Calculation from "./components/Calculation";
import Auth from "./components/Auth";
const App: React.FC = () => {
	const isAuthenticated = !!localStorage.getItem("token");

	return (
		<div className="App">
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route
					path="/calc"
					//element={<Calculation />}
					element={isAuthenticated ? <Calculation /> : <Navigate to="/auth" />}
				/>
				<Route path="/" element={<Navigate to="/auth" />} />
			</Routes>
		</div>
	);
};

export default App;
