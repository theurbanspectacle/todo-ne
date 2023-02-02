import { ComposedModal, ModalHeader, ModalBody, ModalFooter, Button, TextInput } from "@carbon/react";
import React, { useState } from "react";


export default function NewTodo(props) {
  const [formState, setFormState] = useState({
    title: '',
  }); 

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value});
  };

  return (
    <ComposedModal open={true} onClose={props.close}>
      <ModalHeader label="New TODO" />
      <ModalBody hasForm>
        <TextInput id="modal-new-title" labelText="Title" name="title" required={true} value={formState.title} onChange={handleInputChange} />
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={props.close}>Cancel</Button>
        <Button disabled={!formState.title} kind="primary" onClick={() => props.save(formState.title)}>Create</Button>
      </ModalFooter>
    </ComposedModal>
  );
};
