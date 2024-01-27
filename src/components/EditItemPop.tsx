import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Item } from '../vite-env'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type Props = {
    item: Item| undefined
    close: Function 
    confirm: Function
}

let input1 = ""
let input2 = ""

export default function EditItemPop({item, close, confirm}: Props) {
    return item !== undefined && <div className="pop-background" onClick={(e)=>{
            let el = e.target as HTMLElement
            if(el.className! === "pop-background") close()
        }}>
        <div className='pop'>
            <div className='d-flex'>
                <h3 className='mr-auto'>{item.name}</h3>
                <button onClick={()=>{close()}}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <hr></hr>
            <label>Unidades</label>
            <input placeholder='Unidades' type='number' defaultValue={item.amount} onChange={(e)=>{input1=e.currentTarget.value}}/>
            <label>Precio</label>
            <input placeholder='Precio' type='number' defaultValue={item.price} onChange={(e)=>{input2=e.currentTarget.value}}/>
            <button onClick={()=>{
                confirm(item,input1,input2 )
                input1 = ""
                input2 = ""
            }}>Confirmar</button>
        </div>
    </div>
}