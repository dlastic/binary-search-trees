import { Tree, prettyPrint } from "./binarySearchTree.js";

function getRandomArray(size, max = 100) {
  const arr = [];
  while (arr.length < size) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

function printTraversal(label, traversalFn) {
  const result = [];
  traversalFn((node) => result.push(node.data));
  console.log(`${label}:`, result.join(" "));
}

const randomArray = getRandomArray(10);
const tree = new Tree(randomArray);

console.log("Initial tree:");
prettyPrint(tree.root);
console.log("Is balanced?", tree.isBalanced());

printTraversal("\nLevel order", tree.levelOrderForEach.bind(tree));
printTraversal("Pre order", tree.preOrderForEach.bind(tree));
printTraversal("Post order", tree.postOrderForEach.bind(tree));
printTraversal("In order", tree.inOrderForEach.bind(tree));

// Unbalance by adding large values
[101, 102, 103, 104, 105].forEach((n) => tree.insert(n));

console.log("\nAfter inserting large values:");
prettyPrint(tree.root);
console.log("Is balanced?", tree.isBalanced());

// Rebalance the tree
tree.rebalance();

console.log("\nAfter rebalancing:");
prettyPrint(tree.root);
console.log("Is balanced?", tree.isBalanced());

printTraversal("\nLevel order", tree.levelOrderForEach.bind(tree));
printTraversal("Pre order", tree.preOrderForEach.bind(tree));
printTraversal("Post order", tree.postOrderForEach.bind(tree));
printTraversal("In order", tree.inOrderForEach.bind(tree));
