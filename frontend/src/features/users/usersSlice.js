import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{ id: 1, name: 'aki' },
	{ id: 2, name: 'cuni' },
];

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
