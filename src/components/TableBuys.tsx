import React from 'react'
import { Item, Table, pagesRouter } from '../vite-env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faBottleWater, faCheck, faCookie, faDrumstickBite, faIceCream, faMartiniGlassCitrus, faMinus, faPlateWheat, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { products } from '../assets/products'

type Props = {
    Table: Table | undefined
    editTable: Function
}
type resRoute = {
    [key: number]: any
}

let lastChange: undefined | any = undefined

export default function TableBuys({Table, editTable}: Props) {
    const [productsVis, setProductsVis] = React.useState<boolean>(false)
    const [selectedProds, setSelectedProds] = React.useState<Item[]>([])
    const [ProductPage, setProductPage] = React.useState("Entrada")

    const pages: pagesRouter = {
        "Entrada": faCookie,
        "Montadito": faPlateWheat,
        "Principal": faDrumstickBite,
        "Postres": faIceCream,
        "Bebidas": faBottleWater,
        "Tragos": faMartiniGlassCitrus,
    }

    const calculateTotal = ()=>{
        if(Table === undefined) return
        let array = Table.buys
        let total = 0
        for(let i=0; i < array.length; i++) {
            total += array[i].price * array[i].amount!
        }
        return total
    }

    
    const checkItemBuy = (buys: Item[], id: string)=>{
        let index = 0
        let boolean = false
        for(let i=0; i<buys.length;i++) {
            if(buys[i]._id === id) {
                index = i
                boolean = true
                break
            }
        }

        return [boolean as boolean, index as number]
    }

    const changeAmount = (item: Item, index: number, add: number)=>{
        if(Table === undefined || Table.buys.length === 0 || !item.amount) return
        let newAmount = item.amount + add
        
        //delete if amount is 0
        let newValue = newAmount !== 0 ?  
        Object.values({...Table.buys, [index]: {...item, amount: newAmount}}) 
        : Table.buys.filter((item, i)=>{
            if(i !== index) return item
        })
        
        editTable("buys", newValue, item._id, [[item.name, add > 0 ? "+1" : "-1"]])
    }

    // const addItem = (item: Item, amount: number | undefined)=>{
    //     if(Table === undefined) return

    //     let localmount = !amount ? 1: amount
    //     let buyedItem: Item = {...item, amount: localmount}
    //     let [results, index] = checkItemBuy(Table.buys, buyedItem._id)
    //     if(Table.buys.length !== 0 && results) changeAmount(Table.buys[index as number], index as number, localmount)
    //     else {
    //         editTable("buys", [...Table.buys, buyedItem], buyedItem._id, true)
    //     }
    // }

    const ProductList = ()=>{
        return <div>
            <nav className='table-buys-top'>
                <p>Producto</p>
                <p>Unidades</p>
                <p>Precio</p>
            </nav>
            <div className='table-buys'>
                <ul>
                    {Table !== undefined && Table.buys.map((item, i)=>{
                        return <li className='table-buys-item' id={item._id} key={Math.random()}>
                            <p>{item.name}</p>
                            <p>{item.amount}</p>
                            <p>{item.price}</p>
                            <div className='item-options'>
                                <button onClick={()=>{changeAmount(item, i, 1)}}><FontAwesomeIcon icon={faPlus}/></button>
                                <button onClick={()=>{changeAmount(item, i, -1)}}><FontAwesomeIcon icon={faMinus}/></button>
                            </div>
                        </li>
                    })}
                </ul>
                <li className='table-buys-total' key={Math.random()}>
                    <p>Total</p>
                    <p></p>
                    <p>{calculateTotal()}</p>
                </li>
            </div>
        </div>
    }

    ///

    const confirmSelect = ()=>{
        if(selectedProds.length === 0 || Table === undefined) return

        let newBuys = [...Table.buys]
        for(let i=0; i < selectedProds.length; i++) {
            let item = selectedProds[i]
            let res: resRoute = [checkItemBuy(Table.buys, item._id)]
            let results = res[0][0] as boolean
            let index = res[1][1] as number 

            if(Table.buys.length !== 0 && results) {
                let newAmount = Table.buys[index].amount! + item.amount!
                newBuys = Object.values({...Table.buys, [index]: {...item, amount: newAmount}}) as Item[]
            }
            else {
                newBuys = [...newBuys, item]
            }
        }
        editTable("buys", newBuys, undefined, selectedProds.map(item=>{return [item.name, "X"+item.amount]}))
         
        setSelectedProds([])
        setProductsVis(false)
    }

    ////

    const changeSelectedAmount = (item: Item, index: number, add: number)=>{
        if(Table === undefined || selectedProds.length === 0 || !item.amount) return
        let newAmount = item.amount + add
        
        //delete if amount is 0
        let newValue = newAmount !== 0 ?  
        Object.values({...selectedProds, [index]: {...item, amount: newAmount}}) as Item[]
        : selectedProds.filter((item, i)=>{
            if(i !== index) return item
        })
        
        setSelectedProds(newValue)
    }

    const addItemToSelected = (item: Item, amount: number)=>{
        if(Table === undefined) return
        let buyedItem: Item = {...item, amount: 1}

        let picker=  document.getElementById('product-picker')
        if(!picker) return
        lastChange = picker.scrollTop
        let [results, index] = checkItemBuy(selectedProds, buyedItem._id)
        if(selectedProds.length !== 0 && results && amount) changeSelectedAmount(selectedProds[index as number], index as number, amount)
        else {
            setSelectedProds([...selectedProds, buyedItem])
        }
    }

    const RenderProducts = (page: string)=>{
        return products[page].map(item=>{
            let [boolean, index] = checkItemBuy(selectedProds, item._id)
            return <div
                key={Math.random()}
                id={item._id}
                onClick={()=>{if(!boolean) addItemToSelected(item, 1)}}
                className={boolean ? 'pickeable-item selected' :'pickeable-item'}
            >
                {boolean ? <>
                <button onClick={()=>{addItemToSelected(item, -1)}}><FontAwesomeIcon icon={faMinus}/></button>
                <div>
                    <div>{selectedProds[index as number].amount + " X $" + selectedProds[index as number].price}</div>
                    <p>{item.name}</p>
                </div>
                <button onClick={()=>{addItemToSelected(item, 1)}}><FontAwesomeIcon icon={faPlus}/></button>
                </>: <>
                <FontAwesomeIcon icon={faArrowCircleLeft}/>
                <p>{item.name}</p>
                {/* {item.tags !== undefined && item.tags.includes("vegan") && <FontAwesomeIcon icon={faSeedling}/>}
                {item.tags !== undefined && item.tags.includes("no-tacc") && <FontAwesomeIcon icon={faWheatAlt}/>} */}
                <p>${item.price}</p>
                </>}
                
            </div>
        })
    }

    const ProductPicker = ()=>{
        const Router = ()=>{
            return <nav className='picker-nav'>
                {Object.keys(pages).map(page=>{
                    return <button 
                        key={Math.random()}
                        className={ProductPage === page ? "active" : ""}
                        onClick={()=>{setProductPage(page)}}
                    >
                        <FontAwesomeIcon icon={pages[page]}/>
                        <p>{page}</p>
                    </button>
                })}
                <button onClick={()=>{setSelectedProds([]); setProductsVis(false)}}>
                    <FontAwesomeIcon icon={faTrash}/>
                    <p>Descartar</p>
                </button>
            </nav>
        }
        return <section className='picker-section'>
            <Router/>
            <div className='product-picker' id='product-picker'>
                {Table !== undefined && RenderProducts(ProductPage)}
            </div>
            <button 
                className='select-confirm' 
                onClick={()=>{
                    confirmSelect()
                }}
            >
                <FontAwesomeIcon icon={faCheck}/>
            </button>
        </section>
    }

    React.useEffect(()=>{
        if(lastChange === undefined || selectedProds.length === 0 ) return

        let picker=  document.getElementById('product-picker')
        if(!picker) return
        picker.scrollTo({left: 0, top: lastChange})
        lastChange = undefined
    }, [selectedProds])
    
    return <section className='table-display'>
        {!productsVis ? <div>
            <ProductList/>
            <button 
                className='add-product'
                onClick={()=>{setProductsVis(true)}}
            >
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        </div>
        : <ProductPicker/>}
    </section>
}