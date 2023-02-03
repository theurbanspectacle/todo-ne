import { ComposedModal, ModalHeader, ModalBody, ModalFooter, Button } from "@carbon/react";
import React from "react";


export default function Confirmation(props) {
  return (
    <ComposedModal open={true} onClose={props.close}>
      <ModalHeader>{props.title}</ModalHeader>
      <ModalBody>
        <p>{props.body}</p>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={props.close}>No</Button>
        <Button kind="danger" onClick={props.save}>Yes</Button>
      </ModalFooter>
    </ComposedModal>
  );
};
