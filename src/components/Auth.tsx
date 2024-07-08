import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import authService from "../services/authService";
import authService from "../services/authService";
import Calculation from "./Calculation";

const Auth: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			if (isLogin) {
				await authService.login(username, password);
				navigate("/calc");
			} else {
				await authService.register(username, password);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div>
				{" "}
				<h2>{isLogin ? "Login" : "Register"}</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
					<button type="submit">{isLogin ? "Login" : "Register"}</button>
				</form>
				<button onClick={() => setIsLogin(!isLogin)}>
					{isLogin ? "Switch to Register" : "Switch to Login"}
				</button>
			</div>
			<div>
				<Calculation />
			</div>
		</div>
	);
};

export default Auth;
