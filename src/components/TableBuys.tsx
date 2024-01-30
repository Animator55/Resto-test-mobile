import React from 'react'
import { Item, Table, pagesRouter } from '../vite-env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faBottleWater, faCheck, faCookie, faDrumstickBite, faIceCream, faMartiniGlassCitrus, faMinus, faPen, faPlateWheat, faPlus, faWineBottle, faXmark } from '@fortawesome/free-solid-svg-icons'
import { products } from '../assets/products'
import EditItemPop from './EditItemPop'

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
    const [editPopUp, setEditPopUp] = React.useState<number | undefined>(undefined)

    const pages: pagesRouter = {
        "Entrada": faCookie,
        "Montadito": faPlateWheat,
        "Principal": faDrumstickBite,
        "Postres": faIceCream,
        "Bebidas": faBottleWater,
        "Vinos": faWineBottle,
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

    const editItem = (item: Item, input1:string, input2:string)=>{
        if(Table === undefined) return

        let res: resRoute = [checkItemBuy(Table.buys, item._id)]

        let results = res[0][0] as boolean
        let index = res[0][1] as number 

        let newPrice = input2 !== "" ? Number(input2) : Table.buys[index].price
        let newAmount = input1 !== "" ? Number(input1) : Table.buys[index].amount
        
        let splitedID = item._id.split(".")
        let newID = splitedID.length === 2 ? item._id + ".e" + `${Math.round(Math.random()*1000)}` : item._id
        
        let newBuys = [...Table.buys]
        if(results) {
            newBuys = Object.values({...Table.buys, [index]: {...item, _id: newID, amount: newAmount, price: newPrice}}) as Item[]
        }
        
        let changedPrice = Table.buys[index].price !== newPrice ? Table.buys[index].price +" > " + input2: ""
        let changedAmount = Table.buys[index].amount !== newAmount ? Table.buys[index].amount +" > " + input1: ""

        editTable("buys", newBuys, undefined, [[item.name, changedAmount + "/" + changedPrice]])
        setEditPopUp(undefined)
    }

    const checkEdited = (item: Item)=>{
        if(!item) return 'table-buys-item'
        let id = item._id.split(".")
        if(id.length === 3) return 'table-buys-item edited'
        return 'table-buys-item'
    }

    const ProductList = ()=>{
        return <div>
            <nav className='table-buys-top'>
                <p></p>
                <p>Producto</p>
                <p>Uni.</p>
                <p>Precio</p>
            </nav>
            <div className='table-buys'>
                <ul>
                    {Table !== undefined && Table.buys.map((item, i)=>{
                        return <li className={checkEdited(item)} id={item._id} key={Math.random()}>
                            <button onClick={()=>{setEditPopUp(i)}}><FontAwesomeIcon icon={faPen}/></button>
                            <p>{item.name}</p>
                            <p>{item.amount}</p>
                            <p>{item.price}</p>
                            <div className='item-options'>
                                <button onClick={()=>{changeAmount(item, i, -1)}}><FontAwesomeIcon icon={faMinus}/></button>
                                <button onClick={()=>{changeAmount(item, i, 1)}}><FontAwesomeIcon icon={faPlus}/></button>
                            </div>
                        </li>
                    })}
                </ul>
                <li className='table-buys-total' key={Math.random()}>
                    <p></p>
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
            let index = res[0][1] as number 

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
                    <div>
                        <b style={{color: "var(--cgreen)"}}>{selectedProds[index as number].amount}</b> 
                        {" X $" + selectedProds[index as number].price}
                    </div>
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
                    let bool = selectedProds.some(it=>{
                        return it.type === page
                    })
                    return <button 
                        key={Math.random()}
                        className={ProductPage === page ? "active" : ""}
                        onClick={()=>{setProductPage(page)}}
                        style={bool ? {color: "var(--cgreen)"}:{}}
                    >
                        <FontAwesomeIcon icon={pages[page]}/>
                        <p>{page}</p>
                    </button>
                })}
                <button onClick={()=>{setSelectedProds([]); setProductsVis(false)}}>
                    <FontAwesomeIcon icon={faXmark}/>
                    <p>Descartar</p>
                </button>
            </nav>
        }
        const drag = (e: React.TouchEvent<HTMLDivElement>)=>{
            console.log("touchstart", e)

            let initialX = e.touches[0].pageX
            let indexPages = Object.keys(pages)
            let actual =indexPages.indexOf(ProductPage)
            let nex = actual+1 === indexPages.length ? indexPages[actual] : indexPages[actual+1]
            let prev = actual-1 < 0 ? indexPages[0] : indexPages[actual-1]

            const move = (e2: TouchEvent)=>{
                if(e2.touches[0].clientX + 100 < initialX) setProductPage(nex)
                else if(e2.touches[0].clientX - 100 > initialX) setProductPage(prev)
            }

            const drop = ()=>{
                // document.removeEventListener("mousemove", move)
                // document.removeEventListener("mouseup", drop)
                document.removeEventListener("touchmove", move)
                document.removeEventListener("touchend", drop)
                document.removeEventListener("touchcancel", drop)
            }

            document.addEventListener("touchmove", move)
            document.addEventListener("touchend", drop, {once: true})
            document.addEventListener("touchcancel", drop, {once: true})
            // document.addEventListener("mousemove", move)
            // document.addEventListener("mouseup", drop, {once: true})
        }
        return <section className='picker-section'>
            <Router/>
            <div className='product-picker' onTouchStart={drag} id='product-picker'>
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
            {editPopUp !== undefined && <EditItemPop item={Table?.buys[editPopUp]} close={()=>{setEditPopUp(undefined)}} confirm={editItem}/>}
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