## Node

```js
class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = [];
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }

  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if (index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }

  getAdjacents() {
    return this.adjacents;
  }

  isAdjacent(node) {
    return this.adjacents.indexOf(node) > -1;
  }
}
```

## Graph

```js
class Graph {
  constructor(edgeDirection = Graph.DIRECTED) {
    this.nodes = new Map();
    this.edgeDirection = edgeDirection;
  }

  addVertex(value) {
    if (this.nodes.has(value)) {
      return this.nodes.get(value);
    } else {
      const vertex = new Node(value);
      this.nodes.set(value, vertex);
      return vertex;
    }
  }

  removeVertex(value) {
    const current = this.nodes.get(value);
    if (current) {
      for (const node of this.nodes.values()) {
        node.removeAdjacent(current);
      }
    }
    return this.nodes.delete(value);
  }

  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode.addAdjacent(destinationNode);

    // if graph is bi-directional, both nodes are adjacents of each other
    if (this.edgeDirection === Graph.UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode);
    }
    return [sourceNode, destinationNode];
  }

  removeEdge(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);

      if (this.edgeDirection === Graph.UNDIRECTED) {
        destinationNode.removeAdjacent(sourceNode);
      }
    }
    return [sourceNode, destinationNode];
  }
}

Graph.UNDIRECTED = Symbol("directed graph"); // two-ways edges
Graph.DIRECTED = Symbol("undirected graph"); // one-way edges
```

## Queue

```js
class Queue {
  constructor() {
    this.elements = [];
  }

  enqueue(value) {
    this.elements.push(value);
  }

  dequeue(value) {
    return this.elements.shift();
  }

  peek() {
    return this.elements[this.elements.length - 1];
  }

  size() {
    return this.elements.length;
  }

  isEmpty() {
    return this.elements.length === 0 ? true : false;
  }
  clear() {
    this.items = [];
  }
}
```

## Stack

```js
class Stack {
  constructor() {
    this.elements = [];
  }

  add(value) {
    this.elements.push(value);
  }
  pop() {
    return this.elements.pop();
  }
  size() {
    return this.elements.length;
  }
  isEmpty() {
    return this.elements.length === 0 ? true : false;
  }
  clear() {
    this.items = [];
  }
}
```

## Breadth-First Search

```js
function* bfs(first) {
  const visited = new Map();
  const visitList = new Queue();

  visitList.queue(first);

  while (!visitList.isEmpty()) {
    const node = visitList.dequeue();

    if (node && !visited.has(node)) {
      yield node;
      visited.set(node);
      node.getAdjacents().forEach((node) => visitList.queue(node));
    }
  }
}
```

## Depth-First Search

```js
function* dfs(first) {
  const visited = new Map();
  const visitList = new Stack();

  visitList.add(first);

  while (!visitList.isEmpty()) {
    const node = visitList.pop();

    if (node && !visited.has(node)) {
      yield node;
      visited.set(node);
      node.getAdjacents().forEach((node) => visitList.add(node));
    }
  }
}
```
