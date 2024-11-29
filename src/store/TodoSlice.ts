import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing a single todo item.
 */
export interface IAllTodos {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * Interface representing the state structure for the slice.
 */
export interface ITodoState {
  allTodos: IAllTodos[];
}

/**
 * The initial state of the todos slice.
 */
const initialState: ITodoState = {
  allTodos: [],
};

/**
 * Slice for managing todos, including actions and reducers.
 */
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * Action to add a new todo.
     * @param state - Current state of the todos slice.
     * @param action - The dispatched action containing the new todo data.
     */
    addTodo(state, action: PayloadAction<Omit<IAllTodos, 'completed'>>) {
      state.allTodos.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    /**
     * Action to toggle the completion status of a todo.
     * @param state - Current state of the todos slice.
     * @param action - The dispatched action containing the id of the todo to toggle.
     */
    toggleTodo(state, action) {
      const todo = state.allTodos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

// Exporting actions for use in components
export const { addTodo, toggleTodo } = todosSlice.actions;
// Exporting the reducer to be used in the store
export default todosSlice.reducer;
