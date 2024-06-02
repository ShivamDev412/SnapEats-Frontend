import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";

import { FC } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  modalTitle: string;
};
const ModalComponent: FC<Props> = ({
  open,
  handleClose,
  children,
  modalTitle,
}) => {
  return (
    <div>
      <Modal open={open} aria-labelledby={modalTitle}>
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-4 shadow-lg bg-zinc-100 w-11/12  sm:w-6/12 xl:w-[30%] 2xl:w-1/5 text-zinc-900 rounded-lg">
          <div className="flex justify-end">
            <button onClick={handleClose} className="text-xl">
              <IoClose />
            </button>
          </div>
          {children}
        </div>
      </Modal>
    </div>
  );
};
export default ModalComponent;
