import axios from "axios";
import { SigninType } from "../pages/Signin";
import { SignupType } from "../pages/Signup";

export const postCall = async (
  path: String,
  payload: SignupType | SigninType,
) => {
  const url = "http://127.0.0.1:8000/api/";
  const call = await fetch(`${url}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const status = await call.status;
  const data = await call.json();
  return { data, status };
};
