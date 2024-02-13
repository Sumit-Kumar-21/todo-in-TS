import { useState, memo } from "react";

const CreateTodo = memo(function () {
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");


  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

      <div style={{fontWeight:"bold", margin:"0 0 20px 0"}}>
        Todo
      </div>

      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        style={{ backgroundColor: "white", width: "25%" }}
      />
      <br />
      <label htmlFor="desc">Description:</label>
      <input
        id="desc"
        type="text"
        value={description}
        placeholder="Type description here"
        onChange={(e) => setDescription(e.target.value)}
        style={{ backgroundColor: "white", width: "50%" }}
      />
      <br />
      <button
        style={{ 
            backgroundColor: "green",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            outline: "none",
            transition: "background-color 0.3s ease",
            }}
        onClick={async () => {
          const response = await fetch("http://localhost:3000/api/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to add todo");
          }
          // const json = await response.json();
          // console.log(json);
          // alert(json.msg);
          setTitle("");
          setDescription("");

          // reRender();
          // window.location.reload();
          // call();
        }}
      >
        add todo
      </button>
    </div>
  );
});

export default CreateTodo;
