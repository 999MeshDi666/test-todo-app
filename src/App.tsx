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

  return (
    <>
      <main className="container">
        <header className="header">
          <h1 className="headline">Todo list</h1>
        </header>
        <section>
          <button className="default_button" onClick={() => setOpen(!open)}>
            Добавить задачу
          </button>
        </section>
        <article className="todo_container">
          <section className="todo_section todo_waiting">
            {waiting.length > 0 ? (
              waiting.map((todo: TTodoItem) => (
                <TodoItem {...todo} nextStatus="progress" key={todo.id} />
              ))
            ) : (
              <p>Ничего не найдено</p>
            )}
          </section>
          <section className="todo_section todo_progress">
            {progress.length > 0 ? (
              progress.map((todo: TTodoItem) => (
                <TodoItem {...todo} nextStatus="finished" key={todo.id} />
              ))
            ) : (
              <p>Ничего не найдено</p>
            )}
          </section>
          <section className="todo_section todo_finished">
            {finished.length > 0 ? (
              finished.map((todo: TTodoItem) => (
                <TodoItem {...todo} key={todo.id} />
              ))
            ) : (
              <p>Ничего не найдено</p>
            )}
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
