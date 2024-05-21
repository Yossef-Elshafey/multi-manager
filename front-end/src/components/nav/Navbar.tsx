import { motion } from "framer-motion";
import { useIsLoggedin } from "../../helpers/cookieManager";
import { AnonNav } from "./AnonNav";
import { UserNav } from "./UserNav";


function Navbar() {
	const isLogged = useIsLoggedin();
	return (
		<nav>
			<motion.div className="h-[80px]" animate={{ y: 15 }}>
				{!isLogged ? <AnonNav /> : <UserNav />}
			</motion.div>
		</nav>
	);
}

export default Navbar;
