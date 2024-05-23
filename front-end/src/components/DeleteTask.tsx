import axios from "axios";
import { useContext, useEffect } from "react";
import { useTok } from "../helpers/cookieManager";
import Alert from "./Alert";
import { AlertContext, Tasks } from "./nav/actions/ManageTask";

type DeleteProps = {
  setState: React.Dispatch<React.SetStateAction<any>>;
  target: string;
  deleteDone: React.Dispatch<React.SetStateAction<any>>;
};

function DeleteTask({ setState, target, deleteDone }: DeleteProps) {
  /*
   * you don't need to know what each signal does
   * just keep informed that
   * eslint is not a javascript linter its typescript
   * modern web, animations, css is sick
   * javascript is pure javascript not anything else
   */

  const { signal, setSignal } = useContext(AlertContext);
  const token = useTok();
		console.log(signal);
		

  const deleteTask = () => {
    if (signal === 1) {
      axios.delete(`http://localhost:8000/api/todo/my-todo/${target}`, {
        headers: { Authorization: `Token ${token}` },
      });
      setState((prev: Tasks) => {
        return prev.filter((obj) => obj.slug !== target);
      });
      deleteDone(false);
      setSignal(0);
    }
    if (signal === 2) {
      deleteDone(false);
      setSignal(0);
    }
  };

  useEffect(() => {
    deleteTask();
  }, [signal]);

  return (
    <div className="absolute w-3/4">
      {signal === 0 && <Alert action="delete" target={target} />}
    </div>
  );
}

export default DeleteTask;
