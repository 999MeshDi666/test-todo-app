import { TTodoItem } from "../../types/todo";

const TodoItemView = ({ id, title, description, status }: TTodoItem) => {
  return (
    <div>
      <h1>Заголовок: {title}</h1>
      <p style={{ margin: "10px 0" }}>Описание: {description}</p>
      <div style={{ display: "flex" }}>
        <p style={{ marginRight: "5px" }}>Статус: </p>
        <p className="status_chip">{status}</p>
      </div>
    </div>
  );
};
export default TodoItemView;
