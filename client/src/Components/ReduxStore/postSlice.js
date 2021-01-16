import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name: 'post',

    initialState: {
        posts: []
    },

    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        appendPosts: (state, action) => {
            state.posts.push(action.payload)
        }
    },
});

export const { setPosts, appendPosts } = postSlice.actions;

export const getPosts = state => state.post.posts;

export default postSlice.reducer;