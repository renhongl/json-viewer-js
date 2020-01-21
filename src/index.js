
import JsonViewer from './jsonViewer';



const testJson = `{
    "employees": {
      "employee": [
        {
          "id": "1",
          "male": true,
          "name": null,
          "children": null,
          "age": 18,
          "firstName": "Tom",
          "lastName": "Cruise",
          "photo": "https://jsonformatter.org/img/tom-cruise.jpg"
        },
        {
          "id": "2",
          "firstName": "Maria",
          "lastName": "Sharapova",
          "photo": "https://jsonformatter.org/img/Maria-Sharapova.jpg"
        },
        {
          "id": "3",
          "firstName": "Robert",
          "lastName": "Downey Jr.",
          "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg"
        }
      ]
    }
  }`

new JsonViewer({container: document.body, data: testJson, theme: 'light'});