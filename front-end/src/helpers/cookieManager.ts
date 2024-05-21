import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const dateFormat = () => {
	const expire_in_days = 7;
	const date = new Date();
	date.setDate(date.getDate() + expire_in_days);
	return date.toISOString();
};

export const cookieExpire = dateFormat();

export const useIsLoggedin = () => {
	const [isLogged, setIsLogged] = useState(false);
	const [cookie, setCookie, removeCookie] = useCookies(["auth_user"]);
	useEffect(() => {
		if (cookie.auth_user) {
			setIsLogged(true);
		}
	}, []);
	return isLogged;
};


export const useTok = () => {
		const [token , setToken] = useState<string>("")
		const [cookies, setCookie, removeCookie] = useCookies(['auth_user']);

		useEffect(() => {
				const authUser = cookies.auth_user;
				setToken(authUser)
		}, [])
		return token
}
