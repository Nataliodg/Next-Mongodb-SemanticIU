import {Schema, model, models} from 'mongoose'

const taskSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true,//Lo formatea (le quita los espacios al inicio o al final)
        maxlength: [40, 'Title must be less than 40 characters']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Description must be less than 200 characters']
    }
}, {
    //Guarda la fecha cuando se creo o actualizo
    timestamps: true,
    versionKey: false
})

//Para que no cree una nueva tarea cada vez que la pedimos (models.Task)
export default models.Task || model('Task', taskSchema);