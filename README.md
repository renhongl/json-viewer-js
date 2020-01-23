
## JSON Viewer
One pretty json viewer by javascript

Home page: [json-viewer-js](https://github.com/renhongl/json-viewer-js)

## Example

```js
import JsonViewer from './jsonViewer';

const testJson = `{
  "example1": [
      {
          "name": "test01",
          "age": 18,
          "gender": 0,
          "student": true,
          "children": null
      },
      {
          "name": "test02",
          "age": 19,
          "gender": 1,
          "student": true,
          "children": null
      }
  ],
  "example2": {
      "friuts": ["apple", "grape", "jujube", "pear"],
      "transport": ["taxi", "bus", "metro", "plane", "train"]
  }
}`

new JsonViewer({container: document.body, data: testJson, theme: 'light', expand: false});

```

## Output Example

Light theme

![](https://renhongl.github.io/images/s2.png)

Dark theme

![](https://renhongl.github.io/images/s1.png)

## API Reference

Name|Type|Desc|Default|Required
---|---|---|---|---
container|DOM Object|DOM element|null|true
data|String|Json data for render|'{}'|true
theme|String|Config for different theme(light or dark)|light|false
expand|Boolean|Config for if expand when loaded|false|false

## End

If you like it, please give me a star, thanks!