import {Button, Card, Container, Grid} from 'semantic-ui-react';
import { useRouter } from 'next/router';

export default function HomePage({tasks}) {

  const router= useRouter();

//Cuando no hay tareas
  if(tasks.length === 0) return (
    <Grid 
      centered
      verticalAlign="middle"
      columns="1"
      style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>There are no tasks yet</h1>
          <img src="https://c.neh.tw/thumb/f/350/d992100a47dc4d09841e.jpg" alt="No task yet"/>
        
          <div>
            <Button primary
                    onClick={() => router.push('/tasks/new')}>
              Create a task
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
)

//Render a list of task
  return (
    <Container fluid
                style={{padding: "20px"}}
                >
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
            <Card key={task.id}
                  color='green'>
              <Card.Content>
                <Card.Header textAlign="center">{task.title}</Card.Header>
                <p>{task.description}</p>
              </Card.Content>
              <Card.Content extra
                            textAlign="center">
                <Button.Group >
                <Button inverted color='green' onClick={() => router.push(`/tasks/${task._id}`)}>View</Button>
                <Button.Or />
                <Button inverted color='blue' onClick={() => router.push(`/tasks/${task._id}/edit`)}>Edit</Button>
                </Button.Group>
              </Card.Content>
            </Card>
        ))}
      </Card.Group>
    </Container>
  )
}

//Simplifica el useEffect de React
export const getServerSideProps = async (ctx) => {
  //Realiza la peticion
  const res = await fetch('http://localhost:3000/api/tasks');

  //Lo convierte a JSON
  const tasks = await res.json();

  //Lo pasamos a props y luego se lo pasamos al fronted
  return {
    props: {
      tasks,
    },
  };
};