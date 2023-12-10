import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren } from "react";
type ModalWindowProps = {
  title: string;
  open: boolean;
  handleOpen: () => void;
};
const ModalWindow = ({
  title,
  open,
  handleOpen,
  children,
}: PropsWithChildren<ModalWindowProps>) => {
  const showOverlay = open ? "modal-overlay-opened" : "modal-overlay-closed";
  return (
    <div className={`modal-overlay ${showOverlay}`}>
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <h2>{title}</h2>
          <button className="modal-close-button" onClick={handleOpen}>
            <FontAwesomeIcon icon={faXmark} fontSize={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
export default ModalWindow;
