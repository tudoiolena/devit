function nodeChildCount(node, deep = Infinity) {
  let count = 0;

  function countNodes(currentNode, currentDeep) {
    if (currentDeep === deep) return;

    if (currentDeep < deep) {
      count += currentNode.childNodes.length;
      currentNode.childNodes.forEach((child) =>
        countNodes(child, currentDeep + 1)
      );
    }
  }

  countNodes(node, 0);
  return count;
}

const div = document.createElement("div");
const p = document.createElement("p");
const span = document.createElement("span");
p.appendChild(span);
div.appendChild(p);

nodeChildCount(div);
nodeChildCount(div, 1);
nodeChildCount(div, 2);
