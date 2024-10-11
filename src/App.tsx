import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import TodoItem from "./components/TodoItem";
import BottomTab from "./components/BottomTab";

interface Item {
    id: number;
    text: string;
    completed: boolean;
}

const defaultItems: Item[] = [
    { id: 1, text: "Тестовое задание", completed: false },
    { id: 2, text: "Прекрасный код", completed: true },
    { id: 3, text: "Покрытие тестами", completed: false },
];

const filters = [
    { filter: "all", label: "All" },
    { filter: "active", label: "Active" },
    { filter: "completed", label: "Completed" },
];

const getItemsFromLocalStorage = () => {
    const items: Item[] = JSON.parse(localStorage.getItem("items") ?? "null");
    return items ?? defaultItems;
};

export default function App() {
    const [todos, setTodos] = useState<Item[]>(getItemsFromLocalStorage);

    const newTodoInputRef = useRef<HTMLInputElement>(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e: FormEvent) => {
        e.preventDefault();
        if (!newTodoInputRef.current) return;

        const newTodo = newTodoInputRef.current.value;
        if (newTodo.trim() === "") return;

        setTodos(
            todos.concat({
                id: Date.now(),
                text: newTodo,
                completed: false,
            })
        );
        newTodoInputRef.current.value = "";
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const [uncompletedCount, filteredTodos] = useMemo(() => {
        let uncompletedCount = 0;
        const filtered = todos.filter((todo) => {
            if (!todo.completed) ++uncompletedCount;

            if (filter === "active") return !todo.completed;
            if (filter === "completed") return todo.completed;
            return true;
        });

        return [uncompletedCount, filtered];
    }, [todos, filter]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-9xl font-thin text-pink-200 mb-8">todos</h1>
            <div className="bg-white rounded-lg shadow-md w-full max-w-xl">
                <form
                    className="flex items-center px-4 border-b-2 group"
                    onSubmit={addTodo}
                >
                    <ChevronDown className="min-w-6 h-6 mr-2 text-gray-300" />
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        className="w-full py-4 pe-1 text-gray-600 text-lg focus:outline-none"
                        ref={newTodoInputRef}
                    />
                    <button
                        type="submit"
                        className="px-3 py-1 h-max text-white bg-pink-300 hover:bg-pink-500 rounded hidden group-focus-within:inline-block transition"
                    >
                        add
                    </button>
                </form>

                <ul className="items">
                    {filteredTodos.map((todo) => (
                        <TodoItem
                            todo={todo}
                            toggleTodo={() => toggleTodo(todo.id)}
                            key={todo.id}
                        />
                    ))}
                </ul>

                <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-500">
                    <span>{uncompletedCount} items left</span>

                    <div className="flex justify-center">
                        {filters.map(({ filter: f, label }) => (
                            <BottomTab
                                filter={f}
                                label={label}
                                isActive={filter === f}
                                setFilter={setFilter}
                                key={f}
                            />
                        ))}
                    </div>

                    <button
                        onClick={clearCompleted}
                        className="hover:underline"
                    >
                        Clear completed
                    </button>
                </div>
            </div>
        </div>
    );
}
