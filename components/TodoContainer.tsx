"use client"
import { useTodoContext } from '@/context/TodoContext'
import axios from 'axios';
import React, { useEffect } from 'react'
import Todo from './Todo';

const TodoContainer = () => {
    const { tasks, fetchTodos } = useTodoContext();
    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <div className='flex flex-col gap-4 bg-gray-200 rounded-lg p-6'>
            <h1 className='text-2xl text-gray-700 font-bold'>Todos</h1>
            <div className='flex flex-col gap-2'>
                {
                    tasks?.map((t: object) => {
                        return <Todo key={t._id} data={t} />
                    })
                }
            </div>
        </div>
    )
}

export default TodoContainer