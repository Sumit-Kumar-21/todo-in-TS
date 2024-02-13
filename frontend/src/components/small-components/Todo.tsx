
interface TodoProp {
  todos: {
    id: number;
    title: string;
    desc: string;
    completed: boolean;
    userId: number;
  }[];
}

function Todo({ todos }: TodoProp) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            margin: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "10px",
              }}
            >
              {todo.title}
            </div>
            <div style={{ fontSize: "1rem", color: "#555" }}>
              {todo.desc}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              onClick={async () => {
                const response = await fetch(
                  "http://localhost:3000/api/todo/completed",
                  {
                    method: "PUT",
                    body: JSON.stringify({
                      _id: todo.id,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (!response.ok) {
                  alert("Something went wrong");
                }
              }}
              style={{
                padding: "10px",
                backgroundColor: todo.completed ? "#4CAF50" : "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "5px",
              }}
            >
              {todo.completed ? "Done" : "Mark as Completed"}
            </button>

            <button
              onClick={async () => {
                const response = await fetch(
                  "http://localhost:3000/api/todo/delete",
                  {
                    method: "DELETE",
                    body: JSON.stringify({
                      _id: todo.id,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (!response.ok) {
                  alert("Something went wrong");
                }
              }}
              style={{
                padding: "10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
