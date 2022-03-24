import Error from "next/error"
import { Button, Confirm, Grid, Loader } from "semantic-ui-react"
import { useState } from "react"
import { useRouter } from "next/router";

export default function TasksDetails({task, error}) {

    const [confirm , setConfirm ] = useState(false);

    const {query, push} = useRouter();

    const [isDeleting, setIsDeleting] = useState(false)

    const open = () => setConfirm(true);
    const close = () => setConfirm(false);

    const deleteTask = async () => {
        const {id} = query;

        try {
            await fetch(`https://next-mongodb-semantic-iu.vercel.app/api/tasks/${id}`,{
                method: "DELETE",
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = () => {
        setIsDeleting(true);
        deleteTask();
        close();
        push('/');
    };

    if(error && error.statusCode) {
        return <Error  statusCode={error.statusCode} title={error.statusText} />
}

    return (
    <Grid centered
        verticalAlign="middle"
        columns="3"
        style={{height: "80vh"}}>
        <Grid.Row>
            <Grid.Column textAlign="center">
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <div>
                    <Button inverted color='red'
                            onClick={open}
                            loading={isDeleting}>
                        Delete
                    </Button>
                </div>
            </Grid.Column>
        </Grid.Row>
        <Confirm 
            header="Please confirm"
            content="Are you sure you want to delete this task?"
            open={confirm}
            onConfirm={handleDelete}
            onCancel={close}/>
    </Grid>
)
}

export async function getServerSideProps({query: {id}}){
    const res = await fetch(`https://next-mongodb-semantic-iu.vercel.app/api/tasks/${id}`)

    if (res.status === 200) {
        const task = await res.json()
        return {
            props: {
                task
            }
        }
    }

    return {
        props:{
            error: {
                statusCode: res.status,
                statusText: "Invalid id"
            }
        },
    }
}
