"use client"
import { useTodoContext } from '@/context/TodoContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UpdatePage = ({ params }: { params: { id: string } }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [updateTask, setUpdateTask] = useState({
        task: "",
        complete: false
    })
    const [errorMsg, setErrorMsg] = useState("")

    const router = useRouter()

    const fetchTodo = async () => {
        try {
            const res = await axios.get(`/api/todos/${params.id}`);
            console.log(res.data, "single")
            setUpdateTask({
                task: res.data.data.tasks,
                complete: res.data.data.complete
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        setErrorMsg("")
        try {
            const res = await axios.put(`/api/modify/${params.id}`, {
                tasks: updateTask.task,
                complete: updateTask.complete
            });
            console.log(res.data);
            setIsLoading(false)
            setUpdateTask({
                task: "",
                complete: false
            })
            router.push("/")
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            setErrorMsg(error?.response?.data?.message);
        }

    }

    useEffect(() => {
        fetchTodo()
    }, [params.id])

    return (
        <div className='w-[700px] mx-auto mt-8'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <h5 className='text-2xl text-gray-600 font-bold'>To-Do (Update)</h5>
                <div className='flex justify-between'>
                    <input className='bg-gray-200 w-[70%] rounded-lg px-4 py-2 outline-none' type="text" value={updateTask.task} onChange={(e) => setUpdateTask({ ...updateTask, task: e.target.value })} />
                    <div className='flex gap-3 items-center'>
                        <input type="checkbox" checked={updateTask.complete} onChange={(e) => setUpdateTask({ ...updateTask, complete: e.target.checked })} name="" id="" />
                        <label htmlFor="checkbox">complete</label>
                    </div>
                    <button disabled={isLoading} className='px-7 py-1 disabled:bg-gray-600  rounded-md bg-blue-500 text-white '>Update</button>
                </div>
                <p className='text-red-700 font-semibold'>{errorMsg}</p>
            </form>
        </div>
    )
}

export default UpdatePage