

/**
 * @author renhongl
 * @email liangrenhong2017@gmail.com
 * @desc This lib is for render a pretty json data on browser
 */

require('./style.css');

const toString = Object.prototype.toString;

function isString(val) {
    return typeof val === 'string';
}

function isNumber(val) {
    return typeof val === 'number';
}

function isBoolean(val) {
    return typeof val === 'boolean';
}

function isUndefined(val) {
    return typeof val === 'undefined';
}

function isArray(val) {
    return toString.call(val) === '[object Array]';
}

function isObject(val) {
    return toString.call(val) === '[object Object]';
}

function isNull(val) {
    return toString.call(val) === '[object Null]';
}

function JsonViewer(options) {
    const defaults = {
        theme: 'light',
        container: null,
        data: '{}',
        expand: false,
    };
    this.options = Object.assign(defaults, options);
    if (isNull(options.container)) {
        throw new Error('Container: dom element is required');
    }
    this.render();
}

JsonViewer.prototype.renderRight = function(theme, right, val) {
    if (isNumber(val)) {
        right.setAttribute('class', theme + 'rightNumber');
    } else if (isBoolean(val)) {
        right.setAttribute('class', theme + 'rightBoolean');
    } else if (val === 'null') {
        right.setAttribute('class', theme + 'rightNull');
    } else {
        right.setAttribute('class', theme + 'rightString');
    }
    right.innerText = val;
}

JsonViewer.prototype.renderChildren = function(theme, key, val, right, indent, left) {
    let self = this;
    let folder = this.createElement('span');
    let rotate90 = this.options.expand ? 'rotate90' : '';
    let addHeight = this.options.expand ? 'add-height' : '';
    folder.setAttribute('class', theme + 'folder ' + rotate90);
    folder.onclick = function (e) {
        let nextSibling = e.target.parentNode.nextSibling;
        self.toggleItem(nextSibling, e.target);
    }
    let len = 0;
    let isObj = false;
    if (isObject(val)) {
        len = Object.keys(val).length;
        isObj = true;
    } else {
        len = val.length;
    }
    left.innerHTML = isObj ? key + '&nbsp;&nbsp{' + len + '}' : key + '&nbsp;&nbsp[' + len + ']';
    left.prepend(folder);
    right.setAttribute('class', theme + 'rightObj ' + addHeight);
    self.parse(val, right, indent + 2.5, theme);
}
  
JsonViewer.prototype.parse = function(dataObj, parent, indent, theme) {
    const self = this;
    this.forEach(dataObj, function (val, key) {
        const { left, right } = self.createItem(indent, theme, parent, key);
        if (typeof val !== 'object') {
            self.renderRight(theme, right, val);
        } else {
            self.renderChildren(theme, key, val, right, indent, left);
        }
    });
}

JsonViewer.prototype.createItem = function(indent, theme, parent, key) {
    let current = this.createElement('div');
    let left = this.createElement('div');
    let right = this.createElement('div');

    current.style.marginLeft = indent * 2 + 'px';
    left.innerHTML = `${key}<span class="jv-${theme}-symbol">&nbsp;:&nbsp;</span>`;
    current.appendChild(left);
    current.appendChild(right);
    parent.appendChild(current);
    current.setAttribute('class', theme + 'current');
    left.setAttribute('class', theme + 'left');
    return {
        left,
        right,
        current,
    };
}

JsonViewer.prototype.render = function () {
    let data = this.options.data;
    let theme = 'jv-' + this.options.theme + '-';
    let indent = 2.5;
    let parent = this.options.container;
    let key = 'object';
    let dataObj;
    
    parent.setAttribute('class', theme + 'con');
    try {
        dataObj = JSON.parse(data);
    } catch (error) {
        throw new Error('It is not a json format');
    }
    if (isArray(dataObj)) {
        key = 'array';
    }
    const { left, right } = this.createItem(indent, theme, parent, key);
    this.renderChildren(theme, key, dataObj, right, indent, left);
}

JsonViewer.prototype.toggleItem = function (ele, target) {
    ele.classList.toggle('add-height');
    target.classList.toggle('rotate90');
}

JsonViewer.prototype.createElement = function (type) {
    return document.createElement(type);
}

JsonViewer.prototype.forEach = function (obj, fn) {
    if (isUndefined(obj) || isNull(obj)) {
        return;
    }
    if (typeof obj === 'object' && isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn.call(null, obj[key] || 'null', key, obj);
            }
        }
    }
}

module.exports = JsonViewer;

























