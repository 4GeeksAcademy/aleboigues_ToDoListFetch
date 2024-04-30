import React, { useEffect, useState } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [user, setUser] = useState(null);

  const createUser = async () => {
    await fetch("https://playground.4geeks.com/todo/users/aleboigues", {
      method: "POST"
    }).then(async (resp) => {
      if (resp.ok) {
        alert("Usuario creado correctamente");
        await getUser();
      }
    });
  };

  const getUser = async () => {
    await fetch("https://playground.4geeks.com/todo/users/aleboigues")
      .then((resp) => {
        if (!resp.ok) {
          return createUser();
        }
        return resp.json();
      })
      .then((userData) => setUser(userData));
  };

  const createTask = async (taskLabel) => {
    if (!taskLabel.trim()) {
      alert("El valor de la tarea no puede estar vacío");
      return;
    }

    await fetch("https://playground.4geeks.com/todo/todos/aleboigues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        label: taskLabel,
        is_done: false
      })
    }).then(async (resp) => {
      if (resp.ok) {
        const newTask = await resp.json();
        setUser((prevUser) => ({
          ...prevUser,
          todos: [...(prevUser.todos || []), newTask]
        }));
        setTask("");
      }
    });
  };

  const deleteTask = async (taskId) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
      method: "DELETE"
    }).then(async (resp) => {
      if (resp.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          todos: prevUser.todos.filter((task) => task.id !== taskId)
        }));
      }
    });
  };

  const deleteUser = async () => {
    await fetch("https://playground.4geeks.com/todo/users/aleboigues", {
      method: "DELETE"
    }).then(async (resp) => {
      if (resp.ok) {
        setUser(null);
        alert("Usuario eliminado correctamente");
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-5">Todo List Local</h1>
      <div className="todolist">
        <input
          placeholder="Agregar tarea"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createTask(task)}
          type="text"
          value={task}
        />
        {user &&
          user.todos &&
          user.todos.map((task) => (
            <li key={task.id}>
              {task.label}
              <span onClick={() => deleteTask(task.id)}> ❌ </span>
            </li>
          ))}
      </div>
      <p className="text-center">
        {user && user.todos && user.todos.length > 0 ? (
          <span>Tienes {user.todos.length} tareas pendientes</span>
        ) : (
          <span>No hay tareas pendientes</span>
        )}
      </p>
      <button onClick={deleteUser}>Eliminar Usuario</button>
    </div>
  );
};

export default Home;
