import React from 'react'
import './assets/App.css'
import TablesList from './components/TablesList'
import TableBuys from './components/TableBuys'
import { TablesType, pagesRouter } from './vite-env'
import TopBar from './components/TopBar'
import Historial from './components/Historial'
import AddTable from './components/AddTable'
import PayPaper from './components/PayPaper'

const defaultTables: TablesType = {
}

let lastChange: string | undefined


// const checkTableExist = (Tables: TablesType, number: string)=>{
//   let result : boolean = false

//   for(const key in Tables) {
//       if(Tables[key].number === Number(number)) {
//           result = true
//           break
//       }
//   }    
//   return result
// }

export default function App() {
  const [paydisplay, setDisplay] = React.useState<undefined | any>(undefined)
  const [popUp, setPopUp] = React.useState<boolean>(false)
  const [page, setPage] = React.useState("list")
  const [Tables, setTables] = React.useState(defaultTables)
  const [selectedTable, setSelected] = React.useState<string | undefined>()
  const [selectedHistorial, setSelectedHis] = React.useState<string | undefined>()
  
  const editTable = (key: string, value: any, id: string | undefined, change: string[])=>{
    if(selectedTable === undefined) return

    lastChange = id

    let historialLocal = Tables[selectedTable].historial 
    if(key === "buys") {
      const d = new Date()
      let histBuy = {
        change: change, timestamp: d.getHours() +":"+(d.getMinutes() > 10 ? "" : "0") +d.getMinutes()
      }
      historialLocal = historialLocal.length === 0 ? [histBuy]:[...historialLocal, histBuy]
    }

    setTables({...Tables, [selectedTable]: {...Tables[selectedTable], [key] : value, historial: historialLocal}})
  }

  const createTable = (val: string)=>{
    let id = `${Math.random()*Math.random()}`
    const d = new Date()
    let initial = {
      _id: id,
      number: Number(val),
      reservation: false,
      state: "active",
      buys: [],
      historial: [
        {change: [["Creada la mesa", val]], timestamp: d.getHours() +":"+(d.getMinutes() > 10 ? "" : "0") +d.getMinutes()}
      ],
    }
    setTables({...Tables, [id]: initial})
    setSelected(id)
  }

  const closeAll = (save: boolean)=>{
    console.log(save)
  }
  const pay = ()=>{
    if(!selectedTable || Tables[selectedTable].buys.length === 0) return

    let result = {}
    let total = 0
    let table = Tables[selectedTable].buys
    for(let i=0; i<table.length; i++) {
      total += table[i].price * table[i].amount!
      let amount = table[i].amount === 1 ? "" : "(" +table[i].amount + " X "
      let subtotal = table[i].amount === 1 ? "" : ") $"+ table[i].amount! * table[i].price 
      result = {...result, [table[i].name] : amount +"$" + table[i].price + subtotal}
    }

    result = {...result, Total: `$${total}`, "Mesa": Tables[selectedTable].number}

    setDisplay(result)
  }

  const pages: pagesRouter = {
    "list": <TablesList 
      Tables={Tables} 
      setSelected={setSelected} 
      selectedTable={selectedTable} 
      OpenHistorial={(id: string)=>{
        setSelectedHis(id)
        setPage("historial")
      }} 
      />,
    "table": <TableBuys editTable={editTable} Table={selectedTable !== undefined ? Tables[selectedTable] : undefined}/>,
    "historial": <Historial 
      historial={selectedHistorial !== undefined  ? Tables[selectedHistorial] : undefined}
    />
  }

  const handleCreateTable = (val: string)=>{
    //checkTableExist(Tables, val)
    if(!val || val === "") return
    createTable(val)
    setPopUp(false)
  }

  React.useEffect(()=>{
    if(lastChange === undefined) return

    let item = document.getElementById(lastChange)
    lastChange = undefined
    if(!item) return
    let ul = item.parentElement
    item.classList.add('change-amount')
    if(!ul) return
    ul.scrollTo({left: 0, top: item.offsetTop})
    setTimeout(()=>{
      if(!item) return
      item.classList.remove('change-amount')
    },300)
  }, [Tables])

  React.useEffect(()=>{
    if(!selectedTable) return 
    setPage("table")
  }, [selectedTable])

  return <main id='main'>
    <section className='content'>
      <section className='sub-content'>
        {paydisplay !== undefined && <PayPaper content={paydisplay} close={()=>{setDisplay(undefined)}}/>}
        {popUp && <AddTable close={()=>{setPopUp(false)}} confirm={handleCreateTable}/>}
        <TopBar 
          closeAll={closeAll} 
          TableList={()=>{setPage("list"); setSelected(undefined)}}
          page={page}
          selectedTable={selectedTable !== undefined ? Tables[selectedTable]: undefined}
          setPopUp={setPopUp}
          pay={pay}
        />
        {pages[page]}
      </section>
    </section>
  </main>
}
