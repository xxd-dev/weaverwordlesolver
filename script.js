const words = getWords();
var graph;

var inputs = [[], []];
var index = 0;
var result = [];

window.onload = function(){
    draw();
    graph = buildGraph();
    var space = 32;
    var backspace = 8;
    var up = 38;
    var down = 40;
    var enter = 13;
    var a = 65;
    var z = 90;

    window.onkeydown= function(gfg){
        let key = gfg.keyCode;
        if (key >= a && key <= z) {
            if (inputs[index].length >= 4){
                if (index == 0) {
                    index = 1;
                } else {
                    return;
                }
            }
            inputs[index].push(String.fromCharCode(97 + key - 65))
        }

        if (key == backspace) {
            if (inputs[index].length == 0 && index == 1) {
                index = 0;
            }
            inputs[index].pop()
        }

        if (key == up) {
            if (index == 1) {
                index = 0;
            }
        }

        if (key == down || key == enter || key == space ) {
            if (index == 0) {
                index = 1;
            }
        }

        if (inputs[0].length == 4 && inputs[1].length == 4) {
            result = getConnection(inputs[0].join(''), inputs[1].join('')).map(node => node.word);
        } else {
            result = [];
        }
        draw()
    };
};

function draw() {
    document.getElementById('in').value = '';

    inputs[0][0] === undefined ? '':inputs[0][0]

    selected = ['', '', '', '']
    if (index == 0) {
        selected[Math.min(inputs[0].length, 3)] = 'selected';
    }

    let top = `
    <div class="row top-bottom">
        <div class="block ${selected[0]}">${inputs[0][0] === undefined ? ' ':inputs[0][0]}</div>
        <div class="block ${selected[1]}">${inputs[0][1] === undefined ? ' ':inputs[0][1]}</div>
        <div class="block ${selected[2]}">${inputs[0][2] === undefined ? ' ':inputs[0][2]}</div>
        <div class="block ${selected[3]}">${inputs[0][3] === undefined ? ' ':inputs[0][3]}</div>
    </div>
    `
    flag = "";
    if (result.length > 0) {
        flag = "given"
    }

    selected = ['', '', '', '']
    if (index == 1) {
        selected[Math.min(inputs[1].length, 3)] = 'selected';
    }

    let bottom = `
    <div class="row top-bottom">
        <div class="block ${selected[0]} ${flag}">${inputs[1][0] === undefined ? ' ':inputs[1][0]}</div>
        <div class="block ${selected[1]} ${flag}">${inputs[1][1] === undefined ? ' ':inputs[1][1]}</div>
        <div class="block ${selected[2]} ${flag}">${inputs[1][2] === undefined ? ' ':inputs[1][2]}</div>
        <div class="block ${selected[3]} ${flag}">${inputs[1][3] === undefined ? ' ':inputs[1][3]}</div>
    </div>
    `
    document.getElementById("solver").innerHTML = top + bottom;

    if (result.length <= 2) {
        return;
    }
    middle = "";
    for (let i=1; i< result.length;i++) {
        matching = []
        changed = []
        for (let j=0;j<4;j++) {
            matching.push(result[i][j] == inputs[1][j] ? 'matching':'')
            changed.push(result[i][j] != result[i-1][j] ? 'changed':'')
        }
        html = `
        <div class="row">
            <div class="block border ${matching[0]} ${changed[0]}">${result[i][0]}</div>
            <div class="block border ${matching[1]} ${changed[1]}">${result[i][1]}</div>
            <div class="block border ${matching[2]} ${changed[2]}">${result[i][2]}</div>
            <div class="block border ${matching[3]} ${changed[3]}">${result[i][3]}</div>
        </div>
        `
        middle += html;
    }

    document.getElementById("solver").innerHTML = top + middle + bottom;

}

class Node {
    constructor(word) {
        this.word = word;
        this.connected = [];
    }

    addConnected(node) {
        this.connected.push(node)
        return this;
    }
}

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    add(word1, word2) {
        const node1 = this.nodes.get(word1) || new Node(word1);
        const node2 = this.nodes.get(word2) || new Node(word2);
        this.nodes.set(word1, node1.addConnected(node2));
        this.nodes.set(word2, node2.addConnected(node1));
    }

    get(word) {
        return this.nodes.get(word);
    }
}

function buildGraph() {
    let g = new Graph();

    for (let word of words){
        for (let i = 0; i< 4; i++) {
            for (let l = 0; l < 26; l++) {
                let current = word.substring(0, i) + String.fromCharCode(97 + l) + word.substring(i + 1)
                if (words.has(current) && current !== word) {
                    g.add(word, current);
                }
            }
        }
    }
    return g;
}

function getConnection(from, to) {

    graph = buildGraph();

    let fromNode = graph.get(from);
    let toNode = graph.get(to);
    if (!fromNode || !toNode) {
        return [];
    }
    
    fromNode.path = [fromNode];
    toNode.path = [toNode];
    fromNode.visitedFrom = toNode.visitedTo = true;

    const fromQueue = [fromNode];
    const toQueue = [toNode];

    while (fromQueue.length || toQueue.length) {
        fromNode = fromQueue.shift() || new Node();
        toNode = toQueue.shift() || new Node();

        fromNode.connected.sort(sortConnected);
        for (let node of fromNode.connected) {
            if (node.visitedTo) {
                return fromNode.path.concat(node.path.reverse());
            } else if (!node.visitedFrom) {
                node.path = fromNode.path.concat(node);
                node.visitedFrom = true;
                fromQueue.push(node);
            }
        }

        toNode.connected.sort(sortConnected);
        for (let node of toNode.connected) {
            if (node.visitedFrom) {
                return node.path.concat(toNode.path.reverse());
            } else if (!node.visitedTo) {
                node.path = toNode.path.concat(node);
                node.visitedTo = true;
                toQueue.push(node);
            }
        }
    }
    return [];
}

function sortConnected(a, b) {
    if (a.path === undefined) {
        return -1;
    } else if (b.path == undefined) {
        return 1;
    } else {
        return a.path.length - b.path.length;
    }
}
