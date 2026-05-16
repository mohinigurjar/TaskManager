const UserRow = ({
  user,
  onFetchUserTasks,
  onChangeUserRole,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">

      {/* USER INFO */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {user.name}
        </h3>

        <p className="text-sm text-gray-500 capitalize">
          Role: {user.role}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-3">

        {/* TASK BUTTON */}
        <button
          onClick={() => onFetchUserTasks(user._id)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          View Tasks
        </button>

        {/* ROLE BUTTON */}
        <button
          onClick={() =>
            onChangeUserRole(
              user._id,
              user.role === "user"
                ? "admin"
                : "user"
            )
          }
          className={`px-4 py-2 rounded-lg text-sm text-white transition ${
            user.role === "admin"
              ? "bg-purple-500 hover:bg-purple-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Make {user.role === "user" ? "Admin" : "User"}
        </button>

      </div>
    </div>
  );
};

export default UserRow;