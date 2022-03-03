const LEFT = 0;
const RIGHT = 1;

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
    this.parent = null;
    this.branch = null;
    this.level = 0;
    this.balanceFactor = 0;
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

  updateBalanceFactor(node, branch, tranverseTree) {
    let parentNode;
    let parentBranch;
    switch (branch) {
      case LEFT:
        node.balanceFactor++;
        break;
      case RIGHT:
        node.balanceFactor--;
        break;
    }
    // if a node is added to a parent with child, no need to traverse up the tree
    // as tree height remains the same
    if (tranverseTree) {
      parentNode = node.parent;
      parentBranch = node.branch;
      if (parentNode) this.updateBalanceFactor(parentNode, parentBranch, true);
    }
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.size++;
      this.root = newNode;
      return newNode;
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

    // if parentNode initially has no children, to update balance factor up the tree to root
    if (newNode.parent.descendantsCount === 1) {
      this.updateBalanceFactor(newNode.parent, newNode.branch, true);
    } else {
      // update balanceFactor for parentNode only since it does not add new level
      this.updateBalanceFactor(newNode.parent, newNode.branch, false);
    }

    return newNode;
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

    return nodeToDelete;
  }
}

class AVLTree extends BinarySearchTree {
  rotateLeft(unbalancedNode) {
    let rightSubTree;
    let leftDescendant;

    rightSubTree = unbalancedNode.right;

    // remove right subtree from unbalancedNode
    unbalancedNode.descendants[1] = undefined;

    // If right subtree has left subtree, assign it as right subtree of unbalancedNode
    if (rightSubTree.left) {
      // remove leftDescendant from left subtree
      leftDescendant = rightSubTree.left;
      rightSubTree.descendants[0] = undefined;

      // add leftDescendant to right subtree of unbalanced node
      unbalancedNode.right = leftDescendant;

      // update balanceFactor
      rightSubTree.balanceFactor--;
      unbalancedNode.balanceFactor--;
    }

    // If unbalanced node is root, assign right subtree as root
    if (!unbalancedNode.parent) {
      this.root = rightSubTree;
      rightSubTree.parent = null;
      unbalancedNode.parent = rightSubTree;
    } else {
      // swap unbalancedNode position from its parent with right subtree
      if (unbalancedNode.branch === LEFT) {
        unbalancedNode.parent.left = rightSubTree;
      } else {
        unbalancedNode.parent.right = rightSubTree;
      }
    }
    // Finally, make unbalancedNode as left subtree of rightSubTree
    rightSubTree.left = unbalancedNode;
    rightSubTree.balanceFactor++;
  }

  insert(value) {
    const newNode = super.insert(value);
    let rotationType = newNode.branch?.toString();

    // Get node's grandparent and check if balancing is needed
    // if newNode is root or balanced, to skip
    const grandparent = newNode.parent?.parent;
    if (
      grandparent &&
      (grandparent.balanceFactor > 1 || grandparent.balanceFactor < -1)
    ) {
      rotationType = `${newNode.parent.branch.toString()}${rotationType}`;
      switch (rotationType) {
        case "00":
          // LEFT LEFT
          break;
        case "01":
          // LEFT RIGHT
          break;
        case "10":
          // RIGHT LEFT
          break;
        case "11":
          // RIGHT RIGHT
          this.rotateLeft(grandparent);
          break;
      }
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
    )} with balance factor of ${
      treeNode.balanceFactor
    } contains: ${children.join(" and ")}`
  );

  printTree(tree, treeNode.left);
  printTree(tree, treeNode.right);
};

const x = new AVLTree();
[10, 15, 17].forEach((value) => x.insert(value));
printTree(x, x.root);
