import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main.jsx";
import SignUp from "./components/SignUp.jsx";
import EmailVerify from "./components/EmailVerify.jsx";

import SignIn from "./components/SignIn.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import PasswordReset from "./components/PasswordReset.jsx";

import NotFoundPage from "./components/NotFound.jsx"
function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && 
			<Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<SignUp />} />
			
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />

			<Route path="/signin" exact element={<SignIn />} />
			<Route path="/" element={<Navigate replace to="/signin" />} />

			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />

			<Route component={NotFoundPage} />
		</Routes>
	);
}

export default App;
