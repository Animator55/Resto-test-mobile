import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = { objetive: string, close: Function }

export default function LoadingPop({ objetive, close }: Props) {
    React.useEffect(()=>{
        setTimeout(()=>{
            let pop = document.querySelector(".pop.d-none")
            pop?.classList.remove("d-none")
        }, 400)
    })

    return <div className='pop-background loading' onClick={(e) => {
        let el = e.target as HTMLElement
        if (el.className! === "pop-background") close()
    }}>
        <FontAwesomeIcon className='icon-loading' icon={faCircleNotch} size='xl' spin/>
        <div className='pop d-none'>
            <h4>{objetive === "guardar" ? 
                "Sus datos han sido guardados, puede cerrar la página y se mantendrán."
                : 
                "Sus datos han sido eliminados, si quiere revertirlo, guarde los datos actuales."
            }</h4>
            <button onClick={() => { close() }}>
                Listo
            </button>
        </div>
    </div>
}