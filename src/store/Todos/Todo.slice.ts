import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';

import RequestStatus from '@/enums/RequestStatus.enum';

import { TodoActions } from './Todo.actions';

/**
 * The type of a todo.
 * @interface
 * @property {number} id - The id of the todo.
 * @property {string} text - The text of the todo.
 * @property {boolean} completed - Whether the todo is completed.
 */
export interface IAllTodos {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * The type of the state in the todos slice.
 * @interface
 * @property {RequestStatus} status - The status of the requests.
 * @property {null | SerializedError} error - The error of the requests.
 * @property {IAllTodos[]} allTodos - The list of todos.
 */
export interface ITodoState {
  status: RequestStatus;
  error: null | SerializedError;
  allTodos: IAllTodos[];
}

/**
 * The initial state of the todos slice.
 * @const
 * @property {RequestStatus.Idle} status - The initial status of the requests.
 * @property {null} error - The initial error of the requests.
 * @property {IAllTodos[]} allTodos - The initial list of todos.
 */
const initialState: ITodoState = {
  status: RequestStatus.Idle,
  error: null,
  allTodos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * The reducer to add a todo.
     * @param {ITodoState} state - The current state.
     * @param {PayloadAction<Omit<IAllTodos, 'completed'>>} action - The action to add a todo.
     */
    addTodo(
      state: ITodoState,
      action: PayloadAction<Omit<IAllTodos, 'completed'>>,
    ) {
      state.allTodos.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    /**
     * The reducer to toggle a todo.
     * @param {ITodoState} state - The current state.
     * @param {PayloadAction<number>} action - The action to toggle a todo.
     */
    toggleTodo(state: ITodoState, action: PayloadAction<number>) {
      const todo = state.allTodos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  /**
   * The extraReducers to handle the custom actions.
   * @param {IAllTodos} state
   * @param {PayloadAction<number>[] | PayloadAction<SerializedError>[] | []} action
   */
  extraReducers: TodoActions,
});

export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
