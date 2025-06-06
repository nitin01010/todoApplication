import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Async thunk to fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(`https://todobackend-e56k.onrender.com/api/v1/todo`);
  return response.data;
});

// ✅ Async thunk to add todo to database
export const addTodoToDatabase = createAsyncThunk('todos/addTodo', async (todoData) => {
  const response = await axios.post('https://todobackend-e56k.onrender.com/api/v1/todo', todoData);
  return response.data;
});

// ✅ Async thunk to delete todo by ID (from req.body)
export const deleteTodoFromDatabase = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    await axios.delete('https://todobackend-e56k.onrender.com/api/v1/todo', {
      data: { id }
    });
    return id;  // Return the id directly here
  }
);

// ✅ Async thunk to update todo in database
export const updateTodoInDatabase = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, title }) => {
    const response = await axios.put('https://todobackend-e56k.onrender.com/api/v1/todo', { id, title });
    return response.data; // Should return updated todo: { _id, title }
  }
);

// ✅ Slice
export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    delTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newTitle } = action.payload;
      const index = state.todos.findIndex(todo => todo._id === id);
      if (index !== -1) {
        state.todos[index].title = newTitle;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchTodos cases
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // addTodoToDatabase cases
      .addCase(addTodoToDatabase.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoToDatabase.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = false;
      })
      .addCase(addTodoToDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // deleteTodoFromDatabase cases
      .addCase(deleteTodoFromDatabase.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodoFromDatabase.fulfilled, (state, action) => {
        // Use returned id to filter out deleted todo
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTodoFromDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // updateTodoInDatabase cases
      .addCase(updateTodoInDatabase.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodoInDatabase.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(todo => todo._id === updatedTodo._id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
        state.loading = false;
      })
      .addCase(updateTodoInDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const { addTodo, delTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;