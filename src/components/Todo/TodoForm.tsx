import { useState } from "react";

type TodoFormProps = {
  onConfirm: (title: string, desc: string) => void;
};
const TodoForm = ({ onConfirm }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm(title, description);
    setTitle("");
    setDescription("");
  };
  return (
    <form onSubmit={handleAddTodo}>
      <fieldset className="input_fieldset">
        <label className="input_label" htmlFor="title">
          Заголовок
        </label>
        <input
          className="input-field"
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
          required
          placeholder="Добавьте описание"
        />
      </fieldset>
      <fieldset className="input_fieldset">
        <label className="input_label" htmlFor="desc">
          Описание
        </label>
        <textarea
          className="input-textarea"
          id="desc"
          name="description"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(event.target.value);
          }}
          required
          placeholder="Добавьте описание"
        />
      </fieldset>
      <input type="submit" className="default_button" />
    </form>
  );
};
export default TodoForm;
