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
    if (id === node.id) return null;

    let tempArray = [];
    for (let i = 0; i < node.items.length; i++) {
      const temp = deleteNode(id, node.items[i]);
      if (!temp) {
        return {...node, items: node.items.filter((item)=> item.id !== node.items[i].id)}
      }
      tempArray.push(temp);
    }
    return { ...node, items: tempArray };
  };
  return { insertNode, deleteNode };
};

export default useTraverseTree;
