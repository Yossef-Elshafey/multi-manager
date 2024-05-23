import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useTok } from "../helpers/cookieManager";
import { Input } from "./Input";
import { AlertContext, Tasks } from "./nav/actions/ManageTask";
import { Overlay } from "./Overlay";

type UpdateProps = {
  setState: React.Dispatch<React.SetStateAction<any>>;
  target: string;
  updateDone: React.Dispatch<React.SetStateAction<any>>;
  tasks: Tasks;
};

function UpdateTask({ tasks, setState, target, updateDone }: UpdateProps) {
  const { signal, setSignal } = useContext(AlertContext);
  const [newData, setNewData] = useState({
    title: "",
    desc: "",
    completed: false,
    finish_by: "",
  });

  const target_obj = tasks.find((obj) => obj.slug === target);
  const token = useTok();

  useEffect(() => {
    if (target_obj) {
      setNewData({
        title: target_obj.title,
        desc: target_obj.desc,
        completed: target_obj.completed,
        finish_by: String(target_obj.finish_by),
      });
    }
  }, [target_obj]);

  useEffect(() => {
    if (signal === 1) {
      updateTask();
    }
    if (signal === 2) {
      setSignal(0);
      updateDone(false);
    }
  }, [signal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    setNewData((prev) => ({ ...prev, [name]: checked }));
  };

  const updateTask = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/todo/my-todo/${target}`,
        newData,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      setState((prev: any) => {
        const index = prev.findIndex((obj: any) => obj.slug === target);
        const newArray = [...prev];
        newArray[index] = { ...newArray[index], ...newData, slug: target }; // Ensure slug is preserved
        console.log("new", newArray, "prev", prev);
        return newArray;
      });
      updateDone(false);
      setSignal(0);
      setNewData({
        title: "",
        desc: "",
        completed: false,
        finish_by: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="fixed w-3/4">
      <Overlay>
        <Input
          inputType="text"
          placeholder={target_obj?.title}
          id="title"
          label="Title"
          onChange={handleChange}
          value={newData.title}
        />
        <Input
          inputType="text"
          placeholder={target_obj?.desc}
          id="desc"
          label="Description"
          onChange={handleChange}
          value={newData.desc}
        />
        <label
          htmlFor="completed"
          className="flex items-center justify-start gap-x-4 text-white"
        >
          Completed
          <input
            type="checkbox"
            name="completed"
            checked={newData.completed}
            onChange={handleCheck}
          />
        </label>
        <Input
          inputType="date"
          placeholder={String(target_obj?.finish_by)}
          id="finish_by"
          label="Finish by"
          onChange={handleChange}
          value={newData.finish_by}
        />
        <div className="flex items-center justify-end gap-x-4 mt-4">
          <button
            className="text-white p-2 w-20 rounded-md bg-green-500"
            onClick={() => setSignal(1)}
          >
            Continue
          </button>
          <button
            className="text-white p-2 w-20 bg-red-500 rounded-md"
            onClick={() => setSignal(2)}
          >
            Exit
          </button>
        </div>
      </Overlay>
    </div>
  );
}

export default UpdateTask;
