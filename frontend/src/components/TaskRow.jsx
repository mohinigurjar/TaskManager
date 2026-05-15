import { useState } from "react";

const TaskRow = ({
  task,
  onEdit,
  onDelete,
  onStatusUpdate,
}) => {
  const [editValue, setEditValue] = useState(task.task);

  const handleEditClick = () => {
    onEdit(task._id, { task: editValue });
  };

  return (
    <div className="flex items-center justify-between gap-4">

      {/* TASK INPUT */}
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="flex-1 bg-transparent border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* BUTTONS */}
      <div className="flex items-center gap-2">

        {/* EDIT */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
          onClick={handleEditClick}
        >
          Edit
        </button>

        {/* STATUS */}
        <button
          className={`px-4 py-2 rounded-lg text-white text-sm transition ${
            task.status === "completed"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          onClick={() =>
            onStatusUpdate(task._id, task.status)
          }
        >
          {task.status}
        </button>

        {/* DELETE */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default TaskRow;