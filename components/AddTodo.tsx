"use client"
import { useTodoContext } from '@/context/TodoContext'
import axios from 'axios'
import React, { useState } from 'react'

const AddTodo = () => {
    const [todo, setTodo] = useState({
        task: "",
        complete: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const { fetchTodos } = useTodoContext();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const res = await axios.post('/api/add', {
                tasks: todo.task,
                complete: todo.complete
            });
            console.log(res.data);
            setIsLoading(false)
            fetchTodos();
            setTodo({
                task: "",
                complete: false
            })
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }
    return (
        <form onSubmit={handleSubmit} className='flex mt-5 w-full items-center justify-between'>
            <input type="text" required className='bg-gray-200 w-[70%] rounded-lg px-4 py-2 outline-none' onChange={(e) => setTodo({ ...todo, task: e.target.value })} value={todo.task} />
            <div className='flex gap-3 items-center'>
                <input type="checkbox" onChange={(e) => setTodo({ ...todo, complete: e.target.checked })} name="" id="" />
                <label htmlFor="checkbox">complete</label>
            </div>
            <button disabled={isLoading} className='px-7 py-1 disabled:bg-gray-600  rounded-md bg-blue-500 text-white '>Add</button>
        </form>
    )
}

export default AddTodo