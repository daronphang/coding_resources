const BST = require("./bst.js");
const { dfs, maxDepth } = require("./helpers.js");

class AVL extends BST {
  checkAndUpdateBF(node, operation) {
    // handler to traverse up/down the tree and update balance factor
    // argument will be newly inserted/deleted node
    let parentNode = node.parent;
    let currentNode = node;
    let unbalancedNode;
    let traversePath = [];

    const updateBf = (bfNode, operation, branch) => {
      switch (operation) {
        case "INSERT":
          if (branch === "LEFT") {
            bfNode.balanceFactor++;
          } else {
            bfNode.balanceFactor--;
          }
          break;
        case "DELETE":
          if (branch === "LEFT") {
            bfNode.balanceFactor--;
          } else {
            bfNode.balanceFactor++;
          }
          break;
      }
    };

    // Updating balanceFactor of ancestors
    while (true) {
      if (!parentNode) {
        // for DELETE operation if deletedNode is root
        parentNode = currentNode;
      } else {
        let branch;
        if (currentNode.key < parentNode.key) {
          branch = "LEFT";
        } else {
          branch = "RIGHT";
        }
        // starting from inserted/deleted node, to add path
        traversePath.unshift(branch);
        if (traversePath.length > 1) {
          // update BF when there are two or more traversals
          updateBf(parentNode, operation, branch);
        }
      }

      if (operation === "INSERT") {
        if (parentNode.balanceFactor === 0) {
          // if BF of parent node is 0, dont need to update further
          // as added node did not increase level
          break;
        }

        if (parentNode.balanceFactor > 1 || parentNode.balanceFactor < -1) {
          // update grandparent BF as it will be affected during rotation
          // unbalancedNode will have +1 node that is not accounted for
          // during breaking off of pivot node, to ensure BF is accounted
          if (parentNode.parent) {
            if (parentNode.key < parentNode.parent.key) {
              updateBf(parentNode.parent, operation, "LEFT");
            } else {
              updateBf(parentNode.parent, operation, "RIGHT");
            }
          }
          // stop updating and perform rotation
          unbalancedNode = parentNode;
          break;
        }
      } else {
        // DELETE operation
        if ([-1, 1].includes(parentNode.balanceFactor)) {
          // if BF of parent node is -1 or 1, height still stays the same
          // as deleted node did not reduce level
          break;
        }

        if (parentNode.balanceFactor > 1 || parentNode.balanceFactor < -1) {
          // parentNode is unbalanced
          // need to traverse down to check which rotation is required
          let secondBranch;
          traversePath = [];

          if (parentNode.balanceFactor < -1) {
            traversePath.push("RIGHT");
            secondBranch = parentNode.right.left ? "LEFT" : "RIGHT";
          } else {
            traversePath.push("LEFT");
            secondBranch = parentNode.left.right ? "RIGHT" : "LEFT";
          }

          traversePath.push(secondBranch);
          unbalancedNode = parentNode;
          break;
        }
      }

      currentNode = parentNode;
      parentNode = parentNode.parent;

      // Reached root and no balancing required
      if (!parentNode) break;
    }
    return [unbalancedNode, traversePath];
  }

  rotate(pivot, direction) {
    const oppDir = direction === "left" ? "right" : "left";
    // subNode is child that comes from path of inserted node
    const subNode = pivot[oppDir];
    const pivotChild = subNode[direction];
    const pivotParent = pivot.parent;

    // reset subNode parent
    subNode.parent = null;

    // first, update pivot parent/root
    if (!pivotParent) {
      this.root = subNode;
    } else {
      // delete pivot from parent first to update BF
      pivotParent.deleteChild(pivot);
    }

    // Remove subNode from pivot
    pivot.deleteChild(subNode);

    // remove pivotChild and attach to pivot
    if (pivotChild) {
      subNode.deleteChild(pivotChild);
      pivot.setChild(pivotChild);
    }
    // Add pivot as right child of subNode
    subNode.setChild(pivot);

    // finally, add to pivot parent if not root
    if (pivotParent) {
      // attach subNode to parent
      pivotParent.setChild(subNode);
    }
  }

  rotateHandler(unbalancedNode, path) {
    const rotationType = `${path[0]}-${path[1]}`;

    if (unbalancedNode) {
      switch (rotationType) {
        case "LEFT-LEFT":
          this.rotate(unbalancedNode, "right");
          break;
        case "RIGHT-RIGHT":
          this.rotate(unbalancedNode, "left");
          break;
        case "LEFT-RIGHT":
          this.rotate(unbalancedNode.left, "left");
          this.rotate(unbalancedNode, "right");
          break;
        case "RIGHT-LEFT":
          this.rotate(unbalancedNode.right, "right");
          this.rotate(unbalancedNode, "left");
          break;
      }
    }
  }

  insert(key) {
    const newNode = super.insert(key);
    // if root or parentNode is full i.e. initially with child, do nothing
    if (!newNode.parent || newNode.parent.isFilled()) {
      return;
    }
    const [unbalancedNode, path] = this.checkAndUpdateBF(newNode, "INSERT");
    this.rotateHandler(unbalancedNode, path);
  }

  delete(key) {
    const deletedNode = super.delete(key);
    let bfNode;
    if (!deletedNode.parent) {
      // deletedNode is root
      // update balance factor first
      const leftHeight = maxDepth(this.root.left);
      const rightHeight = maxDepth(this.root.right);
      const bf = leftHeight - rightHeight;
      this.root.balanceFactor = bf;
      bfNode = this.root;
    } else {
      bfNode = deletedNode;
    }
    const [unbalancedNode, path] = this.checkAndUpdateBF(bfNode, "DELETE");

    this.rotateHandler(unbalancedNode, path);
  }
}

const x = new AVL();
[12, 15, 20, 18, 25, 30, 28, 35, 32, 38, 40, 34].forEach((value) =>
  x.insert(value)
);
[34, 40, 32].forEach((item) => x.delete(item));
dfs(x.root, true, null, true);

// 12, 15, 20, 18, 25, 30, 28, 35, 32, 38, 40, 45
