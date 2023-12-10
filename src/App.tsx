import TodoItem from "./components/Todo/TodoItem";
import { TTodoItem } from "./types/todo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import TodoForm from "./components/Todo/TodoForm";
import { useState } from "react";
import ModalWindow from "./components/ModalWindow";
import { addItem } from "./redux/slices/todoSlice";

function App() {
  const { waiting, progress, finished } = useSelector(
    (state: RootState) => state.todo
  );
  const [option, setOption] = useState("all");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleAddTodoItem = (title: string, desc: string) => {
    const newTodo: TTodoItem = {
      id: Math.floor(Math.random() * 10000000),
      title: title,
      description: desc,
      status: "waiting",
    };
    dispatch(addItem(newTodo));
    setOpen(!open);
  };
  const checkWaiting = option != "all" && option != "waiting";
  const checkPogress = option != "all" && option != "progress";
  const checkFinished = option != "all" && option != "finished";
  return (
    <>
      <main className="container">
        <header className="header">
          <h1 className="headline">Todo list</h1>
        </header>
        <div>
          <button
            className="default_button"
            disabled={checkWaiting}
            onClick={() => setOpen(!open)}
          >
            Добавить задачу
          </button>
          <div>
            <select
              value={option}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setOption(event.target.value)
              }
            >
              <option value="all">Все</option>
              <option value="waiting">В ожидании</option>
              <option value="progress">В процессе</option>
              <option value="finished">Завершенные</option>
            </select>
          </div>
        </div>
        <article className="todo_container">
          <section
            className={`todo_section todo_waiting ${
              checkWaiting && "todo_section_disabled"
            }`}
          >
            <p>Количество задачи в ожидании {waiting.length}</p>
            <div>
              {waiting.length > 0 ? (
                waiting.map((todo: TTodoItem) => (
                  <TodoItem {...todo} nextStatus="progress" key={todo.id} />
                ))
              ) : (
                <p>Ничего не найдено</p>
              )}
            </div>
          </section>
          <section
            className={`todo_section todo_progress ${
              checkPogress && "todo_section_disabled"
            } `}
          >
            <p>Количество задачи в работе {progress.length}</p>
            <div>
              {progress.length > 0 ? (
                progress.map((todo: TTodoItem) => (
                  <TodoItem {...todo} nextStatus="finished" key={todo.id} />
                ))
              ) : (
                <p>Ничего не найдено</p>
              )}
            </div>
          </section>
          <section
            className={`todo_section todo_finished ${
              checkFinished && "todo_section_disabled"
            }`}
          >
            <p>Количество завершенных задач {finished.length}</p>
            <div>
              {finished.length > 0 ? (
                finished.map((todo: TTodoItem) => (
                  <TodoItem {...todo} key={todo.id} />
                ))
              ) : (
                <p>Ничего не найдено</p>
              )}
            </div>
          </section>
        </article>
      </main>
      <ModalWindow
        open={open}
        handleOpen={() => setOpen(!open)}
        title="Добавить новую задачу"
      >
        <TodoForm onConfirm={handleAddTodoItem} />
      </ModalWindow>
    </>
  );
}

export default App;
