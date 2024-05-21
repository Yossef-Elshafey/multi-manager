import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const AnonNav = () => {
	const anon = ["sign in", "sign up"];
	return (
		<ul className="flex items-center justify-center gap-x-4 text-xl">
			<motion.li whileHover={{ scale: 1.1 }}>
				<Link to="/about" className="underline-offset-8 underline">
					About
				</Link>
			</motion.li>
			{anon.map((link) => (
				<motion.li
					className="underline-offset-8 underline"
					key={link}
					whileHover={{ scale: 1.1 }}
				>
					<Link to={link.split(" ").join("-")}>
						{link[0].toUpperCase() + link.slice(1)}
					</Link>
				</motion.li>
			))}
		</ul>
	);
};
