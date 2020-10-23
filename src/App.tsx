import * as React from "react";
import "./App.scss";
import { getApi } from "./service/service";
import { MdChevronRight, MdExpandMore } from "react-icons/md";

function App() {
  return <Tree></Tree>;
}
export default App;

const Tree: React.FC<{}> = () => {
  const [treeData, setTreeData] = React.useState<any>();
  const [collapsed, setCollapsed] = React.useState<string[]>([]);

  React.useEffect(() => {
    getApi(setTreeData);
  }, []);

  const getNode = (id: string, align?: "left" | "right") => {
    const parentStyle = id === treeData["rootNode"] ? "padding" : "";
    const sty = collapsed.includes(id) ? "collapsed" : "";
    if (treeData) {
      return (
        <div className={"parent " + parentStyle}>
          {getBox(id, align)}
          {!isLast(id) ? (
            <div className={"bottomTriangle" + sty}></div>
          ) : (
            <div></div>
          )}
          {!isLast(id) ? <div className={"arrowVer" + sty}></div> : <div></div>}
          {!collapsed.includes(id) ? getChildren(id) : <div></div>}
        </div>
      );
    }
    return;
  };

  const isLast = (id: string) => {
    if (treeData["nodes"][id] && treeData["nodes"][id].left) {
      return false;
    }
    return true;
  };

  const getBox = (id: string, align?: string) => {
    if (!align) {
      return (
        <div onClick={() => toggleCollapse(id)} className="box top">
          <span id={"title"} className="title">
            {!isLast(id) ? <div className="expand"></div> : <div></div>}
            {id}
            {!isLast(id) ? getIcon(id) : <div></div>}
          </span>
        </div>
      );
    }
    if (align === "left") {
      return (
        <div onClick={() => toggleCollapse(id)} className="box">
          <div className="flex"></div>
          <span id={"title"} className="title">
            {!isLast(id) ? <div className="expand"></div> : <div></div>}
            {id} {!isLast(id) ? getIcon(id) : <div></div>}
          </span>
          <div className="rightTriangle"></div>
          <div className="rightarrow"></div>
        </div>
      );
    }
    if (align === "right") {
      return (
        <div onClick={() => toggleCollapse(id)} className="box">
          <div className="leftarrow"></div>
          <div className="leftTriangle"></div>
          <span id={"title"} className="title">
            {!isLast(id) ? <div className="expand"></div> : <div></div>}
            {id} {!isLast(id) ? getIcon(id) : <div></div>}
          </span>
          <div className="flex"></div>
        </div>
      );
    }
  };

  const getIcon = (id: string) => {
    return collapsed.includes(id) ? (
      <div className="expand">
        <MdChevronRight size={28} />
      </div>
    ) : (
      <div className="expand">
        <MdExpandMore size={28} />
      </div>
    );
  };

  const getChildren = (id: string) => {
    if (!treeData) {
      return;
    }
    if (
      treeData["nodes"][id] &&
      treeData["nodes"][id].left &&
      treeData["nodes"][id].right
    ) {
      return (
        <div className="children">
          <div className="children">
            {treeData && treeData["nodes"][id].left ? (
              getNode(treeData["nodes"][id].left, "left")
            ) : (
              <div></div>
            )}
            {treeData && treeData["nodes"][id].right ? (
              getNode(treeData["nodes"][id].right, "right")
            ) : (
              <div></div>
            )}
          </div>
        </div>
      );
    } else if (treeData["nodes"][id] && treeData["nodes"][id].left) {
      return (
        <div className="children">
          <div className="children">{getNode(treeData["nodes"][id].left)}</div>
        </div>
      );
    }
  };

  const toggleCollapse = (id: string) => {
    if (collapsed.includes(id)) {
      const ind = collapsed.indexOf(id);
      collapsed.splice(ind, 1);
    } else {
      collapsed.push(id);
    }
    const newList = [...collapsed];
    setCollapsed(newList);
  };

  return (
    <div className={"authPage"}>
      <div className="home">
        {treeData ? getNode(treeData["rootNode"]) : <div></div>}
      </div>
    </div>
  );
};
