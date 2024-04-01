import React from 'react'
import { Trash2, SquarePen } from 'lucide-react';
import axios from 'axios';
import { useTodoContext } from '@/context/TodoContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Todo = ({ data }: {
    data: {
        complete: Boolean,
        tasks: string,
        _id: string
    }
}) => {
    const { fetchTodos } = useTodoContext();

    const handleDelete = async (id: string) => {
        console.log(typeof id);
        try {
            const res = await axios.delete(`/api/modify/${id}`);
            console.log(res.data);
            fetchTodos()

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='flex bg-white py-3 px-4 rounded-lg justify-between'>
            <h4 className={`${data?.complete && "line-through"} `}>{data.tasks}</h4>
            <div className='flex gap-3'>
                <button onClick={() => handleDelete(data?._id)}> <Trash2 /></button>
                <Link href={`/${data._id}`} ><SquarePen /></Link>
            </div>
        </div>
    )
}

export default Todo