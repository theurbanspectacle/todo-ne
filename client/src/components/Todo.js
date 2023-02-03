
import { ClickableTile, OverflowMenu, OverflowMenuItem, Tile } from "@carbon/react";
import { Menu, AddAlt } from "@carbon/icons-react";
import React, { useState } from "react";
import TodoItem from './TodoItem';
import Confirmation from "./Confirmation";
import NewTodo from "./NewTodo";
import NewTodoItem from "./NewTodoItem";
import { DELETE_TODO, DELETE_TODO_ITEM, EDIT_TODO, NEW_TODO_ITEM } from "../utils/mutations";
import { useMutation } from "@apollo/client";

export default function Todo(props) {
  const [todoState, setTodoState] = useState({
    showEditModal: false,
    showDeleteModal: false,
    showNewItemModal: false,
    dragOver: false,
  }); 

  const [SaveTodo] = useMutation(EDIT_TODO);

  const saveTodoDb = async (title) => {
    try {
      await SaveTodo({
        variables: {
          todoId: props.item?._id,
          title: title,
        },
      });

      props.reloadData();
    } catch (error) {
      console.error("Uanble to save TODO", error);
    }

    setTodoState({...todoState, showEditModal: false});
  }

  const [DeleteTodo] = useMutation(DELETE_TODO);

  const deleteTodoDb = async () => {
    try {
      await DeleteTodo({
        variables: {
          todoId: props.item?._id,
        },
      });

      props.reloadData();
    } catch (error) {
      console.error("Uanble to delete TODO", error);
    }

    setTodoState({...todoState, showDeleteModal: false});
  }

  const [SaveNewTodoItem] = useMutation(NEW_TODO_ITEM);

  let dragCounter = 1;

  const editItem = () => {
    setTodoState({...todoState, showEditModal: true});
  };

  const deleteItem = () => {
    setTodoState({...todoState, showDeleteModal: true});
  };

  const saveTodo = (title) => {
    setTodoState({...todoState, showEditModal: false});
    saveTodoDb(title);
  };

  const deleteTodo = () => {
    setTodoState({...todoState, showDeleteModal: false});
    deleteTodoDb();
  };

  const dragEnter = event => {
    dragCounter = 1;
    event.preventDefault();
    dragCounter++;
    setTodoState({...todoState, dragOver: true});
  };

  const dragLeave = event => {
    event.preventDefault();
    dragCounter--;

    if (dragCounter <= 0) {
      setTodoState({...todoState, dragOver: false});
    }
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  const [DeleteTodoItem] = useMutation(DELETE_TODO_ITEM);

  const drop = async event => {
    event.preventDefault();
    dragCounter = 1;
    const droppedItem = window.draggingItem ? JSON.parse(window.draggingItem) : undefined;

    if (droppedItem && event.currentTarget.id) {
      try {
        await SaveNewTodoItem({
          variables: {
            todoId: event.currentTarget.id,
            description: droppedItem.description,
            priority: Number(droppedItem.priority),
            dueDate: droppedItem.dueDate,
            completed: droppedItem.completed,
          },
        });

        await DeleteTodoItem({
          variables: {
            itemId: droppedItem._id,
          },
        });
  
        props.reloadData();
      } catch (error) {
        console.error("Uanble to move TODO item", error);
      }
    } else {
      console.warn('Unable to move', {droppedItem, event});
    }
  };

  const dragStart = (_event, item) => {
    window.draggingItem = JSON.stringify(item);
  };

  const dragEnd = (_event) => {
    setTimeout(() => {
      dragCounter = 1;
      window.draggingItem = undefined;
      document.querySelectorAll('.dragging-over').forEach(item => item.classList.remove('dragging-over'));
    });
  };

  const newItem = () => {
    setTodoState({...todoState, showNewItemModal: true});
  };

  const createTodoItem = async (item) => {
    setTodoState({...todoState, showNewItemModal: false});

    try {
      await SaveNewTodoItem({
        variables: {
          todoId: props.item?._id,
          description: item.description,
          priority: Number(item.priority),
          dueDate: item.dueDate,
        },
      });

      props.reloadData();
    } catch (error) {
      console.error("Uanble to create TODO item", error);
    }
  }

  return (
    <>
      <Tile className={`todo ${todoState.dragOver ? 'dragging-over' : ''}`} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={drop} id={props.item?._id}>
        <OverflowMenu className="todo--menu" flipped={true} renderIcon={Menu} ariaLabel="Menu">
          <OverflowMenuItem itemText="Edit" onClick={editItem} />
          <OverflowMenuItem itemText="Delete" isDelete={true} onClick={deleteItem}/>
        </OverflowMenu>
        <div className="todo--title">{props.item?.title || 'UNKNOWN'}</div>
        <div className="todo--items">
          {!!(props.item?.items && props.item?.items.length) && props.item.items.map((item, index) => <TodoItem reloadData={props.reloadData} onDragStart={(event) => dragStart(event, item)} onDragEnd={dragEnd} item={item} key={index} parentName={props.item?.title} />)}
          <ClickableTile onClick={newItem} light={true} className="todo-tile add-todo-item-action" key={props.index}><span>Add TODO</span><AddAlt size={24} /></ClickableTile>
        </div>
      </Tile>
      {todoState.showEditModal && <NewTodo initialTitle={props.item?.title} close={() => setTodoState({...todoState, showEditModal: false})} save={saveTodo} />}
      {todoState.showDeleteModal && <Confirmation title={`Delete ${props.item?.title || 'item?'}`} body="Are you sure you want to delete this category?  This cannot be undone." close={() => setTodoState({...todoState, showDeleteModal: false})} save={deleteTodo} />}
      {todoState.showNewItemModal && <NewTodoItem todoName={props.item?.title} close={() => setTodoState({...todoState, showNewItemModal: false})} save={createTodoItem} />}
    </>
  );
};
