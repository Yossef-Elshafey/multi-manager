import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { postCall } from "../helpers/fetch";
import { cookieExpire } from "../helpers/cookieManager";
import { useCookies } from "react-cookie";

export type SigninType = {
	email: string;
	password: string;
	error?: string;
};

function Signin() {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({ email: "", password: "", error: "" });
	const [cookie, setCookie] = useCookies(["auth_user"]);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setErrors({ email: "", password: "", error: "" });

		setFormData((prevState) => ({
			...prevState,

			[name]: value,
		}));
	};

	const handleSubmit = async (
		e: React.SyntheticEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		const path = "users/sign-in";
		const res = await postCall(path, formData);

		if (res.status !== 200) {
			setErrors(res.data);
		}
		if (res.status === 200) {
			setCookie("auth_user", res.data.token, {
				path: "/",
				expires: new Date(cookieExpire),
				secure: true,
				sameSite: "none",
				// httpOnly: true,
			});
			navigate("/");
		}
	};

	return (
		<div className="h-screen flex mx-auto flex-col items-center justify-center w-3/4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<form
					action=""
					onSubmit={handleSubmit}
					className="flex flex-col gap-y-2"
				>
					{/* invalid credentials */}
					{errors.error && <p className="text-rose-700">{errors.error}</p>}
					{/* blank */}
					{errors.email && <p className="text-rose-700">{errors["email"]}</p>}
					<Input
						id="email"
						label="Email"
						inputType="email"
						value={formData.email}
						onChange={handleChange}
					/>
					{/* blank */}
					{errors.password && (
						<p className="text-rose-700">{errors["password"]}</p>
					)}
					<Input
						id="password"
						label="Password"
						inputType="password"
						value={formData.password}
						onChange={handleChange}
					/>
										<Link to={"/sign-up"} className="ml-auto text-cyan-500">Get an account !</Link>
					<input
						type="submit"
						value="Submit"
						className="text-white bg-green-500 p-2 rounded-md cursor-pointer"
					/>
				</form>
			</motion.div>
		</div>
	);
}

export default Signin;
