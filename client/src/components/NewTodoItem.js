import { ComposedModal, ModalHeader, ModalBody, ModalFooter, Button, DatePicker, Select, SelectItem, DatePickerInput, Form, Stack, TextInput } from "@carbon/react";
import React, { useState } from "react";


export default function NewTodoItem(props) {
  const [formState, setFormState] = useState({
    description: props.item?.description || '',
    priority: props.item?.priority || '3',
    dueDate: props.item?.dueDate || '',
  }); 

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value});
  };

  const dateChange = (data) => {
    handleInputChange({target: {name: 'dueDate', value: data[0].toISOString()}})
  }

  return (
    <ComposedModal open={true} onClose={props.close}>
      <ModalHeader>{props.initialTitle ? `Edit ${props.initialTitle}` : `Add task to ${props.todoName}`}</ModalHeader>
      <ModalBody hasForm>
        <Form>
          <Stack gap={7}>
            <TextInput id="modal-new-description" labelText="Title" name="description" required={true} value={formState.description} onChange={handleInputChange} />
            <Select id="modal-new-priority" labelText="Priority" defaultValue={formState.priority} name="priority" onChange={handleInputChange}>
              <SelectItem text="Low" value="3"/>
              <SelectItem text="Medium" value="2"/>
              <SelectItem text="High" value="1"/>
            </Select>
            <DatePicker dateFormat="m/d/Y" datePickerType="single" onChange={dateChange}>
              <DatePickerInput
                id="modal-new-dueDate"
                placeholder="mm/dd/yyyy"
                labelText="Due Date (Optional)"
                name="dueDate"
                value={formState.dueDate ? new Date(formState.dueDate).toLocaleDateString() : ''}
                type="text"
              />
            </DatePicker>
          </Stack>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={props.close}>Cancel</Button>
        <Button disabled={!formState.description || !formState.priority} kind="primary" onClick={() => props.save({...formState})}>{props.initialTitle ? 'Save' : 'Create'}</Button>
      </ModalFooter>
    </ComposedModal>
  );
};
