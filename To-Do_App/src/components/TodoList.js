import React, { useState, useEffect } from "react";

const getLocalTasks = () => {
  const list = localStorage.getItem("tasks");
  return list ? JSON.parse(list) : [];
};

const TodoList = () => {
  const [task, setTask] = useState("");
  const [mainTask, setMainTask] = useState(getLocalTasks());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setMainTask([...mainTask, { task, completed: false }]);
      setTask("");
    }
  };

  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);
  };

  const completeHandler = (i) => {
    const updatedTasks = [...mainTask];
    updatedTasks[i].completed = !updatedTasks[i].completed;
    setMainTask(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-10">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          To Do List
        </h1>
        <form onSubmit={submitHandler} className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-bal"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="submit"
            className="block w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition duration-300"
          >
            Add Task
          </button>
        </form>
        {mainTask.length === 0 && (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        )}
        <ul>
          {mainTask.map((t, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-2 px-4 mt-2 bg-gray-300 rounded-md shadow-sm"
            >
              <span
                className={`flex-grow ${
                  t.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {t.task}
              </span>
              <div>
                <button
                  className={`mr-2 text-green-500 hover:text-green-700 focus:outline-none ${
                    t.completed && "text-gray-300 pointer-events-none"
                  }`}
                  onClick={() => completeHandler(i)}
                  disabled={t.completed}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                    />
                  </svg>
                </button>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => deleteHandler(i)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
