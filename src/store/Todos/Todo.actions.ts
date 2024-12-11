/**
 * Actions for managing todos.
 *
 * @remarks
 * This module provides actions for fetching todos from the server.
 *
 * @packageDocumentation
 */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import RequestStatus from '@/enums/RequestStatus.enum';
import AppLogger from '@/helpers/AppLogger';
import { APIClient } from '@/services/APIClient';

import { ITodoState } from './Todo.slice';

/**
 * Fetches todos from the server.
 */
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (payload, { getState, dispatch }): Promise<any> => {
    try {
      const client = new APIClient();

      const response = await client.get('todos');

      if (!response) {
        throw new Error('No response from server');
      }

      return response;
    } catch (error: any) {
      if (error instanceof Error) {
        AppLogger.error('Fetch todos failed:', error.message);
      } else {
        AppLogger.error('An unknown error occurred:', error);
      }
      throw error;
    }
  },
);

/**
 * Reducers for the todos slice.
 *
 * @param builder - The builder for creating the reducers.
 */
export function TodoActions(builder: ActionReducerMapBuilder<ITodoState>) {
  builder
    /** Reducer for when the fetchTodos action is pending. */
    .addCase(fetchTodos.pending, (state, action) => {
      state.status = RequestStatus.Pending;
      state.allTodos = [];
    })
    /** Reducer for when the fetchTodos action is fulfilled. */
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.allTodos = action.payload || [];
    })
    /** Reducer for when the fetchTodos action is rejected. */
    .addCase(fetchTodos.rejected, (state, action) => {
      state.status = RequestStatus.Error;
      state.allTodos = [];
      state.error = action.error || null;
    });
}
