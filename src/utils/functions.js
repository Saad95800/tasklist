import { v4 as uuidv4 } from 'uuid';

export const getTaskById = (id_task, arrays) => {
    let taskToMove = {}

    for(let array of arrays){
        for(let task of array.tasks){
            if(task.id.toString() === id_task.toString()){
                taskToMove = task
            }
        }
    }

    return taskToMove

}

export const deleteTaskFunc = (id_task, arrays) => {
        
    let newArray = [...arrays]

    for(let array of newArray){
        let newTasks = []
        for(let task of array.tasks){
            if(task.id.toString() !== id_task.toString()){
                newTasks.push(task)
            }
        }
        array.tasks = newTasks
    }
    return newArray
}

export const addTaskFunc = (task, idArray, arrays) => {

    let newArray = []

    for(let array of arrays){

        if(Number(array.id) === Number(idArray)){
            newArray.push({
                ...array,
                tasks: [
                    ...array.tasks,
                    {
                        id: uuidv4(),
                        intitule: task
                    }
                ]
            })
        }else{
            newArray.push(array)
        }

    }
    return newArray

}

export const updatetaskFunc = (id_task, intitule, arrays) => {
    let newArrays = [...arrays]
    
    for(let array of newArrays){
        for(let task of array.tasks){
            if(task.id.toString() === id_task.toString()){
                task.intitule = intitule
            }
        }
    }

    return newArrays
}