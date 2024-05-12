import { useState } from "react";
import "./App.css";
import FileExplorer from "./components/FileExplorer";
import explorer from "./data/fileJson";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode } = useTraverseTree();

  const handleAddFolder = (id, name, isFolder) => {
    const updatedData = insertNode(id, name, isFolder, explorerData);
    setExplorerData(updatedData);
  };

  const onDeleteClicked = (id) => {
    const updatedData = deleteNode(id, explorerData);
    setExplorerData(updatedData);
  };
  return explorerData ? (
    <FileExplorer
      explorerData={explorerData}
      handleAddFolder={handleAddFolder}
      onDeleteClicked={onDeleteClicked}
    />
  ) : (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <h2>No Data Available, Refresh the page</h2>
    </div>
  );
}

export default App;
