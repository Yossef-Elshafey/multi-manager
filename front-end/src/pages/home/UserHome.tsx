import { createContext, useState } from "react";
import { motion } from "framer-motion";
import ManageTask from "../../components/nav/actions/ManageTask";
import Navbar from "../../components/nav/Navbar";

type ReRenderContext = {
  reRender: boolean;
  setRender: React.Dispatch<React.SetStateAction<any>>;
};
export const ReRenderContext = createContext<ReRenderContext>(
  {} as ReRenderContext,
);

export default function UserHome() {
  const [reRender, setRender] = useState(false);
  return (
    <div className="w-3/4 mx-auto py-4">
      <ReRenderContext.Provider value={{ reRender, setRender }}>
        <Navbar />
        <div>
          <motion.div
            className="h-[calc(100vh-120px)] overflow-scroll grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <ManageTask />
          </motion.div>
        </div>
      </ReRenderContext.Provider>
    </div>
  );
}
