import {
  ReactNode,
  useEffect,
  useState,
  Fragment,
  useRef,
  ChangeEvent,
} from "react";
import { isValidJson } from "./utils/isValidJson";
import { isValidTree } from "./utils/isValidTree";

import "./Tree.css";

export default function Tree() {
  const [tree, setTree] = useState(null);
  const [treeError, setTreeError] = useState(false);
  const [childKey, setChildKey] = useState("children");
  const [childKeyError, setChildKeyError] = useState(false);
  const [leafValue, setLeafValue] = useState("");
  const [leafValueError, setLeafValueError] = useState(false);
  const [scale, setScale] = useState(1);

  const [generate, setGenerate] = useState(false);
  const [domTree, setDomTree] = useState<ReactNode | null>(null);
  const [leafData, setLeafData] = useState<ReactNode | null>(null);

  const domTreeRef = useRef<HTMLElement | null>(null);
  const domTreeContainerRef = useRef<HTMLElement | null>(null);

  let nodeCount = 0;

  useEffect(() => {
    setDomTree(traverseTree(tree));

    if (domTreeRef.current)
      domTreeRef.current.style.transform = `scale(${1 - scale / 20})`;

    if (domTreeContainerRef.current)
      domTreeContainerRef.current.scrollLeft =
        domTreeContainerRef.current.scrollWidth / 2 -
        domTreeContainerRef.current.clientWidth / 2;

    if (generate) setGenerate(false);

    return () => {};
  }, [scale, generate]);

  const traverseTree = (tree: any) => {
    if (!tree) return;
    if (!Array.isArray(tree[childKey])) {
      setChildKeyError(true);
      return;
    }
    if (leafValue && !tree[leafValue]) {
      setLeafValueError(true);
      return;
    }

    setChildKeyError(false);
    setLeafValueError(false);

    nodes.push(tree);

    const order = Symbol("order");

    tree[order] = ++nodeCount;

    const keysList = Object.keys(tree).map((key: string) => {
      if (key !== childKey) return <li>{key + " : " + tree[key]}</li>;
    });

    const childNodeList = tree[childKey].map((childNode: any, i: number) => {
      return <Fragment key={i}>{traverseTree(childNode)}</Fragment>;
    });

    return (
      <div
        ref={
          tree[order] === 1
            ? (domTreeRef as React.LegacyRef<HTMLDivElement>)
            : undefined
        }
        className={`subTree 
          ${
            tree.children.length < 2 || tree[order] === 1
              ? "border-t-0 after:left-0 after:w-[200%] after:translate-x-0 after:last:border-t-0"
              : "after:last:left-0"
          }`}
      >
        <div
          onMouseOver={() => setLeafData(keysList)}
          onMouseLeave={() => setLeafData(null)}
          className={`leaf-wrapper group
            ${
              tree[order] === 1
                ? "after:h-[155%] after:-translate-y-[25px]"
                : tree.children.length > 0
                ? "after:h-[200%] after:-translate-y-1/3"
                : " after:h-[45%] after:-translate-y-[150%]"
            }`}
        >
          <ul className="tooltip absolute -left-full -top-1/3 z-10 hidden flex-col items-center justify-center whitespace-nowrap rounded-sm border bg-orange-700 p-2 group-hover:flex">
            {keysList}
          </ul>

          <div className="leaf">
            <h3 className="z-10 bg-pink-800 ">
              {leafValue ? tree[leafValue] : tree[order]}
            </h3>
          </div>
        </div>

        <section
          className={`childNodes flex justify-between gap-28 border-t-orange-950 ${
            childNodeList.length > 1 ? "border-t-4" : "border-t-0"
          }`}
        >
          {childNodeList}
        </section>
      </div>
    );
  };

  const traverse = (tree: any) => {
    nodes.push(tree);

    if (tree[childKey]) tree[childKey].forEach((node: any) => traverse(node));
  };

  const nodes: any[] = [];

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (
      !isValidJson(e.target.value.trim()) ||
      !isValidTree(e.target.value.trim())
    )
      return setTreeError(true);
    else setTreeError(false);

    setTree(JSON.parse(e.target.value.trim()));
  };

  return (
    <>
      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-10">
        <p className="px-5 py-5 text-slate-200">
          Enter your full tree and the key identifying the child nodes of a
          given tree node
        </p>

        <div className="tree-input flex">
          <label
            htmlFor="tree"
            className="flex grow flex-col gap-3 px-5 text-slate-200"
          >
            Tree
            <textarea
              id="tree"
              className="bg-slate-800 text-slate-200 shadow-2xl"
              onChange={handleTextareaChange}
              rows={10}
              placeholder=""
            />
            {treeError && (
              <span className="text-red-600">
                Invalid tree syntax. Consider generating a random tree.
              </span>
            )}
          </label>
          <div className="tree-generate-btns flex flex-col justify-around gap-3 px-5 pt-9 text-slate-200">
            <button className="w-32 border border-slate-200 bg-slate-800 p-5 uppercase text-slate-200 shadow-2xl hover:bg-slate-700">
              random
            </button>
            <button className="w-32 border border-slate-200 bg-slate-800 p-5 uppercase text-slate-200 shadow-2xl hover:bg-slate-700">
              binary
            </button>
            <button className="w-32 border border-slate-200 bg-slate-800 p-5 uppercase text-slate-200 shadow-2xl hover:bg-slate-700">
              skewed&nbsp;BST
            </button>
          </div>
        </div>

        <label
          htmlFor="childKey"
          className="flex flex-col gap-3 px-5 text-slate-200"
        >
          ChildArrayKey
          <input
            type="text"
            id="childKey"
            className="bg-slate-800 text-slate-200 shadow-2xl"
            onChange={(e) => setChildKey(e.target.value.trim())}
          />
          {childKeyError && (
            <span className="text-red-600">
              Key not found on tree or value is not an array of nodes
            </span>
          )}
        </label>

        <label
          htmlFor="nodeValue"
          className="sap-3 flex flex-col px-5 text-slate-200"
        >
          Leaf Value Key
          <input
            type="text"
            id="nodeValue"
            className="bg-slate-800 text-slate-200 shadow-2xl"
            onChange={(e) => setLeafValue(e.target.value.trim())}
          />
          {leafValueError && (
            <span className="text-red-600">
              Key not found on tree or must be of type string
            </span>
          )}
        </label>

        <button
          className="mx-auto max-w-[150px] cursor-pointer rounded-full border-2 border-slate-200 bg-slate-800 px-5 py-3 uppercase text-slate-200 disabled:cursor-not-allowed disabled:border-slate-600 disabled:text-slate-600"
          onClick={() => setGenerate(true)}
          disabled={!tree}
        >
          Generate
        </button>
      </section>

      <div className="flex w-full justify-end">
        <button
          className="zoomOut mx-10 h-10 w-32 cursor-zoom-in border-purple-50 bg-white disabled:cursor-not-allowed disabled:bg-gray-700"
          disabled={scale <= 1}
          onClick={() => setScale(scale - 1)}
        >
          +
        </button>
        <img
          className="zoomOut mx-10 h-10 cursor-pointer invert"
          src="../images/refresh.svg"
          onClick={() => setScale(1)}
        />
        <button
          className="zoomIn mx-10 h-10 w-32 cursor-zoom-out border-purple-50 bg-white disabled:bg-gray-700"
          disabled={scale === 19}
          onClick={() => setScale(scale + 1)}
        >
          -
        </button>
      </div>

      <div className="leaf-data-wrapper flex flex-col items-center justify-center">
        <div className="leaf-data h-36 w-36 border-2 border-orange-200 bg-orange-700">
          <h3 className="text-center underline">Node Info</h3>
          <ul className="text-center">{leafData}</ul>
        </div>
      </div>
      <section
        className="scrollbar scroll-1/2 my-5 flex flex-wrap gap-y-10 overflow-x-auto border-4 border-dotted border-black px-20"
        ref={domTreeContainerRef}
      >
        {domTree && domTree}
      </section>
    </>
  );
}
