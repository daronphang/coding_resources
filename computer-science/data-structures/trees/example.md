```js
const LEFT = 0;
const RIGHT = 1;

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
    this.parent = null;
    // Left/Right branch of the parent
    this.direction = null;
  }

  get left() {
    return this.descendants[LEFT];
  }

  set left(node) {
    node.parent = this;
    node.direction = LEFT;
    this.descendants[LEFT] = node;
  }

  get right() {
    return this.descendants[RIGHT];
  }

  set right(node) {
    node.parent = this;
    node.direction = RIGHT;
    this.descendants[RIGHT] = node;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  printTree() {
    console.log(
      `This binary search value tree has root with value ${this.root.value} and size of ${this.size}.`
    );

    if (this.root.descendants.length === 0) {
      return console.log(`Root has no descendants.`);
    }
    if (this.root.left) {
      console.log(`Left subtree structure is as follows:`);
      printNode(this.root.left, "left");
    } else {
      console.log(`This tree has no subtree on the left.`);
    }
    if (this.root.right) {
      console.log(`Right subtree structure is as follows:`);
      printNode(this.root.right, "right");
    } else {
      console.log(`This tree has no subtree on the right.`);
    }
  }

  insert(value) {
    const node = new TreeNode(value);
    this.size++;

    // If there is no root, set as root
    if (!this.root) {
      this.root = node;
    } else {
      insertNode(node, this.root);
    }
  }

  delete(value) {
    const nodeToDelete = findNode(value, this.root, null);
    const direction = nodeToDelete.direction;

    // If it is a leaf, just delete
    if (nodeToDelete.descendants.length === 0) {
      nodeToDelete.parent.descendants[direction] = undefined;
    }
    // Node is root/parent
    // If node has only one descendant, bubble up the remaining subtree
    else if (nodeToDelete.descendants.filter((node) => !node).length === 1) {
      const descendant = nodeToDelete.left || nodeToDelete.right;
      // update descendant's parent
      descendant.parent = nodeToDelete.parent;
      nodeToDelete.parent.descendants[direction] = descendant;
    }
  }
}

const printNode = (node, direction) => {
  // If node has no descendants, it is a leaf
  if (node.descendants.length === 0) {
    return console.log(
      `Parent node ${node.parent.value} has ${direction} leaf with value of ${
        node.value
      } (level ${getNodeLevel(node.parent, 0)}).`
    );
  }
  // Node is not a leaf
  console.log(
    `Parent node ${node.value} (level ${getNodeLevel(
      node.parent,
      0
    )}) has descendants of [${node.left?.value}, ${
      node.right?.value
    }] (left,right) respectively.`
  );
  if (node.left) {
    printNode(node.left, "left");
  }
  if (node.right) {
    printNode(node.right, "right");
  }
};

const insertNode = (node, parentNode) => {
  // if value is less than parent's value, add to LEFT
  if (node.value < parentNode.value) {
    // Check if parent has descendants/is a leaf
    if (!parentNode.left) {
      parentNode.left = node;
      return;
    }
    // else call recursively
    insertNode(node, parentNode.left);
  } else {
    // value is greater than parent's value, add to RIGHT
    if (!parentNode.right) {
      parentNode.right = node;
      return;
    }
    insertNode(node, parentNode.right);
  }
};

const findNode = (value, currentNode) => {
  if (currentNode.value === value) {
    return currentNode;
  }
  // if currentNode has no descendants, throw error as value does not exist in tree
  if (currentNode.descendants.length === 0) {
    throw new Error(`Value ${value} does not exist in binary search tree!`);
  }

  // Call recursively on LEFT of currentNode
  if (value < currentNode.value) {
    return findNode(value, currentNode.left, currentNode);
  }
  // Call recursively on RIGHT of currentNode
  if (value > currentNode.value) {
    return findNode(value, currentNode.right, currentNode);
  }
};

const getNodeLevel = (parentNode, level) => {
  if (!parentNode) {
    return level;
  }
  level++;
  return getNodeLevel(parentNode.parent, level);
};

const x = new BinarySearchTree();
x.insert(10);
x.insert(5);
x.insert(3);
x.insert(7);
x.insert(1);
x.insert(4);
x.printTree();
x.delete(4);
x.delete(3);
x.printTree();

```
