function App() {
  return (
    <main className="container">
      <header className="header">
        <h1 className="headline">Todo list</h1>
      </header>
      <article className="todo_container">
        <section className="todo_section todo_on_hold">
          <div className="todo_item">
            <div>
              <p>Title</p>
            </div>
            <button>delete</button>
          </div>
        </section>
        <section className="todo_section todo_in_progress">
          <div className="todo_item">
            <div>
              <p>Title</p>
            </div>
            <button>delete</button>
          </div>
        </section>
        <section className="todo_section todo_finished">
          <div className="todo_item">
            <div>
              <p>Title</p>
            </div>
            <button>delete</button>
          </div>
        </section>
      </article>
    </main>
  );
}

export default App;
