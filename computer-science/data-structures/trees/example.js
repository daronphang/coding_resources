const LEFT = 0;
const RIGHT = 1;

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
    this.parent = null;
    this.branch = null;
  }

  get left() {
    return this.descendants[LEFT];
  }

  set left(node) {
    node.parent = this;
    node.branch = LEFT;
    this.descendants[LEFT] = node;
  }

  get right() {
    return this.descendants[RIGHT];
  }

  set right(node) {
    node.parent = this;
    node.branch = RIGHT;
    this.descendants[RIGHT] = node;
  }

  get descendantsCount() {
    const length = this.descendants.filter((node) => node).length;
    return length;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  findNode = (value, currentNode) => {
    if (!currentNode) {
      currentNode = this.root;
    }

    if (currentNode.value === value) {
      return currentNode;
    }
    // if currentNode has no descendants, value does not exist
    if (currentNode.descendants.length === 0) {
      return null;
    }

    // Call recursively on LEFT of currentNode
    if (value < currentNode.value) {
      return currentNode.left ? this.findNode(value, currentNode.left) : null;
    }
    // Call recursively on RIGHT of currentNode
    if (value > currentNode.value) {
      return currentNode.right ? this.findNode(value, currentNode.right) : null;
    }
  };

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.size++;
      this.root = newNode;
      return;
    }
    let currentNode = this.root;

    const insertLeaf = (parentNodeBranch, branch) => {
      // If parentNode's left/right does not exist, to add
      if (!parentNodeBranch) {
        this.size++;
        currentNode[branch] = newNode;
        return;
      }
      currentNode = parentNodeBranch;
    };

    while (true) {
      // No duplicates are allowed
      if (value === currentNode.value) {
        break;
      }
      if (value < currentNode.value) {
        // add to LEFT if value < currentNode
        insertLeaf(currentNode.left, "left");
      } else {
        // add to RIGHT if value > currentNode
        insertLeaf(currentNode.right, "right");
      }
    }
  }

  delete(value) {
    const nodeToDelete = this.findNode(value, this.root);
    if (!nodeToDelete) {
      throw new Error(
        `Value ${value} does not exist in BST! Unable to delete!`
      );
    }
    const branch = nodeToDelete.branch;
    this.size--;

    // If it is a leaf, just delete
    if (nodeToDelete.descendantsCount === 0) {
      nodeToDelete.parent.descendants[branch] = undefined;
    }
    // Node is root/parent
    // If node has only one descendant, bubble up the remaining subtree
    else if (nodeToDelete.descendantsCount === 1) {
      const descendant = nodeToDelete.left || nodeToDelete.right;
      // update descendant's parent
      descendant.parent = nodeToDelete.parent;
      nodeToDelete.parent.descendants[branch] = descendant;
    }

    // if node has two descendants, find "left-most" node occurring in right sub-tree
    else {
      let leftMostNode = nodeToDelete.right;
      while (leftMostNode.descendantsCount > 0) {
        leftMostNode = leftMostNode.left;
      }
      // First update leftMostNode properties and parent
      leftMostNode.parent.descendants[leftMostNode.branch] = undefined;
      leftMostNode.parent = nodeToDelete.parent;
      leftMostNode.descendants = nodeToDelete.descendants;
      nodeToDelete.parent.descendants[branch] = leftMostNode;
    }
  }
}

const getTreeNodeLevel = (node, level) => {
  if (!node.parent) {
    return level;
  }
  level++;
  return getTreeNodeLevel(node.parent, level);
};

const printTree = (tree, treeNode) => {
  // Terminate if node is a leaf
  if (!treeNode || treeNode.descendantsCount === 0) {
    return;
  }

  // If treeNode is root
  if (!treeNode.parent) {
    console.log(
      `BST's root is ${treeNode.value} and has size of ${tree.size}.`
    );
    if (treeNode.descendantsCount === 0) {
      console.log("Tree has no descendants.");
      return;
    }
  }

  const children = [];
  if (treeNode.left) {
    let value;
    // Check if child is leaf or node
    if (treeNode.left.descendantsCount === 0) {
      value = `${treeNode.left.value} (Left Leaf)`;
    } else {
      value = `${treeNode.left.value} (Left Node)`;
    }
    children.push(value);
  }

  if (treeNode.right) {
    let value;
    if (treeNode.right.descendantsCount === 0) {
      value = `${treeNode.right.value} (Right Leaf)`;
    } else {
      value = `${treeNode.right.value} (Right Node)`;
    }
    children.push(value);
  }
  console.log(
    `Parent node ${treeNode.value} at level ${getTreeNodeLevel(
      treeNode,
      0
    )} contains: ${children.join(" and ")}`
  );

  printTree(tree, treeNode.left);
  printTree(tree, treeNode.right);
};

const x = new BinarySearchTree();
x.insert(10);
x.insert(5);
x.insert(3);
x.insert(7);
x.insert(6);
x.insert(8);
x.insert(1);
x.insert(4);
x.insert(20);
x.insert(22);
printTree(x, x.root);
console.log();
x.delete(5);
printTree(x, x.root);
