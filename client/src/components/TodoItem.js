import { Tile } from "@carbon/react";
import React from "react";


export default function TodoItem(props) {
  return <Tile light={true} className="todo-tile" key={props.index}>My TODO Item {props.index}</Tile>;
};
