import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SubmitAction from "../../SubmitAction";

export type Tasks = {
  completed: boolean;
  created_at: Date;
  desc: string;
  finish_by: Date;
  slug: string;
  title: string;
}[];

function ManageTask() {
  const [tasks, setTasks] = useState<Tasks>();
  const [cookie, setCookie] = useCookies(["auth_user"]);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [queryHelper, setQueryHelper] = useState({
    method: "",
    slug: "",
  });

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
  }, []);

  const performUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const slug = e.currentTarget.parentElement!.getAttribute("data-slug");
    if (slug) {
      setQueryHelper({ method: "UPDATE", slug: slug });
      setDisplayAlert(true);
    }
  };

  const performDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const slug = e.currentTarget.parentElement!.getAttribute("data-slug");
    if (slug) {
      setQueryHelper({ method: "DELETE", slug: slug });
      setDisplayAlert(true);
    }
    setDisplayAlert(true);
  };

  return (
    <>
      {displayAlert && (
        <SubmitAction
          setDisplayAlert={setDisplayAlert}
						queryHelper={queryHelper}
						reRenderState={setTasks}
        />
      )}
      {tasks?.map((task, i) => (
        <div
          className={`border  ${!task.completed ? "border-gray-600" : "border-green-500"} flex flex-col gap-y-4 justify-between overflow-scroll rounded-md text-white p-2`}
          key={i}
        >
          <h2 className="text-center text-3xl">{task.title}</h2>
          <p>{task.desc}</p>
          <div className="flex items-center justify-between">
            <p className="text-cyan-500">Finish by {String(task.finish_by)}</p>
            <div className="flex items-center gap-x-2" data-slug={task.slug}>
              <span
                className="cursor-pointer text-xl text-cyan-500"
                onClick={performUpdate}
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
      ))}
    </>
  );
}

export default ManageTask;
