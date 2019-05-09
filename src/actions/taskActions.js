import { TASK_PENDING } from "./types";

export const incrementTaskPending = task => dispatch =>
  dispatch(incrementPending({ task: task }));

const incrementPending = task => ({
  type: TASK_PENDING,
  task
});
