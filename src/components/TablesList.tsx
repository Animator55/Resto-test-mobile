import { faClock, faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TablesType } from "../vite-env"
type Props = {
    Tables: TablesType
    setSelected: Function
    selectedTable: string | undefined
    OpenHistorial: Function
    archivate: Function
    filter: string
}

export default function TablesList({Tables, setSelected, selectedTable, OpenHistorial, archivate, filter}: Props) {

    return <ul className="tables-list">
        {Object.values(Tables).map(tabl=>{
            return tabl.state === filter && <li 
                className={selectedTable && tabl._id === selectedTable ? "table-button active" : "table-button"} 
                key={Math.random()} 
                onClick={(e)=>{
                    const el = e.target! as HTMLElement
                    if(el.classList!.contains("table-button")) setSelected(tabl._id)
                }}
            >
                <p style={{pointerEvents: "none"}}>Mesa {tabl.number}</p>
                {tabl.historial.length !== 0 && <h6>Última vez {tabl.historial[tabl.historial.length-1].timestamp}</h6>}
                <button onClick={()=>{OpenHistorial(tabl._id)}}><FontAwesomeIcon icon={faClock}/></button>
                {tabl.state === "active" ? 
                    <button onClick={()=>{archivate(tabl._id, false)}}><FontAwesomeIcon icon={faTrash}/></button>
                    :
                    <button onClick={()=>{archivate(tabl._id, true)}}><FontAwesomeIcon icon={faTrashArrowUp}/></button>
                }
            </li>
        })}
    </ul>
}