import React from "react";
import { Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./ErrorModal.css";

type Props = {
  openErrorModal: boolean;
  setOpenErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
  errorType: string;
  setErrorType: React.Dispatch<React.SetStateAction<string>>;
};

export default function ErrorModal({
  openErrorModal,
  setOpenErrorModal,
  errorType,
  setErrorType,
}: Props) {
  const handleClose = () => {
    setOpenErrorModal(false);
    setErrorType("");
  };
  return (
    <Modal open={openErrorModal} onClose={handleClose}>
      <div className="modal">
        <CloseIcon className="icon" />
        <div className="title">Erreur !</div>
        {errorType == "payment" ? (
          <div>Il y a eu une erreur lors du paiement</div>
        ) : (
          <div>
            <div>Il y a eu une erreur lors de l'envoi du mail</div>
            <div>Veuillez nous contacter à l'adresse suivante oui@non.com</div>
          </div>
        )}
        <Button variant="contained" color="error" onClick={handleClose}>
          <span>Ok</span>
        </Button>
      </div>
    </Modal>
  );
}
