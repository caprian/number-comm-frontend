import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import authService from "../services/authService";
import authService from "../services/authService";
import Calculation from "./Calculation";
import "./Auth.css";

const Auth: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const navigate = useNavigate();
	//const isAuthenticated = !!localStorage.getItem("token");
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("token")
	);
	const handleLogout = () => {
		if (isAuthenticated) {
			localStorage.removeItem("token");
			setIsAuthenticated(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			if (isLogin) {
				await authService.login(username, password);
				setIsAuthenticated(true);
				//navigate("/calc");
			} else {
				await authService.register(username, password);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="home-container">
			{isAuthenticated ? (
				<button className="header-element" onClick={handleLogout}>
					Logout
				</button>
			) : null}
			{!isAuthenticated && (
				<div className="authenticatior-container">
					{" "}
					<h2 className="header-element">{isLogin ? "Login" : "Register"}</h2>
					<form className="auth-form" onSubmit={handleSubmit}>
						<input
							className="username-input-box"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
							required
						/>
						<input
							className="password-input-box"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
						/>
						<button className="form-submit-button" type="submit">
							{isLogin ? "Login" : "Register"}
						</button>
					</form>
					<div className="switch-box-container">
						{isLogin ? "Not Registered Yet?" : "Already Registered?"}{" "}
						<button className="switch-box" onClick={() => setIsLogin(!isLogin)}>
							{isLogin ? "Switch to Register" : "Switch to Login"}
						</button>
					</div>
				</div>
			)}
			<div>
				<Calculation />
			</div>
		</div>
	);
};

export default Auth;
