"use client"
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface task {
    task: string;
    complete: boolean;
}

interface value {
    tasks: task[];
    setTasks: (tasks: task[]) => void;
    test: string,
    fetchTodos: () => void
}

const TodoContext = createContext<value | undefined>(undefined)

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<task[]>([]);
    const fetchTodos = async () => {
        try {
            const res = await axios.get('/api/todos');
            setTasks(res?.data.data);
            console.log(res.data, "data todo");
        } catch (error) {
            console.log(error, "todo error");

        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const value: value = {
        tasks,
        setTasks,
        test: "hello",
        fetchTodos: fetchTodos
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoContext = () => {
    return useContext(TodoContext)
}