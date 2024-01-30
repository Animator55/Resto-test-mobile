import { faExpand, faList, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Table } from "../vite-env"
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk"

type Props = {
  save: Function
  TableList: Function
  page: string 
  pay: Function
  selectedTable: Table | undefined
  setPopUp: Function
  toggleFilter: Function
  filter: string
}

export default function TopBar({save, TableList, page, pay, selectedTable, setPopUp, toggleFilter, filter}: Props) {
  const [pop, setPop] = React.useState<boolean>(false)

  const ClosePopUp = ()=>{
    return <section className="pop-background">
      <div className="pop">
        <h2>Cerrar Registro</h2>
        <hr/>
        <div>
          <button onClick={()=>{save()}}>Guardar </button>
          <button onClick={()=>{setPop(false)}}>Cancelar</button>
        </div>
      </div>
    </section>
  }
  
  const fullscreen = ()=>{
    let elem = document.getElementById('main')
    if(!elem) return
    if(elem.requestFullscreen) elem.requestFullscreen()
    // else if(elem.webkitRequestFullscreen) elem.webkitRequestFullscreen()
  }
  return <nav className="topbar">
    {pop && <ClosePopUp/>}
    <button onClick={()=>{TableList()}}>
      <FontAwesomeIcon icon={faList}/>
    </button>
    <button onClick={()=>{fullscreen()}}>
      <FontAwesomeIcon icon={faExpand}/>
    </button>
    {page === "table" && <>
      <h4>{selectedTable !== undefined && "Mesa " + selectedTable.number}</h4>
      <button className={selectedTable?.buys.length !== 0 ? "pay" : "pay disabled"} onClick={()=>{pay()}}>Cobrar</button>
    </>
    }
    {page === "list" && <>
      <button className="save" onClick={()=>{save()}}>
        <FontAwesomeIcon icon={faFloppyDisk}/>
        <p>Guardar</p>
      </button>
      <button className="toggle-filter" onClick={()=>{toggleFilter()}}>
        <FontAwesomeIcon icon={faFolder}/>
        <p>{filter === "active" ? "Activas" : "Borradas"}</p>
      </button>
      <button className="add-table" onClick={()=>{setPopUp(true)}}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </>
    }
    {/* <button onClick={()=>{}}>
      <FontAwesomeIcon icon={faDatabase}/>
    </button> */}
    {/* <button onClick={()=>{setPop(true)}}>
      <FontAwesomeIcon icon={faXmark}/>
    </button> */}
  </nav>
}