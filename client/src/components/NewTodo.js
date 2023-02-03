import { ComposedModal, ModalHeader, ModalBody, ModalFooter, Button, TextInput } from "@carbon/react";
import React, { useState } from "react";


export default function NewTodo(props) {
  const [formState, setFormState] = useState({
    title: props.initialTitle || '',
  }); 

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value});
  };

  return (
    <ComposedModal open={true} onClose={props.close}>
      <ModalHeader>{props.initialTitle ? `Edit ${props.initialTitle}` : 'New Category'}</ModalHeader>
      <ModalBody hasForm>
        <TextInput id="modal-new-title" labelText="Title" name="title" required={true} value={formState.title} onChange={handleInputChange} />
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={props.close}>Cancel</Button>
        <Button disabled={!formState.title} kind="primary" onClick={() => props.save(formState.title)}>{props.initialTitle ? 'Save' : 'Create'}</Button>
      </ModalFooter>
    </ComposedModal>
  );
};
