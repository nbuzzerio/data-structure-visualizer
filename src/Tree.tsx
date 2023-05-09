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
      <div className={`subTree relative flex flex-col items-center after:content-[''] after:absolute after:top-0 after:right-0 after:translate-x-28 after:-translate-y-full after:h-1 after:w-full after:border-t-4 after:border-t-orange-950 after:last:w-28
      ${tree.children.length < 2 || tree[order] === 1 ? 'after:translate-x-0 after:w-[200%] after:left-0 after:last:border-t-0' : 'after:last:left-0'}
      `}>
        <div className={`relative group-first:-translate-x-full
        w-auto group mt-[70px] -rotate-[225deg] mb-10 -translate-x-2
        before:absolute before:content-[''] before:w-1 before:h-10 before:-bottom-3 before:right-1/2 before:bg-pink-800 before:translate-x-1/2 
        ${tree[order] > 1 ? "after:content-[''] after:absolute after:-bottom-20 after:right-3/4 after:translate-x-1/2 after:w-1 after:h-20 after:bg-orange-950 after:rotate-[225deg]" : ''}`}>
            <ul className="tooltip absolute hidden group-hover:flex flex-col justify-center items-center z-10 -top-1/2 -left-1/2 whitespace-nowrap rounded-sm bg-orange-700 border p-2 rotate-[225deg]">
              {keysList}
            </ul>
          <div className="leaf bg-pink-800 w-28 h-28 aspect-square flex flex-col justify-center items-center z-1 after:content-[''] after:absolute after:top-2 after:right-1/2 after:translate-x-1/2 after:w-[.5px] after:h-full after:bg-yellow-200">
            <h3 className="bg-pink-800 z-10 rotate-[225deg]">{tree[order]}</h3>
          </div>
            {tree.children.length > 0 && <span className="connection h-[140%] w-1 bg-orange-950 absolute rotate-[225deg] -translate-y-[72%] translate-x-[100px]"></span>}
        </div>
        <section className="childNodes flex gap-28 justify-between">
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
        w-auto group mt-20 -rotate-[225deg]
        before:absolute before:content-[''] before:w-1 before:h-10 before:-bottom-3 before:right-1/2 before:bg-green-500 before:translate-x-1/2 
        after:content-[''] after:absolute after:bottom after:right-3/4 after:translate-x-1/2 after:w-1 after:h-20 after:bg-orange-950 after:rotate-[225deg]">
          <div className="leaf bg-green-500 w-28 h-28 aspect-square flex flex-col justify-center items-center z-1 after:content-[''] after:absolute after:top-2 after:right-1/2 after:translate-x-1/2 after:w-[.5px] after:h-full after:bg-yellow-200">
            <h3 className="bg-green-500 z-10 rotate-[225deg]">{node[order]}</h3>
          </div>
            <ul className="tooltip absolute hidden group-hover:flex flex-col justify-center items-center z-10 -top-1/3 left-1/3 whitespace-nowrap rounded-sm bg-orange-950 border text-green-500 p-2 rotate-[225deg]">
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


const example = {
  "name": "Node A",
  "data1": "123",
  "data2": "abc",
  "data3": true,
  "children": [
    {
      "name": "Node A1",
      "data1": "456",
      "data2": "def",
      "data3": false,
      "children": [
        {
          "name": "Node A1.1",
          "data1": "789",
          "data2": "ghi",
          "data3": true,
          "children": []
        },
        {
          "name": "Node A1.2",
          "data1": "101",
          "data2": "jkl",
          "data3": false,
          "children": []
        }
      ]
    },
    {
      "name": "Node A2",
      "data1": "112",
      "data2": "mno",
      "data3": true,
      "children": [
        {
          "name": "Node A2.1",
          "data1": "131",
          "data2": "pqr",
          "data3": false,
          "children": []
        },
        {
          "name": "Node A2.2",
          "data1": "415",
          "data2": "stu",
          "data3": true,
          "children": [
            {
              "name": "Node A2.2.1",
              "data1": "926",
              "data2": "vwx",
              "data3": false,
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "Node A3",
      "data1": "839",
      "data2": "yza",
      "data3": true,
      "children": [
        {
          "name": "Node A3.1",
          "data1": "657",
          "data2": "bcd",
          "data3": false,
          "children": [
            {
              "name": "Node A3.1.1",
              "data1": "483",
              "data2": "efg",
              "data3": true,
              "children": []
            },
            {
              "name": "Node A3.1.2",
              "data1": "295",
              "data2": "hij",
              "data3": false,
              "children": []
            }
          ]
        },
        {
          "name": "Node A3.2",
          "data1": "846",
          "data2": "klm",
          "data3": true,
          "children": [
            {
              "name": "Node A3.2.1",
              "data1": "739",
              "data2": "nop",
              "data3": false,
              "children": []
            }
          ]
        }
      ]
    }
  ]
}