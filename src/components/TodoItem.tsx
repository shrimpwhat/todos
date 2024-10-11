import { Check } from "lucide-react";

interface TodoItemProps {
    todo: {
        id: number;
        text: string;
        completed: boolean;
    };
    toggleTodo: (id: number) => void;
}

export default function TodoItem({ todo, toggleTodo }: TodoItemProps) {
    return (
        <li className="border-b last:border-b-0 select-none">
            <label className="flex items-center p-4 cursor-pointer group">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="hidden"
                />
                <span
                    className={`min-w-6 h-6 border-2 rounded-full mr-4 flex items-center justify-center box ${
                        todo.completed
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300 group-hover:border-green-500"
                    }`}
                >
                    {todo.completed && <Check className="w-4 h-4 text-white" />}
                </span>
                <span
                    className={`text-gray-700 text-lg ${
                        todo.completed ? "line-through text-gray-400" : ""
                    }`}
                >
                    {todo.text}
                </span>
            </label>
        </li>
    );
}
