import { actionTypeGuard } from "../../Utils/actionTypeGuard";
import { ActionType } from "../../RtcContext";
import { CallbacksInterface } from "../../PropsContext";
export const initState = {};
export interface stateType {}

const eventReducer = (
  state: stateType,
  action: ActionType<keyof CallbacksInterface>
) => {
  let stateUpdate: Partial<stateType> = initState;
  switch (action.type) {
    case "EndCall":
      if (actionTypeGuard(action, action.type)) {
        // stateUpdate = { ...state, isScreensharing: action.value[0] };
        // console.log("!Screensharingstate", state, stateUpdate);
      }
      break;
    default:
      throw new Error(`No case for type ${action.type} found`);
  }
};

export default eventReducer;
