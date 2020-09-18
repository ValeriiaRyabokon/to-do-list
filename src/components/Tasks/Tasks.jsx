import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Tasks.scss";
import Task from './Task';

import iconPen from "../../assests/img/iconPen.png";

import AddTaskForm from "./AddTaskForm";

function Tasks({ list, onEditTitle, onAddTusk, withoutEmpty }) {
  const editTitle = () => {
    const newTitle = window.prompt("Назва списку", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle
        })
        .catch(() => {
          alert("Не вдалося оновити назву списку");
        });
    }
  };

  return (
    <div className="scroll">
      <div className="tasks">
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={iconPen} alt="Edit icon" />
        </h2>

        <div className="tasks__items">
          {!withoutEmpty && list.tasks && !list.tasks.length && (
            <h2>Задачі відсутні</h2>
          )}
          {list.tasks &&
            list.tasks.map(task => (
              <Task key={task.id} {...task} />
            ))}

          <AddTaskForm key={list.id} list={list} onAddTusk={onAddTusk} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
