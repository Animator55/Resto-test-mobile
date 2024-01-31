import { faExpand, faList, faPlus, faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Table } from "../vite-env"
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk"
import { faListCheck } from "@fortawesome/free-solid-svg-icons/faListCheck"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical"

type Props = {
  save: Function
  TableList: Function
  page: string 
  pay: Function
  selectedTable: Table | undefined
  setPopUp: Function
  toggleFilter: Function
  clear: Function
  results: Function
  filter: string
}

export default function TopBar({save, clear, results, TableList, page, pay, selectedTable, setPopUp, toggleFilter, filter}: Props) {
  const fullscreen = ()=>{
    let elem = document.getElementById('main')
    if(!elem) return
    if(elem.requestFullscreen) elem.requestFullscreen()
  }
  const Span = ()=>{
    const openSpan = (e: React.MouseEvent)=>{
      let span = e.currentTarget.nextElementSibling as HTMLSpanElement
      span.classList.toggle("expanded")
    }
    const blurSpan = (e: React.FocusEvent)=>{
      let span = e.currentTarget.nextElementSibling as HTMLSpanElement
      setTimeout(()=>{
        span.classList.remove("expanded")
      }, 100)
    }

    return <div className="span-wrap">
      <button className="expander" onClick={openSpan} onBlur={blurSpan}>
        <FontAwesomeIcon icon={faEllipsisVertical}/>
      </button>

      <span className="top-span">
        <button onClick={()=>{save()}}>
          <FontAwesomeIcon icon={faFloppyDisk}/>
          <p>Guardar</p>
        </button>
        <button onClick={()=>{clear()}}>
          <FontAwesomeIcon icon={faWarning}/>
          <p>Borrar datos</p>
        </button>

        <button onClick={()=>{fullscreen()}}>
          <FontAwesomeIcon icon={faExpand}/>
          <p>Fullscreen</p>
        </button>
        <button onClick={()=>{results()}}>
          <FontAwesomeIcon icon={faListCheck}/>
          <p>Resultados</p>
        </button>
      </span>
    </div>
  }
  return <nav className="topbar">
    <button onClick={()=>{TableList()}}>
      <FontAwesomeIcon icon={faList}/>
    </button>
    {page === "table" && <>
      <h4>{selectedTable !== undefined && "Mesa " + selectedTable.number}</h4>
      <button className={selectedTable?.buys.length !== 0 ? "pay" : "pay disabled"} onClick={()=>{pay()}}>Cobrar</button>
    </>
    }
    {page === "list" && <>
      <button className="toggle-filter" onClick={()=>{toggleFilter()}}>
        <FontAwesomeIcon icon={faFolder}/>
        <p>{filter === "active" ? "Activas" : "Borradas"}</p>
      </button>
      <button className="add-table" onClick={()=>{setPopUp(true)}}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </>
    }
    <Span/>
  </nav>
}