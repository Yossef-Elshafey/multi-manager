import axios from "axios";
import React, { useEffect, useState } from "react";
import { EvAction } from "./actions/Event";
import { Finance } from "./actions/Finance";
import { Task } from "./actions/Task";

export type UserNavActionsProps = {
  setAction: React.Dispatch<React.SetStateAction<any>>;
};

export function actionSchema(url: string, data: object, tok: string) {
  return axios.post(url, data, {
    headers: {
      Authorization: `Token ${tok}`,
    },
  });
}

function UserNavActions({ setAction }: UserNavActionsProps) {
  const [whichAction, setWhichAction] = useState({
    task: false,
    fin: false,
    event: false,
  });
  useEffect(() => {
    const elemets = document.querySelectorAll(".user-action");
    elemets.forEach((el) => {
      const attr = el.getAttribute("data-active");
      if (attr === "active") {
        setWhichAction((prev) => {
          return { ...prev, [String(el.getAttribute("data-name"))]: true };
        });
      }
    });
  }, []);

  return (
    <>
      {whichAction.task && <Task setAction={setAction} />}
      {whichAction.fin && <Finance setAction={setAction} />}
      {whichAction.event && < EvAction setAction={setAction} />}
    </>
  );
}

export default UserNavActions;
