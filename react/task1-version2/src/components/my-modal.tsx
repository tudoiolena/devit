import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IProps {
  open: boolean;
  disableGlobalScroll?: boolean;
  children: ReactNode;
}

const MyModal: FC<IProps> = ({ open, disableGlobalScroll, children }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(open);

  useEffect(() => {
    setModalOpen(open);
    if (disableGlobalScroll) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [disableGlobalScroll, open]);

  if (!modalOpen) return null;

  return createPortal(
    <div className={`modal ${modalOpen ? "active" : ""}`}>
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("modal-root") as Element
  );
};

export default MyModal;
