import { faList, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Table } from "../vite-env"

type Props = {
  closeAll: Function
  TableList: Function
  page: string 
  pay: Function
  selectedTable: Table | undefined
  setPopUp: Function
}

export default function TopBar({closeAll, TableList, page, pay, selectedTable, setPopUp}: Props) {
  const [pop, setPop] = React.useState<boolean>(false)

  const ClosePopUp = ()=>{
    return <section className="pop-background">
      <div className="pop">
        <h2>Cerrar Registro</h2>
        <hr/>
        <div>
          <button onClick={()=>{closeAll(true)}}>Guardar y cerrar</button>
          <button onClick={()=>{closeAll(false)}}>No guardar y cerrar</button>
          <button onClick={()=>{setPop(false)}}>Cancelar</button>
        </div>
      </div>
    </section>
  }
  return <nav className="topbar">
    {pop && <ClosePopUp/>}
    <button onClick={()=>{TableList()}}>
      <FontAwesomeIcon icon={faList}/>
    </button>
    {page === "table" && <>
      <h4>{selectedTable !== undefined && "Mesa " + selectedTable.number}</h4>
      <button className={selectedTable?.buys.length !== 0 ? "pay" : "pay disabled"} onClick={()=>{pay()}}>Cobrar</button>
    </>
    }
    {page === "list" && <button className="add-table" onClick={()=>{setPopUp(true)}}>
      <FontAwesomeIcon icon={faPlus}/>
      <p>Añadir Mesa</p>
    </button>}
    {/* <button onClick={()=>{}}>
      <FontAwesomeIcon icon={faDatabase}/>
    </button> */}
    {/* <button onClick={()=>{setPop(true)}}>
      <FontAwesomeIcon icon={faXmark}/>
    </button> */}
  </nav>
}