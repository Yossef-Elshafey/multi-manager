import ManageTask from "../../components/nav/actions/ManageTask";
import Navbar from "../../components/nav/Navbar";

export default function UserHome() {
  return (
    <div className="w-3/4 mx-auto py-4">
      <Navbar />
      <div className="h-[calc(100vh-120px)] overflow-scroll grid grid-cols-2 gap-4">
        <ManageTask />
      </div>
    </div>
  );
}
