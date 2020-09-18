import React from "react";
import iconChecked from "../../assests/img/iconChecked.svg";
import penEdit from "../../assests/img/penEdit.svg";

function Task({ id, text }) {
  return (
    <div key={id} className="tasks__items__row">
      <div className="tasks__checkbox">
        <input id={id} type="checkbox" />
        <label htmlFor={id}>
          {" "}
          <img src={iconChecked} alt="Icon Checked" />
        </label>
      </div>
      <input readOnly value={text} />
      <div className="tasks__items__row__actions">
        <div>
          <img src={penEdit} alt="Edit pen" />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Task;
