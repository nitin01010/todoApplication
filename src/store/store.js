// src/app/store.js or wherever you're storing this
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

export default store;
