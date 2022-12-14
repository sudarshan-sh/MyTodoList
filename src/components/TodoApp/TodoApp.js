import React, { useState } from "react";
import "./TodoApp.css";
import TodoItem from "../TodoItem/TodoItem";
import { v4 } from "uuid";

const STATUS_CONSTANTS = { COMPLETE: "complete", INCOMPLETE: "incomplete" };
const defaultTodoList = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];

const TodoApp = () => {
  const [todoList, setTodosList] = useState(defaultTodoList);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState(STATUS_CONSTANTS.INCOMPLETE);
  const [displayFilter, setDisplayFilter] = useState("all");

  const addTodoHandler = (e) => {
    e.preventDefault();
    const newTodoItem = {
      id: v4(),
      name,
      description,
      time,
      isComplete: status === STATUS_CONSTANTS.COMPLETE ? true : false,
    };
    const actualTodosList = JSON.parse(localStorage.getItem("todolist"));
    const newActualTodosList = actualTodosList
      ? [...actualTodosList, newTodoItem]
      : [newTodoItem];
    localStorage.setItem("todolist", JSON.stringify(newActualTodosList));
    const filteredTodos = newActualTodosList.filter((item) => {
      if (displayFilter === "all") {
        return true;
      } else {
        return (
          (item.isComplete
            ? STATUS_CONSTANTS.COMPLETE
            : STATUS_CONSTANTS.INCOMPLETE) === displayFilter
        );
      }
    });
    setTodosList(filteredTodos);
    setName("");
    setDescription("");
    setTime("");
    setStatus(STATUS_CONSTANTS.INCOMPLETE);
  };

  const changeFilterHandler = (event) => {
    const currentFilterValue = event.target.value;
    const actualTodosList = JSON.parse(localStorage.getItem("todolist"));
    const filteredTodos = actualTodosList
      ? actualTodosList.filter((item) => {
          if (currentFilterValue === "all") {
            return true;
          } else {
            return (
              (item.isComplete
                ? STATUS_CONSTANTS.COMPLETE
                : STATUS_CONSTANTS.INCOMPLETE) === currentFilterValue
            );
          }
        })
      : [];
    console.log(filteredTodos);
    setTodosList(filteredTodos);
    setDisplayFilter(currentFilterValue);
  };

  const changeTodoCompleteHandler = (currentID) => {
    const actualTodosList = JSON.parse(localStorage.getItem("todolist"));
    const newActualTodosList = actualTodosList.map((item) => {
      if (item.id === currentID) {
        return { ...item, isComplete: !item.isComplete };
      } else {
        return item;
      }
    });
    localStorage.setItem("todolist", JSON.stringify(newActualTodosList));
    const filteredTodos = newActualTodosList.filter((item) => {
      if (displayFilter === "all") {
        return true;
      } else {
        return (
          (item.isComplete
            ? STATUS_CONSTANTS.COMPLETE
            : STATUS_CONSTANTS.INCOMPLETE) === displayFilter
        );
      }
    });
    setTodosList(filteredTodos);
  };

  const deleteTodoHandler = (currentID) => {
    const actualTodosList = JSON.parse(localStorage.getItem("todolist"));
    const newActualTodosList = actualTodosList.filter(
      (item) => item.id !== currentID
    );
    localStorage.setItem("todolist", JSON.stringify(newActualTodosList));
    const filteredTodos = newActualTodosList.filter((item) => {
      if (displayFilter === "all") {
        return true;
      } else {
        return (
          (item.isComplete
            ? STATUS_CONSTANTS.COMPLETE
            : STATUS_CONSTANTS.INCOMPLETE) === displayFilter
        );
      }
    });
    setTodosList(filteredTodos);
  };

  return (
    <div className="bg-container">
      <div className="app-container">
        <form className="form-container" onSubmit={addTodoHandler}>
          <h1 className="heading">Add Todo</h1>
          {/* Title */}
          <div className="input-container">
            <label htmlFor="name" className="labelStyle">
              Title
            </label>
            <input
              className="inputStyle"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Description */}
          <div className="input-container">
            <label htmlFor="description" className="labelStyle">
              Description
            </label>
            <input
              className="inputStyle"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Time */}
          <div className="input-container">
            <label htmlFor="time" className="labelStyle">
              Time
            </label>
            <input
              className="inputStyle"
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="input-container">
            <div>
              <input
                id="complete"
                name="status"
                value={STATUS_CONSTANTS.COMPLETE}
                onChange={(e) => setStatus(e.target.value)}
                type="radio"
                checked={status === STATUS_CONSTANTS.COMPLETE}
              />
              <label className="labelStyle" htmlFor="complete">
                Complete
              </label>
            </div>
            <div>
              <input
                id="incomplete"
                name="status"
                value={STATUS_CONSTANTS.INCOMPLETE}
                onChange={(e) => setStatus(e.target.value)}
                type="radio"
                checked={status === STATUS_CONSTANTS.INCOMPLETE}
              />
              <label className="labelStyle" htmlFor="incomplete">
                Not Complete
              </label>
            </div>
          </div>
          <button className="button" type="submit">
            Add Task
          </button>
        </form>

        <div className="todoList-container">
          <h1>Todo List</h1>
          <div className="input-container">
            <label htmlFor="todoListView" className="labelStyle">
              Filter
            </label>
            <select
              name="todoListView"
              id="todoListView"
              className="inputStyle"
              value={displayFilter}
              onChange={changeFilterHandler}
            >
              <option value="all">All</option>
              <option value={STATUS_CONSTANTS.COMPLETE}>
                Already Completed
              </option>
              <option value={STATUS_CONSTANTS.INCOMPLETE}>InComplete</option>
            </select>
          </div>
          <div className="todo-container">
            {todoList.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  changeTodoCompleteHandler={changeTodoCompleteHandler}
                  deleteTodoHandler={deleteTodoHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
