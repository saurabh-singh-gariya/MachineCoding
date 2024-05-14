import { v4 as uuidv4 } from "uuid";

const useTraverseTree = () => {
  const insertNode = (id, name, isFolder, node) => {
    if (id === node.id) {
      node.items.unshift({
        id: uuidv4(),
        name,
        isFolder,
        items: [],
      });
      return node;
    }
    let tempItems = node.items.map((item) =>
      insertNode(id, name, isFolder, item)
    );
    node.items = tempItems;
    return { ...node, items: tempItems };
  };
  const deleteNode = (id, node) => {
    if (!node) return null;
    if (id === node.id) return null;

    const newItems = node.items
      .map((childNode) => deleteNode(id, childNode))
      .filter(Boolean);

    return { ...node, items: newItems };
  };
  return { insertNode, deleteNode };
};

export default useTraverseTree;
