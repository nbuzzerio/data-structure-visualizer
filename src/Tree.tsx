import { ReactNode, useEffect, useState, Fragment } from "react"

import './Tree.css'

export default function Tree() {

  const [tree, setTree] = useState(null)
  const [childKey, setChildKey] = useState('children')
  const [nodeValue, setNodeValue] = useState('value')

  const [nodeList, setNodeList] = useState<any[]>([])
  const [domTree, setDomTree] = useState<ReactNode | null>(null)

  let nodeCount = 0;

  useEffect(() => {

    setDomTree(traverseTree(tree))
  
    return () => {}
  }, [nodeList])
  

  const traverseTree = (tree: any) => {
    if (!tree) return

    nodes.push(tree)

    const order = Symbol('order')

      tree[order] = ++nodeCount;

      const keysList = Object.keys(tree).map((key: string) => {
        if (key !== childKey) return <li>{key + " : " + tree[key]}</li>
      });

      const childNodeList = tree[childKey].map((childNode: any, i: number) => {
        return <Fragment key={i}>{traverseTree(childNode)}</Fragment>
      })
console.log(tree[order])
    return (
      <div className={`subTree relative flex flex-col items-center -mt-1
      after:content-[''] after:absolute after:top-0 after:right-0 after:translate-x-full after:h-1 after:w-full

      
      before:content-[''] before:absolute before:top-0 before:right-1/2 before:-translate-x-14 before:h-1 before:w-full before:z-10

      after:last:h-1 after:last:right-0 after:last:w-1/2 after:last:bg-gray-600

      before:last:content-[''] before:last:absolute before:last:top-0 before:last:right-1/2 before:last:translate-x-14  before:last:h-1 before:last:w-28 before:last:bg-gray-600 before:last:z-10

      before:first:content-[''] before:first:absolute before:first:top-0 before:first:right-1/2 before:first:-translate-x-14 before:first:h-1 before:first:w-full before:first:bg-gray-600  before:first:z-10

      ${tree.children.length < 2 || tree[order] === 1 ? 'border-t-0 after:translate-x-0 after:w-[200%] after:left-0 after:last:border-t-0' : 'after:last:left-0 '}`}>

        <div className={`relative group-first:-translate-x-full
        w-auto group mt-[70px] mb-10 translate-x-6
        before:absolute before:content-[''] before:w-1 before:h-10 before:-top-7 before:-left-3 before:bg-pink-800 before:-rotate-45 before:translate-x-1/2
        
        after:content-[''] after:absolute after:top-1 after:-left-6 after:w-1 after:bg-orange-950

        ${tree[order] === 1 ? "after:h-[155%] after:-translate-y-[25px]" : tree.children.length > 0 ? "after:h-[200%] after:-translate-y-1/3" : " after:h-[45%] after:-translate-y-[150%]"}`}>

          <ul className="tooltip absolute hidden group-hover:flex flex-col justify-center items-center z-10 top-1/3 left-2/3 whitespace-nowrap rounded-sm bg-orange-700 border p-2">
            {keysList}
          </ul>

          <div className="leaf bg-pink-800 w-28 h-28 aspect-square flex flex-col justify-center items-center z-1 after:content-[''] after:absolute after:top-0 after:right-1/2 after:translate-x-1/2 after:w-[.5px] after:h-full after:bg-yellow-200 after:-rotate-45">
            <h3 className="bg-pink-800 z-10 ">{tree[order]}</h3>
          </div>
        </div>

        <section className="childNodes flex gap-28 justify-between border-t-4 border-t-orange-950">
          {childNodeList}
        </section>
      </div>
    )
  }
  
  const traverse = (tree: any) => {

    nodes.push(tree)

    if (tree[childKey]) tree[childKey].forEach((node: any) => traverse(node))

  }

  const nodes: any[] = []

  function handleClick() {
    

    if (!tree || !childKey) return;


    traverse(tree)

    console.log(nodes)

    setNodeList(nodes.map((node: any, i) => {

      const order = Symbol('order')

      node[order] = i+1;

      const keysList = Object.keys(node).map((key: string) => {
        if (key !== childKey) return <li>{key + " : " + node[key]}</li>
      }      )


      return (

        <div className="relative 
        w-auto group mt-20 
        before:absolute before:content-[''] before:w-1 before:h-10 before:-bottom-3 before:right-1/2 before:bg-green-500 before:translate-x-1/2 
        after:content-[''] after:absolute after:bottom after:right-3/4 after:translate-x-1/2 after:w-1 after:h-20 after:bg-orange-950 ">
          <div className="leaf bg-green-500 w-28 h-28 aspect-square flex flex-col justify-center items-center z-1 after:content-[''] after:absolute after:top-2 after:right-1/2 after:translate-x-1/2 after:w-[.5px] after:h-full after:bg-yellow-200">
            <h3 className="bg-green-500 z-10 ">{node[order]}</h3>
          </div>
            <ul className="tooltip absolute hidden group-hover:flex flex-col justify-center items-center z-10 -top-1/3 left-1/3 whitespace-nowrap rounded-sm bg-orange-950 border text-green-500 p-2 ">
              {keysList}
            </ul>
        </div>
      )
    }))
  }

  return (
    <>
      <section className="px-10 flex flex-col gap-5">

        <p className="text-slate-200 py-10">Enter your full tree and the key identifying the child nodes of a given tree node</p>

        <label htmlFor="tree" className="text-slate-200 underline px-5 flex flex-col gap-3">Tree
          <input type="textarea" id="tree" className="bg-slate-800 text-slate-200" onChange={(e) => setTree(JSON.parse(e.target.value.trim()))} />
        </label>

        <label htmlFor="childKey" className="text-slate-200 underline gap-3 px-5 flex flex-col">
          ChildKey
          <input type="textarea" id="childKey" className="bg-slate-800 text-slate-200" onChange={(e) => setChildKey(e.target.value.trim())} />
        </label>

        <label htmlFor="nodeValue" className="text-slate-200 underline px-5 flex flex-col sap-3">Leaf Value
          <input type="textarea" id="nodeValue" className="bg-slate-800 text-slate-200" onChange={(e) => setNodeValue(e.target.value.trim())} />
        </label>

        <button onClick={handleClick} className="bg-slate-800 text-slate-200 rounded-full px-5 py-3 uppercase border-2 mx-auto cursor-pointer border-slate-200 max-w-[150px]">Generate</button>

      </section>
      <section className="p-10 flex flex-wrap gap-y-10">
        {nodeList}
      </section>
      <section className="p-10 flex flex-wrap gap-y-10 justify-center">
        {domTree && domTree}
      </section>
    </>

  )
}


