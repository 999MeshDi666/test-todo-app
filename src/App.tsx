import TodoItem from "./components/TodoItem";
import { TTodoItem } from "./types/todo";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "./redux/slices/todoSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { useState } from "react";

function App() {
  const waitingList = useSelector((state: RootState) => state.todo.waiting);
  const progressList = useSelector((state: RootState) => state.todo.progress);
  const finishedList = useSelector((state: RootState) => state.todo.finished);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: TTodoItem = {
      id: Math.floor(Math.random() * 10000000),
      title: title,
      description: description,
      status: "waiting",
    };

    dispatch(addItem(newTodo));
  };

  return (
    <>
      <main className="container">
        <header className="header">
          <h1 className="headline">Todo list</h1>
        </header>

        <section>
          <form onSubmit={handleAddTodo}>
            <fieldset>
              <label>Заголовок</label>
              <input
                id="desc"
                name="description"
                type="text"
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value);
                }}
                required
                placeholder="Добавьте описание"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="desc">Описание</label>
              <textarea
                id="desc"
                name="description"
                maxLength={30}
                value={description}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription(event.target.value);
                }}
                required
                placeholder="Добавьте описание"
              />
            </fieldset>
            <input type="submit" />
          </form>
          <button>Добавить задачу</button>
        </section>
        <article className="todo_container">
          <section className="todo_section todo_waiting">
            {waitingList.length > 0 ? (
              waitingList.map((todo: TTodoItem) => (
                <TodoItem {...todo} nextStatus="progress" key={todo.id} />
              ))
            ) : (
              <p>Ничего не найдено</p>
            )}
          </section>
          <section className="todo_section todo_progress">
            {progressList.length > 0 ? (
              progressList.map((todo: TTodoItem) => (
                <TodoItem {...todo} nextStatus="finished" key={todo.id} />
              ))
            ) : (
              <p>Ничего не найдено</p>
            )}
          </section>
          <section className="todo_section todo_finished">
            {finishedList.length > 0 ? (
              finishedList.map((todo: TTodoItem) => (
                <TodoItem {...todo} key={todo.id} />
              ))
            ) : (
              <p>Ничего не найдено</p>
            )}
          </section>
        </article>
      </main>
    </>
  );
}

export default App;
