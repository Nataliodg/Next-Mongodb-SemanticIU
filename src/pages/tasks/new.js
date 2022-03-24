import { Button, Form, Grid } from "semantic-ui-react"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function NewTaksForm() {

    //Llamamos al hook useState
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });

    //Llamamos al hook useRouter
    const {query, push} = useRouter();

    //Validar que no mande un arreglo vacio
    const validate = () => {
        const errors = {}

        if(!newTask.title) errors.title = "Title is required";
        if(!newTask.description) errors.description = "Description is required";

        return errors;
    }

    //Enviamos los datos
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validamos errores
        let errors = validate();

        if(Object.keys(errors).length) return setErrors(errors)
        //

        //Update o create task
        if(query.id){
            await updateTask();
        }else{
            await createTask();
        }

        //Redireccionamos
        await push('/');

    }

    //Creamos una funcion para crear los datos:
    const createTask = async () => {
        try {
            await fetch('https://next-mongodb-semantic-iu.vercel.app/api/tasks' , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            console.error(error);
        }
    }

    //Actualizamos los datos
    const updateTask = async () => {
        try {
            await fetch('https://next-mongodb-semantic-iu.vercel.app/api/tasks/' + query.id , {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            console.error(error);
        }
    }

    //Captura los datos
    const handleChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value});

    //Extrae los datos 
    const getTask = async () =>{
        const res = await fetch('https://next-mongodb-semantic-iu.vercel.app/api/tasks/' + query.id);
        const data = await res.json();
        setNewTask({
            title: data.title, 
            description: data.description})
    }

    
    useEffect(() => {
        if(query.id) getTask();
    }, [])
    

    return (
    <Grid 
        centered
        verticalAlign="middle"
        columns="3"
        style={{height: "80vh"}}>
        <Grid.Row>
            <Grid.Column textAlign="center">
                <h1>{query.id ? 'Update Task' : 'Create Task'}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Input label="Title" 
                                placeholder="Title" 
                                name="title"
                                onChange={handleChange}
                                error={
                                    errors.title
                                    ? {content: "Please enter a title", pointing:"below"}
                                    : null
                                }
                                value={newTask.title}
                                />
                    <Form.TextArea  label="Description" 
                                    placeholder="Description"
                                    name="description"
                                    onChange={handleChange}
                                    error={
                                        errors.description
                                        ? {content: errors.description, pointing:"below"}
                                        : null
                                    }
                                    value={newTask.description}
                                    />

                    <Button inverted color='blue'>
                    {query.id ? 'Update' : 'Save'}
                    </Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)
}
