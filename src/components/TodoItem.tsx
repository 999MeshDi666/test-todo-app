import { TTodoItem, TodoStatus } from "../types/todo";
import { useSelector, useDispatch } from "react-redux";
import { updateStatusItem } from "../redux/slices/todoSlice";

type TodoItemProps = TTodoItem & {
  nextStatus?: TodoStatus;
};
const TodoItem = ({
  id,
  title,
  description,
  status,
  nextStatus,
}: TodoItemProps) => {
  const dispatch = useDispatch();
  const handelDeleteItem = () => {
    // dispatch(deleteItem(id));
  };
  const handleUpdateStatus = () => {
    if (nextStatus) {
      const newTodo: TTodoItem = {
        id: id,
        title: title,
        description: description,
        status: status,
      };
      dispatch(updateStatusItem({ item: newTodo, status: nextStatus }));
    }
  };
  return (
    <div className="todo_item">
      <div>
        <h2>{title}</h2>
        <p>{status}</p>
      </div>
      <div>
        <button onClick={handleUpdateStatus}>delete</button>
      </div>
    </div>
  );
};
export default TodoItem;
