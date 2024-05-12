/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import explorer from "../data/fileJson";

const FileExplorer = ({ explorerData, handleAddFolder, onDeleteClicked }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [inputFileName, setInputFileName] = useState({
    isVisible: false,
    isFolder: false,
  });
  const onAddClicked = (e, isFolder) => {
    e.stopPropagation();
    setInputFileName({
      isVisible: true,
      isFolder,
    });
  };

  const onEnterPressed = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleAddFolder(
        explorerData.id,
        e.target.value,
        inputFileName?.isFolder || false
      );
      setInputFileName({
        isVisible: false,
        isFolder: false,
      });
    }
  };
  if (explorerData.isFolder) {
    return (
      <div style={{ marginTop: "3px" }}>
        <div
          style={{
            padding: "2px 4px",
            cursor: "pointer",
            width: "400px",
            backgroundColor: "#eeeee4",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => setIsExpand((prevState) => !prevState)}
        >
          <span style={{ fontWeight: "500" }}>
            {"📂"} {explorerData?.name}
          </span>
          <span style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                marginLeft: "10px",
                marginRight: "2px",
                border: "1px black solid",
                padding: "0 4px",
                backgroundColor: "white",
              }}
              onClick={(e) => onAddClicked(e, false)}
            >
              + File
            </span>
            <span
              style={{
                border: "1px black solid",
                padding: "0 4px",
                backgroundColor: "white",
              }}
              onClick={(e) => onAddClicked(e, true)}
            >
              + Folder
            </span>
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: "900",
                padding: "0 4px",
              }}
              onClick={() => onDeleteClicked(explorerData.id)}
            >
              🗑
            </span>
          </span>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          {inputFileName?.isVisible && (
            <div style={{ marginTop: "3px" }}>
              <span>{inputFileName?.isFolder ? "📂" : "🗄"}</span>
              <input placeholder="name" onKeyDown={onEnterPressed} />
            </div>
          )}
          {isExpand &&
            explorerData?.items?.map((item) => {
              console.log(item);
              return (
                <FileExplorer
                  key={item.name}
                  explorerData={item}
                  handleAddFolder={handleAddFolder}
                  onDeleteClicked={onDeleteClicked}
                />
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          padding: "2px 4px",
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        {"🗄"} {explorerData?.name}
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: "900",
            padding: "0 4px",
          }}
          onClick={() => onDeleteClicked(explorerData.id)}
        >
          🗑
        </span>
      </div>
    );
  }
};

export default FileExplorer;
