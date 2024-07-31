import React from "react";
import "./SuccessModal.css";
import { Button, Modal } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  openSuccessModal: boolean;
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SuccessModal({
  openSuccessModal,
  setOpenSuccessModal,
}: Props) {
  const handleClose = () => {
    setOpenSuccessModal(false);
  };
  return (
    <Modal open={openSuccessModal} onClose={handleClose}>
      <div className="success-modal">
        <CheckIcon className="success-modal-icon" />
        <div className="success-modal-title">Paiement réussi</div>
        <div className="success-modal-content">
          <div>Vous allez reçevoir par mail les codes.</div>
          <div>Cette opération peut prendre quelques minutes.</div>
          <div>Pensez à regarder vos spams.</div>
        </div>
        <Button variant="contained" color="success" onClick={handleClose}>
          <span>Ok</span>
        </Button>
      </div>
    </Modal>
  );
}
