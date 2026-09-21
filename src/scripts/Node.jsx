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

  removeNeighbour(node) {
    this.neighbours.delete(node);
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

export function dijkstrasAlgorithm(nodes, startingNode) {

  nodes.forEach(node => {
    node.visited = false;
    node.shortestDistance = null;
    node.throughNode = null;
  });

  let currentNode = startingNode;
  currentNode.shortestDistance = 0;
  currentNode.visited = true;

  while (true) {
    let nextNode = null;
    nodes.forEach(node => {
      if (node.visited) return;

      let currentDistance = currentNode.distanceTo(node);
      if (currentDistance !== undefined) {
        let newDistance = currentDistance + currentNode.shortestDistance;
        if (node.shortestDistance === null || newDistance < node.shortestDistance) {
          node.shortestDistance = newDistance;
          node.throughNode = currentNode;
        }
      }

      if (node.shortestDistance && (nextNode === null || node.shortestDistance < nextNode.shortestDistance)) {
        nextNode = node;
      }
    });
    if (nextNode === null) break;

    nextNode.visited = true;
    currentNode = nextNode;
  }
}

export default Node;