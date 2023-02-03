import { OverflowMenu, OverflowMenuItem, Tile } from "@carbon/react";
import { CheckmarkOutline, RadioButton } from "@carbon/icons-react";
import React, { useState } from "react";
import { DELETE_TODO_ITEM, EDIT_TODO_ITEM } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import NewTodoItem from "./NewTodoItem";
import Confirmation from "./Confirmation";


export default function TodoItem(props) {
  const [todoItemState, setTodoItemState] = useState({
    showEditModal: false,
    showDeleteModal: false,
  }); 

  const [SaveTodoItem] = useMutation(EDIT_TODO_ITEM);

  const saveTodoItem = async (item) => {
    try {
      await SaveTodoItem({
        variables: {
          itemId: props.item?._id,
          description: item.description,
          completed: item.completed,
          priority: Number(item.priority),
          dueDate: item.dueDate,
        },
      });

      props.reloadData();
    } catch (error) {
      console.error("Uanble to save TODO item", error);
    }

    setTodoItemState({...todoItemState, showEditModal: false});
  }

  const [DeleteTodoItem] = useMutation(DELETE_TODO_ITEM);

  const deleteTodoItem = async () => {
    try {
      await DeleteTodoItem({
        variables: {
          itemId: props.item?._id,
        },
      });

      props.reloadData();
    } catch (error) {
      console.error("Uanble to delete TODO item", error);
    }

    setTodoItemState({...todoItemState, showDeleteModal: false});
  }

  const toggleComplete = () => {
    const item = Object.assign({}, props.item);
    item.completed = !item.completed;
    saveTodoItem(item);
  };

  const getPriority = (priority) => {
    switch (priority) {
      case 1:
        return 'High';
      case 2:
        return 'Medium';
      case 3:
      default:
        return 'Low';
    }
  }

  const editItem = () => {
    setTodoItemState({...todoItemState, showEditModal: true});
  };

  const deleteItem = () => {
    setTodoItemState({...todoItemState, showDeleteModal: true});
  }

  return (
    <>
      <Tile 
        draggable={true} 
        onDragEnd={props.onDragEnd} 
        onDragStart={props.onDragStart} 
        light={true} 
        className="todo-tile"
      >
        <OverflowMenu className="todo--menu" flipped={true} ariaLabel="Item Menu">
          <OverflowMenuItem itemText="Edit" onClick={editItem} />
          <OverflowMenuItem itemText="Delete" isDelete={true} onClick={deleteItem}/>
        </OverflowMenu>
        <div className="check-area">
          {props.item.completed ? <CheckmarkOutline size={24} onClick={toggleComplete} /> : <RadioButton size={24} onClick={toggleComplete} />}
        </div>
        <div className="info-area">
          <p>{props.item.description}</p>
          <p className="sub-info">Priority: {getPriority(props.item.priority)}</p>
          {!!props.item.dueDate && <p className="sub-info right-content">Due Date: {new Date(Number(props.item.dueDate)).toLocaleDateString()}</p>}
        </div>
      </Tile>
      {todoItemState.showEditModal && <NewTodoItem item={props.item} todoName={props.parentName} close={() => setTodoItemState({...todoItemState, showEditModal: false})} save={(data) => saveTodoItem(Object.assign({}, props.item, data))} />}
      {todoItemState.showDeleteModal && <Confirmation title={`Delete ${props.item?.description || 'item?'}`} body="Are you sure you want to delete this TODO?  This cannot be undone." close={() => setTodoItemState({...todoItemState, showDeleteModal: false})} save={deleteTodoItem} />}
    </>
  );
};
