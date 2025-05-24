import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, delTodo, updateTodo } from '../features/todo/todoSlice';

const Main = () => {
    const [input, setInput] = useState({
        name: ''
    });

    const HandleInput = () => {
        if (input.name === '') {
            return alert('Please enter a task');
        }
        dispatch(addTodo(input));
        setInput({
            name: ""
        });
    }

    const DeleteItam = (val) => {
        dispatch(delTodo(val))
    }

    const updateItem = (indexToUpdate) => {
        dispatch(updateTodo(indexToUpdate));
    };

    const data1 = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    return (
        <div className=' bg-white w-full  md:w-[50%] h-[600px]  rounded-md p-5 overflow-hidden'>
            <h1 className=' text-center text-2xl capitalize font-bold'><b>todo Application</b></h1>

            <input placeholder='Type ...' name='name' value={input.name} className=' w-full mt-5  border-blue-500 p-2 px-3 py-3 border-1   shadow-md capitalize outline-none ' onChange={(e) => setInput(e.target.value)} />

            <button className=' bg-black text-white z-50 w-full p-3 mt-5 cursor-pointer shadow-[5px_5px_0px_0px_rgba(109,40,217)] ' onClick={() => HandleInput()}>Add Task</button>

            <div id='ScrollBar' className=' overflow-scroll z-0 overflow-y-scroll h-[400px] mt-4'>
                {
                    [...data1.todo].reverse()?.map((item, idx) => {
                        return (
                            <div key={idx} className={` flex items-center justify-between z-0 bg-yellow-300 mt-5 px-3 rounded-md border py-3  ${idx === data1.length - 1 ? 'mb-5' : ''}`}>
                                <p>{item}</p>
                                <div className=' flex gap-5'>
                                    <MdDeleteOutline className=' cursor-pointer' size={25} onClick={() => DeleteItam(item)} />
                                    <MdOutlineModeEdit className=' cursor-pointer' size={25} onClick={() => updateItem(item)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Main
