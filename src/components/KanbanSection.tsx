import { TTodoItem, TodoStatus } from "../types/todo";
import TodoItem from "./Todo/TodoItem";

type KanbanSectionProps = {
  list: TTodoItem[];
  disabled: boolean;
  status: string;
  nextStatus?: TodoStatus;
};

const KanbanSection = ({
  list,
  disabled,
  status,
  nextStatus,
}: KanbanSectionProps) => {
  return (
    <section
      className={`todo_section todo_${status} ${
        disabled && "todo_section_disabled"
      }`}
    >
      <p>
        Количество задач в статусе {status}: {list.length}
      </p>
      <div>
        {list.length > 0 ? (
          list.map((todo: TTodoItem) => (
            <TodoItem {...todo} nextStatus={nextStatus} key={todo.id} />
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </section>
  );
};
export default KanbanSection;
