import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "../List/List";
import Badge from "../Badge/Badge";
import closeIcon from "../../assests/img/close.png";
import plus from "../../assests/img/plus.svg";
import "../../index.scss";
import "./AddListButton.scss";

const AddButtonList = ({ colors, onAddList }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    setSelectedColor(colors[0].id);
  };
  const AddList = () => {
    if (!inputValue) {
      alert("Введіть");
      return;
    }
    setIsLoading(true);

    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor
      })
      .then(({ data }) => {
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        onAddList(listObj);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add__list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "todo__add",
            icon: <img src={plus} alt="Icon" className="todo__add__img" />,
            name: "Додати список"
          }
        ]}
      />
      {visiblePopup && (
        <div className="add__list__popup ">
          <img
            onClick={onClose}
            src={closeIcon}
            alt="Close Icon"
            className="add__list__popup__btn"
          />
          <input
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            className="field"
            type="text"
            placeholder="Назва списку"
          />
          <div className="add__list__popup__colors">
            {colors.map(color => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={AddList} className="button">
            {isLoading ? "Додавання..." : "Додати"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddButtonList;
