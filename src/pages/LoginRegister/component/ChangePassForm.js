import React from "react";
import PassForm from "./PassForm";

export default function ChangePassForm(props) {
  const { handleOpen, handleClose } = props;

  return (
    <div>
      <PassForm handleOpen={handleOpen} handleClose={handleClose} />
    </div>
  );
}
