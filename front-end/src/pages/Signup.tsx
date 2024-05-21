import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { cookieExpire } from "../helpers/cookieManager";
import { postCall } from "../helpers/fetch";

export type SignupType = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password_compare: string;
};

function Signup() {
  const [formData, setFormData] = useState<SignupType>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_compare: "",
  });

  const [errors, setErrors] = useState<SignupType>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_compare: "",
  });
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["auth_user"]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,

      [name]: value,
    }));
  };
  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const path = "users/sign-up";
    const res = await postCall(path, formData);

    // doesn't created
    if (res.status !== 201) {
      setErrors(res.data);
    }
    if (res.status === 201) {
      setCookie("auth_user", res.data.token, {
        path: "/",
        expires: new Date(cookieExpire),
        secure: true,
        sameSite: "none",
      });
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="h-screen flex flex-col items-center justify-center">
        <form
          action=""
          className="w-3/4 flex flex-col gap-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-x-4 items-center">
            <Input
              id="first_name"
              label="First Name"
              inputType="text"
              value={formData.first_name}
              onChange={handleChange}
              children={
                errors.first_name && (
                  <p className="text-rose-700">{errors["first_name"]}</p>
                )
              }
            />

            <Input
              id="last_name"
              label="Last Name"
              inputType="text"
              value={formData.last_name}
              onChange={handleChange}
              children={
                errors.first_name && (
                  <p className="text-rose-700">{errors["first_name"]}</p>
                )
              }
            />
          </div>
          <Input
            id="email"
            label="Email"
            inputType="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-rose-700">{errors["email"]}</p>}
          <Input
            id="username"
            label="Username"
            inputType="text"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="text-rose-700">{errors["username"]}</p>
          )}
          <Input
            id="password"
            label="Password"
            inputType="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-rose-700">{errors["password"]}</p>
          )}
          <Input
            value={formData.password_compare}
            id="password_compare"
            label="Check Password"
            inputType="password"
            onChange={handleChange}
          />

          {errors.password_compare && (
            <p className="text-rose-700">{errors["password_compare"]}</p>
          )}
						<Link to={"/sign-in"} className="ml-auto text-cyan-500">Already have an account</Link>
          <input
            type="submit"
            value="Submit"
            className="bg-green-500 w-1/2 mx-auto text-white p-2 cursor-pointer rounded-md"
          />
        </form>
      </div>
    </motion.div>
  );
}

export default Signup;
