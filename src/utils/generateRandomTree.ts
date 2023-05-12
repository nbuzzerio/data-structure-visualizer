export function generateRandomTree(childKey: string, leafKey: string) {
  leafKey = leafKey ? leafKey : "value";
  let size = 20 + Math.floor(Math.random() * 50);
  console.log('generateRandomTree: ', 'leafKey: ', leafKey, 'size: ', size)

  const tree = addNode(childKey, leafKey, size);

  return tree;
}

function addNode(childKey: string, leafKey: string, size: number) {
  console.log('NODE: ', size)
  const node: any = {};
  node[leafKey] = Math.floor(Math.random() * 100);
  node[childKey] = [];

  if (size === 0) return node;

  const children = Math.floor(Math.random() * Math.min(3, size));
  size-=(children);

  for (let i = 0; i < children; i++) {
    node[childKey].push(addNode(childKey, leafKey, size+i));
  }

  return node;
}
