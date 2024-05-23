import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Overlay } from "../../Overlay";
import { actionSchema, UserNavActionsProps } from "../UserNavActions";
import { Input } from "../../Input";
import { useTok } from "../../../helpers/cookieManager";
import { ReRenderContext } from "../../../pages/home/UserHome";

export const Task = ({ setAction }: UserNavActionsProps) => {
  const [data, setData] = useState({
    title: "",
    desc: "",
    finish_by: "",
  });
  const [err, setErr] = useState(false);
  const [succ, setSucc] = useState(false);
  const token = useTok();
		const state = useContext(ReRenderContext)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSucc(false);
    const { name, value } = e.currentTarget;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const setDataHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const req = await actionSchema(
      "http://localhost:8000/api/todo/my-todo/",
      data,
      token,
    );
    if (req.status !== 201) {
      setErr(true);

    }
    if (req.status === 201) {
      setSucc(true);
				state.setRender(true)
      setData({ title: "", desc: "", finish_by: "" });
    }
  };

  return (
    <Overlay>
      {succ && (
        <motion.div
          className="w-full text-center p-2 text-white font-bold text-xl bg-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Submited Successfully
        </motion.div>
      )}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center mx-auto justify-center h-full gap-y-4 w-1/2"
      >
        <h2 className="text-white text-xl top-20">
          Manage your tasks and get statics about your performance
        </h2>
        <Input
          id="title"
          label="Title"
          inputType="text"
          value={data.title}
          onChange={changeHandler}
        />
        <Input
          id="desc"
          label="Description"
          inputType="text"
          value={data.desc}
          onChange={changeHandler}
        />
        <Input
          id="finish_by"
          label="Finish By"
          inputType="date"
          value={data.finish_by}
          onChange={changeHandler}
        />
        <div className="flex gap-x-4">
          <button
            className="rounded-md mt-2 bg-green-500 py-2 px-4 text-white"
            onClick={setDataHandler}
          >
            Set
          </button>
          <button
            className="rounded-md mt-2 bg-rose-500 py-2 px-4 text-white"
            onClick={() => setAction(false)}
          >
            Exit
          </button>
        </div>
      </form>
    </Overlay>
  );
};
