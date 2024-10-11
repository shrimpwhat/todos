interface BottomTabProps {
    setFilter: (filter: string) => void;
    filter: string;
    label: string;
    isActive: boolean;
}

export default function BottomTab({
    filter,
    label,
    isActive,
    setFilter,
}: BottomTabProps) {
    return (
        <button
            onClick={() => setFilter(filter)}
            className={`px-2 py-1 rounded ${
                isActive === true ? "border border-pink-300" : ""
            }`}
        >
            {label}
        </button>
    );
}
