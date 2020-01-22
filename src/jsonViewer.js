


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
    };
    this.options = Object.assign(defaults, options);
    if (isNull(options.container)) {
        throw new Error('Container: dom element is required');
    }
    this.render();
}

JsonViewer.prototype.render = function () {
    let data = this.options.data;
    let self = this;
    let theme = 'jv-' + this.options.theme + '-';
    let indent = 0;
    let parent = this.options.container;
    parent.setAttribute('class', theme + 'con');
    let dataObj;
    try {
        dataObj = JSON.parse(data);
    } catch (error) {
        throw new Error('It is not a json format');
    }
    
    if (!isArray(dataObj)) {
        dataObj = [dataObj];
    }
    function parse(arr, parent, indent) {
        self.forEach(arr, function (obj) {
            self.forEach(obj, function (val, key) {
                let current = self.createElement('div');
                let left = self.createElement('div');
                let right = self.createElement('div');

                current.style.marginLeft = indent * 2 + 'px';
                left.innerHTML = key + '<span class="jv-'+theme+'-symbol">&nbsp;:&nbsp;</span>';
                current.appendChild(left);
                current.appendChild(right);
                parent.appendChild(current);
                current.setAttribute('class', theme + 'current');
                left.setAttribute('class', theme + 'left');

                if (typeof val !== 'object') {
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
                if (isObject(val) || isArray(val)) {
                    let folder = self.createElement('span');
                    folder.setAttribute('class', theme + 'folder');
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
                    right.setAttribute('class', theme + 'rightObj');
                    parse([val], right, indent + 5);
                }
            });
        });
    }
    parse(dataObj, parent, indent);
}

JsonViewer.prototype.toggleItem = function (ele, target) {
    ele.classList.toggle('add-height');
    target.classList.toggle('rotate90');
}

JsonViewer.prototype.addStyles = function (ele, style) {
    this.forEach(style, function (val, key) {
        ele.style[key] = val;
    });
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

























