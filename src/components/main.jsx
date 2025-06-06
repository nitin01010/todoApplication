import React, { useState, useEffect } from 'react';
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodoToDatabase,
  deleteTodoFromDatabase,
  fetchTodos,
  updateTodoInDatabase,
} from '../features/todo/todoSlice';
import { toast } from 'react-toastify';

const Main = () => {
  const [input, setInput] = useState({ name: '' });
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const HandleInput = () => {
    if (input.name.trim() === '') {
      toast.error('Please enter a task');
      return;
    }

    dispatch(addTodoToDatabase({ title: input.name }))
      .unwrap()
      .then(() => toast.success('Task added successfully!'))
      .catch(() => toast.error('Failed to add task'));

    setInput({ name: "" });
  };

  const DeleteItam = (val) => {
    dispatch(deleteTodoFromDatabase(val._id))
      .unwrap()
      .then(() => toast.success('Task deleted!'))
      .catch(() => toast.error('Failed to delete task'));
  };

  const updateItem = (item) => {
    const newTitle = prompt('Enter new title', item.title);
    if (newTitle && newTitle.trim() !== '') {
      dispatch(updateTodoInDatabase({ id: item._id, title: newTitle }))
        .unwrap()
        .then(() => {
          toast.success('Task updated!');
          dispatch(fetchTodos()); // ✅ Refresh updated data
        })
        .catch(() => toast.error('Failed to update task'));
    }
  };

  return (
    <div className='bg-white w-full md:w-[50%] h-[600px] rounded-md p-5 overflow-hidden'>
      <h1 className='text-center text-2xl capitalize font-bold'>Todo Application</h1>

      <input
        placeholder='Type ...'
        name='name'
        value={input.name}
        className='w-full mt-5 border-blue-500 p-2 px-3 py-3 border-1 shadow-md capitalize outline-none'
        onChange={(e) => setInput({ name: e.target.value })}
      />

      <button
        className='bg-black text-white w-full p-3 mt-5 cursor-pointer shadow-[5px_5px_0px_0px_rgba(109,40,217)]'
        onClick={HandleInput}
      >
        {loading ? "Loading..." : "Add Task"}
      </button>

      <div id='ScrollBar' className='overflow-scroll h-[400px] mt-4'>
        {[...todos].reverse().map((item) => (
          <div
            key={item._id}
            className='flex items-center justify-between bg-yellow-300 mt-5 px-3 rounded-md border py-3'
          >
            <p className='capitalize'>{item.title}</p>
            <div className='flex gap-5'>
              <MdDeleteOutline
                className='cursor-pointer'
                size={25}
                onClick={() => DeleteItam(item)}
              />
              <MdOutlineModeEdit
                className='cursor-pointer'
                size={25}
                onClick={() => updateItem(item)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
