import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import "./index.scss";
import listPng from "./assests/img/list.png";

import { List, Tasks, AddButtonList } from "./components";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = obj => {
    const newLists = [...lists, obj];
    setLists(newLists);
  };
  const onAddTusk = (listId, taskObj) => {
    const newLists = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newLists);
  };
  const onEditListTitle = (id, title) => {
    const newLists = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newLists);
  };


  const onClickItem = list => {
    history.push(`/lists/${list.id}`);
    if (lists) {
      setActiveItem(list);
    }
  };

  const onRemove = id => {
    const newLists = lists.filter(item => item.id !== id);
    setLists(newLists);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={list => {
            console.log(list);
            history.push(`/`);
          }}
          items={[
            {
              className: "",
              icon: <img src={listPng} alt="Icon" className="todo__imagine" />,
              name: "Всі задачі",
              active: true
            }
          ]}
        />

        {lists ? (
          <List
            items={lists}
            onRemove={onRemove}
            onClickItem={onClickItem}
            activeItem={activeItem}
            isRemovable
          />
        ) : (
          "Загрузка.."
        )}
        <AddButtonList onAddList={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {lists &&
            lists.map(list => (
              <Tasks
                key={list.id}
                list={list}
                onAddTusk={onAddTusk}
                onEditTitle={onEditListTitle}
                withoutEmpty
              />
            ))}
        </Route>
        <Route path="/lists/:id">
          {lists && activeItem && (
            <Tasks
              list={activeItem}
              onAddTusk={onAddTusk}
              onEditTitle={onEditListTitle}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;
