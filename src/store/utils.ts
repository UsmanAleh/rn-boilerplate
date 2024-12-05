/**
 * Utilities for working with the store.
 *
 * @remarks
 * This module provides strongly typed equivalents to the `useDispatch` and
 * `useSelector` hooks from the `react-redux` package. These hooks are
 * configured to work with our store's state and dispatch types.
 *
 * @packageDocumentation
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import store from '.';

/**
 * The type of the dispatch function in our store.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * A strongly typed version of the `useDispatch` hook.
 *
 * @returns The dispatch function from our store.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * The type of the state in our store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * A strongly typed version of the `useSelector` hook.
 *
 * @returns A selector function that can be used to retrieve state from the store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector.withTypes<RootState>();
