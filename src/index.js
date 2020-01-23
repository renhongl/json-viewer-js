
import JsonViewer from './jsonViewer';

const testJson = `{
    "example1":[
        {
            "name":"test01",
            "age":18,
            "gender":0,
            "student":true,
            "children":null
        },
        {
            "name":"test02",
            "age":19,
            "gender":1,
            "student":true,
            "children":null
        }],
    "example2":{
        "friuts":[
            "apple",
            "grape",
            "jujube",
            "pear"],
        "transport":[
            "taxi",
            "bus",
            "metro",
            "plane",
            "train"]
    }
}`

new JsonViewer({container: document.body, data: testJson, theme: 'light', expand: true});