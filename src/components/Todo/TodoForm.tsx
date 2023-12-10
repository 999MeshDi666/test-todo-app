import { useEffect, useState } from "react";

type TodoFormProps = {
  onConfirm: (title: string, desc: string) => void;
  defaultTitle?: string;
  defaultDesc?: string;
};
const TodoForm = ({
  onConfirm,
  defaultDesc = "",
  defaultTitle = "",
}: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescValid, setIsDescValid] = useState(false);

  const handleAddTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleLength = title.length > 15;
    const descLength = description.length > 30;
    if (!titleLength && !descLength) {
      onConfirm(title, description);
      setTitle("");
      setDescription("");
    }
    setIsTitleValid(titleLength);
    setIsDescValid(descLength);
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
        {isTitleValid && <p>Заголовок не должен превышать 15 символов</p>}
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
        {isDescValid && <p>Описание не должно превышать 30 символов</p>}
      </fieldset>
      <input type="submit" className="default_button" />
    </form>
  );
};
export default TodoForm;
