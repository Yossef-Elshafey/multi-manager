import { motion } from "framer-motion";
import axios from "axios";
import { MouseEventHandler, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import UserNavActions from "./UserNavActions";

type ResType = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	username: string;
};

export const UserNav = () => {
	const [data, setData] = useState<ResType>({} as ResType);
	const [cookie, setCookie] = useCookies(["auth_user"]);
	const [actionRequired, setActionRequired] = useState(false);

		
	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/users/me", {
				headers: {
					Authorization: `Token ${cookie.auth_user}`,
				},
			});
			setData(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
		const elemets = document.querySelectorAll(".user-action");
		elemets.forEach((ele) => ele.setAttribute("data-active", "false"));
		e.currentTarget.setAttribute("data-active", "active");
		setActionRequired(true);
	};

	return (
		<>
			{actionRequired && <UserNavActions setAction={setActionRequired} />}
			<div className="border-b pb-2">
				<div className="flex items-center justify-between gap-x-2">
					<ul className="text-white flex items-center gap-x-4">
						<motion.li
							onClick={handleClick}
							data-name="task"
							data-active={false}
							className="cursor-pointer p-1 text-cyan-500 text-xl user-action"
							whileHover={{ scale: 1.2 }}
							initial={{ opacity: 0, x: -50 }}
							animate={{ x: 0, opacity: 1 }}
						>
							Tasks
						</motion.li>
						<motion.li
							onClick={handleClick}
							data-active={false}
							data-name="fin"
							className="cursor-pointer p-1 text-cyan-500 text-xl user-action"
							whileHover={{ scale: 1.2 }}
							initial={{ opacity: 0, x: -50 }}
							animate={{ x: 0, opacity: 1 }}
						>
							Financial Control
						</motion.li>
						<motion.li
							onClick={handleClick}
							data-active={false}
							data-name="event"
							className="cursor-pointer p-1 text-cyan-500 text-xl user-action"
							whileHover={{ scale: 1.2 }}
							initial={{ opacity: 0, y: -50 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ ease: "easeOut" }}
						>
							Events
						</motion.li>
					</ul>
					<h2 className="capitalize text-xl text-white">
						{data.first_name} {data.last_name}
						<span className="text-white text-xl ml-4">&darr;</span>
					</h2>
				</div>
			</div>
		</>
	);
};
