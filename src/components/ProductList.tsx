import React from 'react'
import { products } from '../assets/products'

type Props = {}

export default function ProductList({}: Props) {
    const [productsLocal, setProducts] = React.useState(products)

    let List = []
    for(const key in productsLocal) {
        let group = productsLocal[key]

        let comp = <div>
            <h4>{key}</h4>
            <ul>
                {group.map(item=>{
                    return <li key={Math.random()}>{item.name}</li>
                })}
            </ul>
        </div>
        List.push(comp)
    }


  return (
    <div>
        {List}
    </div>
  )
}