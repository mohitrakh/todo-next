"use client"
import { TodoProvider } from "@/context/TodoContext";
import AddTodo from '../components/AddTodo'
import TodoContainer from "@/components/TodoContainer";
import { useAppSelector } from "@/Redux/hooks";


export default function Home() {
  const { user } = useAppSelector(store => store.user)
  return (
    <main className="w-[700px] mx-auto flex flex-col gap-2">
      {user?.username}
      <TodoProvider>
        <AddTodo />
        <TodoContainer />
      </TodoProvider>
    </main>
  );
}
