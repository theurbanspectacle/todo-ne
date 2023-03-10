import { useMutation, useQuery } from "@apollo/client";
import { Column, Grid, Button, Loading, InlineNotification } from "@carbon/react";
import { Add } from "@carbon/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewTodo from "../../components/NewTodo";
import Todo from "../../components/Todo";
import { NEW_TODO } from "../../utils/mutations";
import { QUERY_TODO } from "../../utils/queries";

function Home() {
  const [homeState, setHomeState] = useState({
    newTodoModal: false,
    killerError: false,
  }); 

  const arrange = (a, b) => {
    if (a.arrange < b.arrange) {
      return -1;
    }
    if (a.arrange > b.arrange) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  const { loading, error, data, refetch } = useQuery(QUERY_TODO);
  const [SaveNewTodo] = useMutation(NEW_TODO);
  const navigate = useNavigate();
  const todos = structuredClone((data?.todos || [])).sort(arrange);

  const newTodo = () => {
    setHomeState({...homeState, newTodoModal: true});
  }

  const reloadData = () => {
    refetch();
  }

  const saveTodo = async (title) => {
    try {
      await SaveNewTodo({
        variables: { title, arrange: todos.length },
      });

      reloadData();
    } catch (error) {
      console.error("Uanble to create TODO", error);
      setHomeState({...homeState, killerError: true});
    }

    setHomeState({...homeState, newTodoModal: false});
  };

  let mainContent = <Loading className='main-loading' description='Loading' />;

  if (!loading && !error && !homeState.killerError) {
    if (todos.length) {
      mainContent = (
        <div className="todo-wrapper">
          {todos.map((item, index) => <Todo reloadData={reloadData} item={item} key={index} leftItem={todos[index - 1]} rightItem={todos[index + 1]} />)}
        </div>
      );
    } else {
      mainContent = (
        <InlineNotification
          kind="info"
          lowContrast={true}
          hideCloseButton={true}
          subtitle='Press the New Category button to get started.'
          title="Start creating your TODO's!"
        />
      );
    }
  } else if (error || homeState.killerError) {
    if (error?.graphQLErrors[0] && error?.graphQLErrors[0].extensions?.code === 'UNAUTHENTICATED') {
      setTimeout(() => {
        navigate('/login');
      });
    } else {
      console.error('Unable to get TODOs', error);
    }

    mainContent = (
      <InlineNotification
        kind="error"
        lowContrast={true}
        hideCloseButton={true}
        subtitle='Please try again.'
        title="Unable to load TODO's"
      />
    );
  }

  return (
    <div className="home-page">
      <Grid style={{marginBottom: '2rem'}}>
        <Column lg={8} md={4} sm={4} max={8} xlg={8}>
          <h1>TODO</h1>
        </Column>
        <Column lg={8} md={4} sm={4} max={8} xlg={8}>
          <Button renderIcon={Add} onClick={newTodo} style={{marginLeft: 'auto', display: 'block'}}>New Category</Button>
        </Column>
      </Grid>
      {mainContent}
      {homeState.newTodoModal && <NewTodo close={() => setHomeState({...homeState, newTodoModal: false})} save={saveTodo} />}
    </div>
  );
}

export default Home;
