import * as actions from "./actions";

export function createTask(payload: any) {
  return { type: actions.CREATE_TASK, payload };
}

export function deleteTask(payload: any) {
  return { type: actions.DELETE_TASK, payload };
}

export function cloneTask(payload: any) {
  return { type: actions.CLONE_TASK, payload };
}

export function updateTaskTitle(payload: any) {
  return { type: actions.UPDATE_TASK_TITLE, payload };
}

export function updateTaskContent(payload: any) {
  return { type: actions.UPDATE_TASK_CONTENT, payload };
}

export function updateTaskOrder(payload: any) {
  return { type: actions.UPDATE_TASK_ORDER, payload };
}
