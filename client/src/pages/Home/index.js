import { Column, Tile, Grid, Button } from "@carbon/react";


function Home() {
  const tiles = ['', '', '', '', '', '', '', '', '', '', '', ''];

  const getTile = (_item, index) => {
    return <Tile className="todo-tile" key={index}>My TODO item {index}</Tile>;
  };

  const newTodo = () => {
    alert('Not ready yet :(');
  }

  return (
    <div>
      <Grid style={{marginBottom: '2rem'}}>
        <Column lg={8} md={4} sm={4} max={8} xlg={8}>
          <h1>TODO</h1>
        </Column>
        <Column lg={8} md={4} sm={4} max={8} xlg={8}>
          <Button onClick={newTodo} style={{marginLeft: 'auto', display: 'block'}}>New TODO</Button>
        </Column>
      </Grid>
      {tiles.map((item, index) => getTile(item, index))}
    </div>
  );
}

export default Home;
