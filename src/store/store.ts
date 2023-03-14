import { configureStore } from '@reduxjs/toolkit'
import templateSlice from '../features/template/templateSlice'

export const store = configureStore({
  reducer: {
    template: templateSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch