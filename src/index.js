import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {store} from './redux/store'
import {Provider} from 'react-redux'

const request = indexedDB.open('tasklist_db', 1)

request.onclocked = function(){ // Lorsque'on ouvre l'application dans un autre onglet et qu'on utilise une version antérieur de la database
  alert('Erreur ! Version antérieur utilisée !')
}

request.onupgradeneeded = function(event){ // Lorsqu'on modifie la structure de la base de donnée et au moment de sa création
  // Ce code permet de créer les tables et de remplur la base de donnée
  let db = event.target.result // On crée un l'objet qui donne accès on actions sur la base de données
  let storeSpace = db.createObjectStore("space", {keyPath: "id"})  // On crée un object qui donne accès à la table Space
  let storeArray = db.createObjectStore("array", {keyPath: "id"})  // On crée un object qui donne accès à la table Array
  let storeTask = db.createObjectStore("task", {keyPath: "id"})  // On crée un object qui donne accès à la table Task

  // On remplit nos tables avec des données JSON
  let spaces = JSON.parse(`[{"id":"2","title":"Taches quotidiennes","color":"#fff"},{"id":"3","title":"Tableau de bienvenue","color":"#fff"},{"id":"6","title":"Space 6","color":"#fff"},{"id":"7","title":"Space 7","color":"#fff"}]`)
  for(let space of spaces){
    storeSpace.put({
      id: space.id,
      title: space.title
    })
  }


  let arrays = JSON.parse(`[{"id":"1","order":3,"title":"Projet ressourcesssssss","spaceId":"2"},{"id":"2","order":4,"title":"Sujet de la prochaine réunion","tasks":[{"id":"4","intitule":"Faire le systeme de connexion"},{"id":"d42b226b-f2e9-42c3-a56a-5d0ff597ac0c","intitule":"Faire le header"}],"spaceId":"2"},{"id":"5","title":"aze","tasks":[],"order":5,"spaceId":"2"}]`)
  for(let array of arrays){
    storeArray.put({
      id: array.id,
      order: array.order,
      title: array.title,
      spaceId: array.spaceId
    })
  }

  let tasks = JSON.parse(`[
    {
       "id":"1",
       "intitule":"Faire la page d'accueil",
       "arrayId": "1"
    },
    {
       "id":"3",
       "intitule":"Faire le footerrrrrrrrr",
       "arrayId": "1"
    },
    {
       "id":"4cd86544-a120-44ff-9cd6-07683fa2d5c6",
       "intitule":"ddddd",
       "arrayId": "1"
    },
    {
       "id":"4",
       "intitule":"Faire le systeme de connexion",
       "arrayId": "2"
    },
    {
       "id":"d42b226b-f2e9-42c3-a56a-5d0ff597ac0c",
       "intitule":"Faire le header",
       "arrayId": "2"
    }
]`)

for(let task of tasks){
  storeTask.put({
    id:task.id,
    intitule: task.intitule,
    arrayId: task.arrayId
 })
}

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // Permet de mettre à jour le dom avec nos composants react, affiche le composant App dans la div d'id root
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
