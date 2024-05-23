import { useContext } from "react";
import { AlertContext } from "./nav/actions/ManageTask";
import { Overlay } from "./Overlay";

type KeepOrExitProps = {
  action: string;
  target: string;
};
const Alert = ({ action, target }: KeepOrExitProps) => {
  const { setSignal } = useContext(AlertContext);
  return (
      <Overlay>
        <h2 className="text-2xl text-white">
          Wanna {action} {target}
        </h2>
        <div className="flex items-center justify-end gap-x-4">
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
  );
};

export default Alert;
