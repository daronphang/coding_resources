const { dfs, maxDepth } = require("./helpers");

class TreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.balanceFactor = 0;
    this.parent = null;
  }

  isNode() {
    if (this.left || this.right) {
      return true;
    }
    return false;
  }

  isFilled() {
    if (this.left && this.right) return true;
    return false;
  }

  getCount() {
    if (this.left && this.right) {
      return 2;
    } else if (this.left || this.right) {
      return 1;
    } else {
      return 0;
    }
  }

  getChild() {
    if (this.left) return this.left;
    return this.right;
  }

  // Both setChild and deleteChild are for primitive nodes
  // i.e. not a subtree
  setChild(node) {
    node.parent = this;
    const branch = node.key < this.key ? "LEFT" : "RIGHT";

    switch (branch) {
      case "LEFT":
        this.left = node;
        this.balanceFactor += maxDepth(node);
        break;
      case "RIGHT":
        this.right = node;
        this.balanceFactor -= maxDepth(node);
        break;
    }
  }

  deleteChild(node) {
    let deletedChild;
    const branch = node.key < this.key ? "LEFT" : "RIGHT";

    switch (branch) {
      case "LEFT":
        deletedChild = this.left;
        this.balanceFactor -= maxDepth(node);
        this.left = null;
        break;
      case "RIGHT":
        deletedChild = this.right;
        this.balanceFactor += maxDepth(node);
        this.right = null;
        break;
    }
    deletedChild.parent = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  findNode = (key) => {
    // start from root
    let currentNode = this.root;
    let foundNode;

    while (true) {
      if (!currentNode) break;

      if (currentNode.key === key) {
        foundNode = currentNode;
        break;
      }

      if (key < currentNode.key) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return foundNode;
  };

  insert(key) {
    const newNode = new TreeNode(key);
    if (!this.root) {
      this.size++;
      this.root = newNode;
      newNode.isRoot = true;
      return newNode;
    }
    let currentNode = this.root;

    // Logic here tranverses down the tree, starting from root
    // if node does not have child at position, to add

    const insertLeaf = (branch) => {
      // If parentNode's left/right does not exist, to add
      if (!currentNode[branch]) {
        this.size++;
        currentNode.setChild(newNode);
        return;
      }
      currentNode = currentNode[branch];
    };

    while (true) {
      // No duplicates are allowed
      if (key === currentNode.key) {
        break;
      }
      // add to LEFT if value < currentNode, else RIGHT
      const branch = key < currentNode.key ? "left" : "right";
      insertLeaf(branch);
    }
    return newNode;
  }

  delete(key) {
    const nodeToDelete = this.findNode(key);

    if (!nodeToDelete) {
      throw new Error(`key ${key} does not exist in BST!`);
    }

    this.size--;
    let isRoot = false;
    // shallow copy as nodeToDelete will be modified directly
    const deletedNode = { ...nodeToDelete };
    const parent = nodeToDelete.parent;

    if (this.root.key === nodeToDelete.key) isRoot = true;

    if (!nodeToDelete.isNode()) {
      // if it is a leaf, just delete
      if (isRoot) {
        this.root = null;
      } else {
        parent.deleteChild(nodeToDelete);
      }
    } else {
      // nodeToDelete is a node
      // if node has one child, to bubble it up
      if (nodeToDelete.getCount() === 1) {
        const child = nodeToDelete.getChild();
        // check if it's root
        if (isRoot) {
          this.root = child;
          child.parent = null;
        } else {
          // delete node first from parent
          parent.deleteChild(nodeToDelete);
          // set child as new child of parent
          parent.setChild(child);
        }
      } else {
        // node has two children
        // find "left-most" or smallest node occurring in right sub-tree and bubble up
        let leftMostNode = nodeToDelete.right;
        let leftMostNodeParent;
        let leftMostNodeRightTree;

        while (true) {
          if (!leftMostNode.left) {
            leftMostNodeParent = leftMostNode.parent;
            leftMostNodeRightTree = leftMostNode.right;
            break;
          }
          leftMostNode = leftMostNode.left;
        }

        // swap keys directly
        nodeToDelete.key = leftMostNode.key;

        // delete leftMostNode from parent node
        leftMostNodeParent.deleteChild(leftMostNode);

        // if smallest node has right subtree, to update its parent
        if (leftMostNodeRightTree) {
          leftMostNodeParent.setChild(leftMostNodeRightTree);
        }
      }
    }
    // if node has children, nodeToDelete will be replaced with new key
    return deletedNode;
  }
}

module.exports = BST;
