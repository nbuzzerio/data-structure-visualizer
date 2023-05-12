export function generateRandomTree(childKey: string, leafKey: string) {
  leafKey = leafKey ? leafKey : "value";
  let size = 20 + Math.floor(Math.random() * 50);
  const addNode = createAddNode(size);

  const tree = addNode(childKey, leafKey);

  return tree;
}

function createAddNode(size: number) {
  return function addNode(childKey: string, leafKey: string) {
    const node: any = {};
    node[leafKey] = Math.floor(Math.random() * 100);
    node[childKey] = [];

    if (size === 0) return node;

    const children = Math.floor(Math.random() * Math.min(4, size));
    size -= children;

    for (let i = 0; i < children; i++) {
      node[childKey].push(addNode(childKey, leafKey));
    }

    return node;
  };
}
