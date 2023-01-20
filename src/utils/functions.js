import { v4 as uuidv4 } from 'uuid';

export const getTaskById = (id_task, tasks) => {
    let taskToMove = {}

        for(let task of tasks){
            if(task.id.toString() === id_task.toString()){
                taskToMove = task
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

export const deleteSpacesIDB = (spacesId) => {

    // Ouvrir la base de données
var request = indexedDB.open("tasklist_db", 1);

request.onsuccess = function(event) {
  var db = event.target.result;

  // Commencer une transaction en mode écriture
  var transaction = db.transaction("space", "readwrite");

  // Obtenir un accès à la table
  var objectStore = transaction.objectStore("space");

  for(let spaceId of spacesId){
      // Effectuer la requête de suppression
    var request = objectStore.delete(spaceId);

    request.onsuccess = function(event) {
        console.log("Space supprimé avec succès");
    };

    request.onerror = function(event) {
        console.log("Une erreur est survenue lors de la suppression du Space");
    };
  }


};


}


export const insertArrayIDB = (newArray) => {
    console.log('here')
    let request = indexedDB.open("tasklist_db", 1);

    request.onsuccess = function(event) {
        var db = event.target.result;
      
        // Commencer une transaction en mode écriture
        var transaction = db.transaction("array", "readwrite");
      
        // Obtenir un accès à la table
        var objectStore = transaction.objectStore("array");

        // Effectuer la requête d'insertion
        var request = objectStore.put(newArray);
      
        request.onsuccess = function(event) {
          console.log("Tableau ajouté avec succès");
        };

        request.onerror = function(event) {
          console.log("Une erreur est survenue lors de l'ajout du Tableau");
        };
      };
}

export const deleteArrayIDB = (arrayId) => {
console.log(arrayId)
    // Ouvrir la base de données
var request = indexedDB.open("tasklist_db", 1);

request.onsuccess = function(event) {
  var db = event.target.result;

  // Commencer une transaction en mode écriture
  var transaction = db.transaction("array", "readwrite");

  // Obtenir un accès à la table
  var objectStore = transaction.objectStore("array");

  // Effectuer la requête de suppression
  var request = objectStore.delete(arrayId);

  request.onsuccess = function(event) {
    console.log("Tableau supprimé avec succès");
  };

  request.onerror = function(event) {
    console.log("Une erreur est survenue lors de la suppression du Tableau");
  };
};


}


export const updateArrayIDB = (array) => {

    // Ouvrir la base de données
    var request = indexedDB.open("tasklist_db", 1);

    request.onsuccess = function(event) {
    var db = event.target.result;

    // Commencer une transaction en mode écriture
    var transaction = db.transaction("array", "readwrite");

    // Obtenir un accès à la table
    var arrayStore = transaction.objectStore("array");

    // Effectuer la requête de modification
    var request = arrayStore.put(array);

    request.onsuccess = function(event) {
        console.log("Tableau modifié avec succès");
    };

    request.onerror = function(event) {
        console.log("Une erreur est survenue lors de la modification du Tableau");
    };
    };

}

export const insertTaskIDB = (newTask) => {

    let request = indexedDB.open("tasklist_db", 1);

    request.onsuccess = function(event) {
        var db = event.target.result;
      
        // Commencer une transaction en mode écriture
        var transaction = db.transaction("task", "readwrite");
      
        // Obtenir un accès à la table
        var objectStore = transaction.objectStore("task");

        // Effectuer la requête d'insertion
        var request = objectStore.put(newTask);
      
        request.onsuccess = function(event) {
          console.log("Tâche ajouté avec succès");
        };

        request.onerror = function(event) {
          console.log("Une erreur est survenue lors de l'ajout du Tâche");
        };
      };
}

export const deleteTaskIDB = (taskId) => {

        // Ouvrir la base de données
    var request = indexedDB.open("tasklist_db", 1);
    
    request.onsuccess = function(event) {
      var db = event.target.result;
    
      // Commencer une transaction en mode écriture
      var transaction = db.transaction("task", "readwrite");
    
      // Obtenir un accès à la table
      var objectStore = transaction.objectStore("task");
    
      // Effectuer la requête de suppression
      var request = objectStore.delete(taskId);
    
      request.onsuccess = function(event) {
        console.log("Tâche supprimé avec succès");
      };
    
      request.onerror = function(event) {
        console.log("Une erreur est survenue lors de la suppression du Tâche");
      };
    };
    
    
    }

    export const updateTaskIDB = (task) => {

        // Ouvrir la base de données
        var request = indexedDB.open("tasklist_db", 1);
    
        request.onsuccess = function(event) {
        var db = event.target.result;
    
        // Commencer une transaction en mode écriture
        var transaction = db.transaction("task", "readwrite");
    
        // Obtenir un accès à la table
        var taskStore = transaction.objectStore("task");
    
        // Effectuer la requête de modification
        var request = taskStore.put(task);
    
        request.onsuccess = function(event) {
            console.log("Tâche modifié avec succès");
        };
    
        request.onerror = function(event) {
            console.log("Une erreur est survenue lors de la modification du Tâche");
        };
        };
    
    }