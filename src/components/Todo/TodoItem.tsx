import { TTodoItem, TodoStatus } from "../../types/todo";
import { useDispatch } from "react-redux";
import {
  updateStatusItem,
  deleteItem,
  editItem,
} from "../../redux/slices/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalWindow from "../ModalWindow";
import TodoItemView from "./TodoItemView";
import TodoForm from "./TodoForm";

type TodoItemProps = TTodoItem & {
  nextStatus?: TodoStatus;
};
const TodoItem = (todo: TodoItemProps) => {
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { id, title, description, status, nextStatus } = todo;

  const dispatch = useDispatch();
  const handelDeleteItem = () => {
    dispatch(deleteItem({ id: id, curStatus: status }));
  };

  const handleUpdateStatus = () => {
    if (nextStatus) {
      const curTodo: TTodoItem = {
        id: id,
        title: title,
        description: description,
        status: status,
      };
      dispatch(updateStatusItem({ curItem: curTodo, nextStatus: nextStatus }));
    }
  };
  const handleEditItem = (title: string, desc: string) => {
    const curTodo: TTodoItem = {
      id: id,
      title: title,
      description: desc,
      status: status,
    };
    dispatch(editItem(curTodo));
    setOpenEdit(!openEdit);
  };
  return (
    <>
      <div className="todo_item">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setOpenView(!openView)}
        >
          <h2 className="todo_item_title">{title}</h2>
          <p className="status_chip">{status}</p>
        </div>
        <div className="todo_item_button_container">
          <button
            className="todo_item_button todo_item_button_delete"
            onClick={handelDeleteItem}
          >
            <FontAwesomeIcon
              icon={faTrash}
              color="#fff"
              fontSize={20}
              width={50}
            />
          </button>
          {status === "waiting" && (
            <button
              className="todo_item_button todo_item_button_edit"
              onClick={() => setOpenEdit(!openEdit)}
            >
              <FontAwesomeIcon
                icon={faPen}
                color="#fff"
                fontSize={20}
                width={50}
              />
            </button>
          )}
          {nextStatus && (
            <button
              className="todo_item_button todo_item_button_update"
              onClick={handleUpdateStatus}
            >
              <FontAwesomeIcon
                icon={faCheck}
                color="#fff"
                fontSize={23}
                width={50}
              />
            </button>
          )}
        </div>
      </div>
      <ModalWindow
        open={openView}
        handleOpen={() => setOpenView(!openView)}
        title="Просмотр информации задачи"
      >
        <TodoItemView {...todo} />
      </ModalWindow>
      <ModalWindow
        open={openEdit}
        handleOpen={() => setOpenEdit(!openEdit)}
        title="Редактирование задачи"
      >
        <TodoForm
          onConfirm={handleEditItem}
          defaultTitle={title}
          defaultDesc={description}
        />
      </ModalWindow>
    </>
  );
};
export default TodoItem;
