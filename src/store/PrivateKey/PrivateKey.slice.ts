/**
 * This file contains the code for the `privateKey` slice of the Redux store.
 *
 * The `privateKey` slice is responsible for storing the user's private key.
 *
 * @packageDocumentation
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * The type of the state in the `privateKey` slice.
 *
 * @interface
 * @property {string | null} key - The user's private key.
 */
export interface IPrivateKeyState {
  key: string | null;
}

/**
 * The initial state of the `privateKey` slice.
 */
const initialState: IPrivateKeyState = {
  key: null,
};

/**
 * The slice for the `privateKey` reducer.
 */
const privateKeySlice = createSlice({
  name: 'privateKey',
  initialState,
  reducers: {
    /**
     * Sets the user's private key.
     *
     * @param {IPrivateKeyState} state - The current state.
     * @param {PayloadAction<string>} action - The action to set the private key.
     */
    setPrivateKey(state: IPrivateKeyState, action: PayloadAction<string>) {
      state.key = action.payload;
    },
    /**
     * Clears the user's private key.
     *
     * @param {IPrivateKeyState} state - The current state.
     */
    clearState(state: IPrivateKeyState) {
      state = initialState;
    },
  },
});

/**
 * Exports
 */
export const { setPrivateKey } = privateKeySlice.actions;
export default privateKeySlice.reducer;
