import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ReRenderContext } from "../../../pages/home/UserHome";
import UpdateTask from "../../UpdateTask";
import DeleteTask from "../../DeleteTask";

export type Tasks = {
  completed: boolean;
  created_at: Date;
  desc: string;
  finish_by: Date;
  slug: string;
  title: string;
}[];

export const AlertContext = createContext<any>({});

function ManageTask() {
  const [signal, setSignal] = useState(0);
  const [tasks, setTasks] = useState<Tasks>([] as Tasks);
  const [cookie, setCookie] = useCookies(["auth_user"]);
  const [updateRequired, setUpdateRequired] = useState(false);
  const [deleteRequired, setDeleteRequired] = useState(false);
  const [targetObj, setTargetObj] = useState("");
  const state = useContext(ReRenderContext); // render after add

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/todo/my-todo/", {
        headers: { Authorization: `Token ${cookie.auth_user}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    getTasks();
    state.setRender(false);
  }, [state]);

  const performEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const slug = e.currentTarget.parentElement?.getAttribute("id");
    if (slug) {
      setUpdateRequired(true);
      setTargetObj(slug);
    }
  };

  const performDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const slug = e.currentTarget.parentElement?.getAttribute("id");
    if (slug) {
      setDeleteRequired(true);
      setTargetObj(slug);
    }
  };

  return (
    <>
      <AlertContext.Provider value={{ signal, setSignal }}>
        {updateRequired && (
          <UpdateTask
            setState={setTasks}
            target={targetObj}
            updateDone={setUpdateRequired}
            tasks={tasks}
          />
        )}
        {deleteRequired && (
          <DeleteTask
            setState={setTasks}
            target={targetObj}
            deleteDone={setDeleteRequired}
          />
        )}
        {tasks.map((task) => {
          return (
            <div
              className={`border ${!task.completed ? "border-gray-600" : "border-green-500"} flex flex-col gap-y-4 justify-between overflow-scroll rounded-md text-white p-2`}
              key={task.slug}
            >
              <h2 className="text-center text-3xl">{task.title}</h2>
              <p>{task.desc}</p>
              <div className="flex items-center justify-between">
                <p className="text-cyan-500">
                  Finish by {String(task.finish_by)}
                </p>
                <div className="flex items-center gap-x-2" id={task.slug}>
                  <span
                    className="cursor-pointer text-xl text-cyan-500"
                    onClick={performEdit}
                  >
                    <CiEdit />
                  </span>
                  <span
                    className="cursor-pointer text-xl text-rose-500"
                    onClick={performDelete}
                  >
                    <MdDeleteForever />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </AlertContext.Provider>
    </>
  );
}


export default ManageTask;
