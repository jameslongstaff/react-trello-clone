import * as actions from "./actions";

export const createTask = (payload: any) => {
  return { type: actions.CREATE_TASK, payload };
};

export const deleteTask = (payload: any) => {
  return { type: actions.DELETE_TASK, payload };
};

export const cloneTask = (payload: any) => {
  return { type: actions.CLONE_TASK, payload };
};

export const updateTaskTitle = (payload: any) => {
  return { type: actions.UPDATE_TASK_TITLE, payload };
};

export const updateTaskContent = (payload: any) => {
  return { type: actions.UPDATE_TASK_CONTENT, payload };
};

export const updateTaskEstimates = (payload: any) => {
  return { type: actions.UPDATE_TASK_ESTIMATES, payload };
};

// export function updateTaskOrder(payload) {
//   return { type: actions.UPDATE_TASK_ORDER, payload };
// }
