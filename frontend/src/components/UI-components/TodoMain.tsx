import { useEffect, useState } from "react";
import CreateTodo from "../small-components/CreateTodo";
import Todo from "../small-components/Todo";



function TodoMain() {
  const [todos, setTodos] = useState();

  async function render() {
    const response = await fetch("http://localhost:3000/api/todo/todos");
    const json = await response.json();
    setTodos(json.todos);
  }

  useEffect(() => {
    render();
  }, [todos]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
          borderRadius:"10%",
          width: "40%",
          padding: "20px",
          backgroundColor: "#fff",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <CreateTodo />
        </div>

        <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginBottom: "10px",
            }}
          >
            Lists:
          </div>
          <div style={{ overflow: "auto", height: "400px" }}>
            {todos==undefined?<div></div>:<Todo todos={todos} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoMain;
