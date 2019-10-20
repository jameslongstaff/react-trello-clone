import * as actions from "./actions";

export function createTask(payload) {
  return { type: actions.CREATE_TASK, payload };
}

export function deleteTask(payload) {
  return { type: actions.DELETE_TASK, payload };
}

export function cloneTask(payload) {
  return { type: actions.CLONE_TASK, payload };
}

export function updateTaskTitle(payload) {
  return { type: actions.UPDATE_TASK_TITLE, payload };
}

export function updateTaskContent(payload) {
  return { type: actions.UPDATE_TASK_CONTENT, payload };
}

export function updateTaskOrder(payload) {
  return { type: actions.UPDATE_TASK_ORDER, payload };
}
