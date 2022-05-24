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

const dfs = (rootNode) => {
  let nodeCount = 0;
  let leafCount = 0;
  const printedMsgs = [];
  const visitedlevels = [];
  const visited = new Map();
  const visitList = new Stack();

  // level property added to correctly determine height
  // height won't increase if level has been visited
  rootNode.level = 0;
  visitList.add(rootNode);

  while (!visitList.isEmpty()) {
    const node = visitList.pop();

    if (node && !visited.has(node)) {
      // increase height if level has not been visited
      if (!searchDAC(node.level, visitedlevels)) {
        visitedlevels.push(node.level);
      }

      let left;
      let right;
      const description = [];

      if (node.isNode()) {
        // push right to stack first in order to visit left subtree first
        if (node.right) {
          node.right.level = node.level + 1;
          visitList.add(node.right);
          right = node.right.isNode()
            ? `right NODE (${node.right.key})`
            : `right LEAF (${node.right.key})`;
        }

        if (node.left) {
          node.left.level = node.level + 1;
          visitList.add(node.left);
          left = node.left.isNode()
            ? `left NODE (${node.left.key})`
            : `left LEAF (${node.left.key})`;
        }

        nodeCount++;
        description.push(left, right);

        printedMsgs.push(
          `Parent node ${node.key} at level ${node.level} with BF of ${
            node.balanceFactor
          }: ${description.filter((item) => item).join(", ")}`
        );
      } else {
        leafCount++;
      }

      visited.set(node);
    }
  }

  // Deduct by 1 to exclude root node
  const treeHeight = visitedlevels.length - 1;

  console.log(`---AVL Components---`);
  console.log(`Root: ${rootNode.key}`);
  console.log(`NodeCount: ${nodeCount}`);
  console.log(`LeafCount: ${leafCount}`);
  console.log(`Height: ${treeHeight}`);
  printedMsgs.forEach((msg) => console.log(msg));
};

const maxDepth = (node) => {
  // handler takes in nodes that are not ROOT
  if (!node) {
    // returns 0 and not -1
    return 0;
  }
  const leftDepth = maxDepth(node.left);
  const rightDepth = maxDepth(node.right);

  if (leftDepth < rightDepth) {
    return rightDepth + 1;
  } else {
    return leftDepth + 1;
  }
};

const searchDAC = (key, valuesArr) => {
  // valuesArr must be sorted first and contain primitive types only
  const length = valuesArr.length;
  let filteredArr = valuesArr;
  let start = 0;
  let middle;
  let end = length - 1;

  if (length === 0) return false;

  // each time divide the array by half
  while (start < end) {
    middle = Math.ceil((start + end) / 2);

    if (key === filteredArr[middle]) {
      start = middle;
      break;
    }

    if (key < filteredArr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  if (valuesArr[start] === key) {
    return true;
  } else {
    return false;
  }
};

exports.dfs = dfs;
exports.maxDepth = maxDepth;
