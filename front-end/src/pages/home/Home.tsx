import { useIsLoggedin, useTok } from "../../helpers/cookieManager";
import AnonHome from "./AnonHome";
import UserHome from "./UserHome";

function Home() {
	const isLogged = useIsLoggedin();
	return <>{isLogged ? <UserHome /> : <AnonHome />}</>;
}

export default Home;
