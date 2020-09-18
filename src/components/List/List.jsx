import React from "react";
import axios from "axios";

import "./List.scss";
import Badge from "../Badge/Badge";
import removable from "../.././assests/img/removable.png";

import classname from "classname";
function List({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem
}) {
  const removeList = item => {
    if (window.confirm("Ви дійсно хочете видалити список?")) {
      axios
        .delete("http://localhost:3001/lists/" + item.id)
        .catch(() => {
          alert("Помилка при додаванні списку");
        })
        .then(() => {
          onRemove(item.id);
        });
    }
  };
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classname(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              src={removable}
              className="list__remove__icon"
              alt="Removable"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
export default List;
