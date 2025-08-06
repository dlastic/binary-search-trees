class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = createBalancedBST(array);
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    function insertRecursively(node) {
      if (value < node.data) {
        if (node.left === null) {
          node.left = new Node(value);
        } else {
          insertRecursively(node.left);
        }
      } else if (value > node.data) {
        if (node.right === null) {
          node.right = new Node(value);
        } else {
          insertRecursively(node.right);
        }
      }
    }

    insertRecursively(this.root);
  }

  deleteItem(value) {
    function findMin(node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node;
    }

    function deleteRecursively(node, value) {
      if (node === null) {
        return node;
      }

      if (value < node.data) {
        node.left = deleteRecursively(node.left, value);
      } else if (value > node.data) {
        node.right = deleteRecursively(node.right, value);
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }

        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const succ = findMin(node.right);
        node.data = succ.data;
        node.right = deleteRecursively(node.right, succ.data);
      }
      return node;
    }

    this.root = deleteRecursively(this.root, value);
  }

  find(value) {
    function findRecursively(node) {
      if (node === null) return null;

      if (node.data === value) return node;
      if (value < node.data) return findRecursively(node.left);
      if (value > node.data) return findRecursively(node.right);
    }

    return findRecursively(this.root);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback required!");
    const queue = [];
    if (this.root !== null) queue.push(this.root);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback required!");

    function traverse(node) {
      if (node === null) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback required!");

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback required!");

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }

    traverse(this.root);
  }

  height(value) {
    const node = this.find(value);
    if (node === null) return null;

    function heightRecursively(node) {
      if (node === null) return -1;
      return (
        1 +
        Math.max(heightRecursively(node.left), heightRecursively(node.right))
      );
    }

    return heightRecursively(node);
  }

  depth(value) {
    function findDepth(node, depth = 0) {
      if (node === null) return null;
      if (node.data === value) return depth;

      if (value < node.data) {
        return findDepth(node.left, depth + 1);
      } else {
        return findDepth(node.right, depth + 1);
      }
    }

    return findDepth(this.root);
  }

  isBalanced() {
    function height(node) {
      if (node === null) return -1;
      return 1 + Math.max(height(node.left), height(node.right));
    }

    function check(node) {
      if (node === null) return true;

      const leftHeight = height(node.left);
      const rightHeight = height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) return false;

      return check(node.left) && check(node.right);
    }

    return check(this.root);
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));
    this.root = buildTree(values);
  }
}

function buildTree(array) {
  if (array.length === 0) return null;

  const mid = Math.floor(array.length / 2);
  const root = new Node(array[mid]);
  root.left = buildTree(array.slice(0, mid));
  root.right = buildTree(array.slice(mid + 1));
  return root;
}

function createBalancedBST(array) {
  const sortedArray = [...new Set(array.sort((a, b) => a - b))];
  return buildTree(sortedArray);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([8, 4, 12, 6, 10, 14, 5, 7]);
prettyPrint(tree.root);
