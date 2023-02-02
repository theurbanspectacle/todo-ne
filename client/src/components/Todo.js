
import { OverflowMenu, OverflowMenuItem, Tile } from "@carbon/react";
import { Menu } from "@carbon/icons-react";
import React from "react";
import TodoItem from './TodoItem';


export default function Todo(props) {
  const editItem = () => {
    alert('NOT READY');
  };

  const deleteItem = () => {
    alert('NOT READY');
  };

  return (
    <Tile className="todo">
       <OverflowMenu className="todo--menu" flipped={true} renderIcon={Menu}>
        <OverflowMenuItem itemText="Edit" onClick={editItem} />
        <OverflowMenuItem itemText="Delete" isDelete={true} onClick={deleteItem}/>
      </OverflowMenu>
      <div className="todo--title">{props.item?.title || 'UNKNOWN'}</div>
      <div className="todo--items">
        {(props.item?.items && props.item?.items.length) ? props.item.items.map((item, index) => <TodoItem item={item} key={index} />) : <p>No items. Create one and change my design</p>}
      </div>
    </Tile>
  );
};
