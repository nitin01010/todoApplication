import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todo: []
  },
  reducers: {
    addTodo: (state, val) => {
      state.todo.push(val.payload)
    },
    delTodo: (state, val) => {
      state.todo = state.todo.filter(todo => todo !== val.payload);
    },
    updateTodo: (state, val) => {
      const newTask = prompt("Enter new task");
      if (!newTask) {
        alert("Please enter a valid task");
        return;
      }

      const index = state.todo.findIndex(todo => todo === val.payload);
      if (index !== -1) {
        state.todo[index] = newTask;
      }
    }
  }
})

export const { addTodo, delTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer