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
