import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

// const initialState = [
// 	{
// 		id: '1',
// 		title: 'Learning Redux Toolkit',
// 		content: "I've heard good things.",
// 		date: sub(new Date(), { minutes: 10 }).toISOString(),
// 		reactions: {
// 			thumbsUp: 0,
// 			wow: 0,
// 			heart: 0,
// 			rocket: 0,
// 			coffee: 0,
// 		},
// 	},
// 	{
// 		id: '2',
// 		title: 'Slices...',
// 		content: 'The more I say slice, the more I want pizza.',
// 		date: sub(new Date(), { minutes: 5 }).toISOString(),
// 		reactions: {
// 			thumbsUp: 0,
// 			wow: 0,
// 			heart: 0,
// 			rocket: 0,
// 			coffee: 0,
// 		},
// 	},
// ];

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const initialState = {
	posts: [],
	status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
	error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axios.get(POSTS_URL);
	return response.data;
});

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.posts.push(action.payload);
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						userId,
						date: new Date().toISOString(),
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// Adding date and reactions
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					};
					return post;
				});

				// Add any fetched posts to the array
				//state.posts = state.posts.concat(loadedPosts);
				state.posts = loadedPosts;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
