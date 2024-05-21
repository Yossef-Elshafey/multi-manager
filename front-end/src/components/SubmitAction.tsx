import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTok } from "../helpers/cookieManager";
import { Tasks } from "./nav/actions/ManageTask";
import { Overlay } from "./Overlay";

type SubmittionProps = {
  setDisplayAlert: React.Dispatch<React.SetStateAction<any>>;
  queryHelper: {
    method: string;
    slug: string;
  };
  reRenderState: React.Dispatch<React.SetStateAction<any>>;
};

function SubmitAction({
  setDisplayAlert,
  queryHelper,
  reRenderState,
}: SubmittionProps) {
  const [alertSubmitted, setAlertSubmitted] = useState(false);
  const token = useTok();

  const performDelete = async () => {
    if (alertSubmitted) {
      const req = await axios({
        url: `http://localhost:8000/api/todo/my-todo/${queryHelper.slug}`,
        method: queryHelper.method,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      const stat = await req.status;
      if (stat === 204) {
        reRender();
      }
    }
  };

		const reRender = () => {
				reRenderState((prev:Tasks) => {
						return prev.filter((task) => task.slug !== queryHelper.slug)
				})
				setDisplayAlert(false)
		}
  useEffect(() => {
    performDelete();
  }, [alertSubmitted]);

  return (
    <div className="w-3/4 absolute">
      <Overlay>
        <h2 className="text-white text-2xl">
          Take an action on currently selected
        </h2>
        <div className="flex items-center justify-end gap-x-4">
          <button
            className="text-white bg-green-500 p-2 rounded-md"
            onClick={() => setAlertSubmitted(true)}
          >
            Continue
          </button>
          <button
            className="text-white bg-rose-700 p-2 rounded-md"
            onClick={() => setDisplayAlert(false)}
          >
            Cancel
          </button>
        </div>
      </Overlay>
    </div>
  );
}

export default SubmitAction;
