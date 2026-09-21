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

export default Node;