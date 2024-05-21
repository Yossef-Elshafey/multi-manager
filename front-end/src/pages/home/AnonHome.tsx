import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";

export default function AnonHome() {

	return (
		<div className="container text-white flex flex-col justify-between h-screen ">
			<Navbar />
			<div className="relative">
				<div className=" flex items-center justify-between">
					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 3 }}
						>
							<p className="text-xl">Keep your Notes, Tasks and alot more in</p>
							<h2 className="text-animation my-8" data-text="Fancy">
								Fancy
							</h2>
							<h2 className="text-animation my-8" data-text="Statistically">
								Statistically
							</h2>
							<h2 className="text-animation my-8" data-text="Motivational">
								Motivational
							</h2>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 0 }}
						animate={{ opacity: 1, x: 50 }}
						transition={{ duration: 1 }}
					>
						<img
							src={
								process.env.PUBLIC_URL +
								"tod2.png"
							}
							className="rounded-md"
							width={500}
						/>
					</motion.div>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 4 }}
				>
					<Link className="text-cyan-300 text-3xl p-2" to={"/sign-up"}>
						Get right into action
					</Link>
				</motion.div>
			</div>
		</div>
	);
}
