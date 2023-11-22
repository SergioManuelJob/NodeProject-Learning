const Task = require('../models/task')

async function createTask(req, res) {
    const task = new Task()
    const params = req.body

    task.title = params.title
    task.description = params.description

    try{
        const taskStore = await task.save()

        if(!taskStore){
            res.status(400).send({msg: "Task could not be saved"})
        } else {
            res.status(200).send({task: taskStore})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getTasks(req,res) {
    try{
        const tasks = await Task.find({completed: false}).sort({ created_at: -1})

        if(!tasks){
            res.status(400).send("Tasks could not be retrieved")
        } else {
            res.status(200).send({tasks: tasks})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getTask(req, res){
    const idTask = req.params.id
    try{
        const task = await Task.findById(idTask)

        if(!task){
            res.status(400).send({msg: "The indicated task has not been found"})
        } else {
            res.status(200).send({task : task})
        }
    } catch (error){
        res.status(500).send(error)
    }
}

async function updateTask(req, res){
    const idTask = req.params.id
    const params = req.body

    try{
        const task = await Task.findByIdAndUpdate(idTask, params)

        if(!task){
            res.status(400).send({msg: "The indicated task has not been found and therefore it wasn't updated"})
        } else {
            res.status(200).send({msg: "The task has been updated"})
        }
    } catch (error){
        res.status(500).send(error)
    }
}

async function deleteTask(req, res){
    const idTask = req.params.id

    try{
        const task = await Task.findByIdAndDelete(idTask)

        if(!task){
            res.status(400).send({msg: "The indicated task could not be deleted"})
        } else {
            res.status(200).send({task: task})
        }
    } catch (error){
        res.status(500).send(error)
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}