class Node {
  constructor(id, pos) {
    // drawing
    this.id = id;
    this.pos = pos

    // dragging
    this.dragPos = null;
    this.clientPos = null;

    // dijkstras
    this.neighbours = new Map();
    this.visited = false;
    this.throughNode = null;
    this.shortestDistance = null;
  }

  toString() { return this.id; }

  addDirectionalNeighbour(node, distance) {
    this.neighbours.set(node, distance);
  }

  addNeighbour(node, distance) {
    this.addDirectionalNeighbour(node, distance);
    node.addDirectionalNeighbour(this, distance);
  }

  distanceTo(node) {
    return this.neighbours.get(node);
  }

  *traverseBack() {
    let temp = this;
    while (temp) {
      yield temp;
      temp = temp.throughNode;
    }
    return;
  }
}

export default Node;

/*
const nodes = [];
["A", "B", "C", "D", "E", "F"].forEach(id => nodes.push(new Node(id)));
nodes[0].addNeighbour(nodes[1], 4);
nodes[0].addNeighbour(nodes[2], 3);
nodes[0].addNeighbour(nodes[3], 3);
nodes[0].addNeighbour(nodes[4], 1);
nodes[1].addNeighbour(nodes[2], 4);
nodes[1].addNeighbour(nodes[4], 2);
nodes[1].addNeighbour(nodes[5], 6);
nodes[2].addNeighbour(nodes[4], 1);
nodes[3].addNeighbour(nodes[5], 1);

const startingNode = nodes[0];
startingNode.shortestDistance = 0;
startingNode.visited = true;

let currentNode = startingNode;

while(true) {
  let nextNode = null;
  nodes.forEach(node => {
    if(node.visited) return;
    
    let currentDistance = currentNode.distanceTo(node);
    if(currentDistance !== undefined) {
      let newDistance = currentDistance + currentNode.shortestDistance;
      if(node.shortestDistance === null || newDistance < node.shortestDistance) {
        node.shortestDistance = newDistance;
        node.throughNode = currentNode;
      }
    }
    
    if(node.shortestDistance && (nextNode === null || node.shortestDistance < nextNode.shortestDistance)) {
      nextNode = node;
    }
  });
  if(nextNode === null) break;
  
  nextNode.visited = true;
  currentNode = nextNode;
}

console.log(nodes);*/