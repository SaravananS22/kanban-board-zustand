import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";
import classNames from "classnames";

const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop,setDrop]=useState(false)

  const tasks = useStore((store) =>
    useMemo(
      () => store.tasks.filter((task) => task.state === state),
      [store.tasks, state]
    )
  );

  const setDraggedTask = useStore((store)=>store.setDraggedTask)
  const draggedTask = useStore((store)=>store.draggedTask)
  const moveTask = useStore((store)=>store.moveTask)

  const addTask = useStore((store) => store.addTask);

  return (
    <div
      className={classNames("column",{drop:drop})}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false)
        setDraggedTask(null)
        moveTask(draggedTask,state)
        // console.log(draggedTask);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;

// function RefTest(){
//   const ref=useRef()

//   useEffect(()=>{
//     useStore.subscribe(
//       (store)=>store.tasks,
//       (tasks)=>{
//         ref.current=tasks
//       }
//     )
//   },[])
//   return ref.current
// }
