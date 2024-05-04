import { FC, ReactNode, useEffect, useState } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
  disableGlobalScroll: boolean;
  children: ReactNode;
}

const MyModal: FC<IProps> = ({
  open,
  onClose,
  disableGlobalScroll,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(open);

  useEffect(() => {
    setModalOpen(open);
    if (disableGlobalScroll) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [disableGlobalScroll, open]);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  if (!modalOpen) return null;

  return (
    <div className={`modal ${modalOpen ? "active" : ""}`}>
      <div className="modal-content">
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default MyModal;
