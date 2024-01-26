import React from 'react'

type Props = {
    close: Function
    confirm: Function
}

export default function AddTable({close, confirm}: Props) {
    const input = React.useRef<null | HTMLInputElement>(null)
    React.useEffect(()=>{
        if(input !== null && input.current !== null) input.current.focus()
        document.addEventListener("keydown", (e)=>{
            if(e.key === "Escape") close()  
        })
    }, [])

    const submit = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(!input.current || e.key === "+" || e.key === "-" ) return e.preventDefault()
        if(!isNaN(Number(e.key))) {
            let value = Number(input.current.value + e.key)
            if(value > 100 
            || value < 1 
            && input.current.value !== "") return e.preventDefault()
        }
        if(e.key === "Enter") confirm(input.current.value)
    }
    
    return <div className='pop-background' onClick={(e)=>{
            let el = e.target as HTMLElement
            if(el.className! === "pop-background") close()
        }}>
        <div className='pop'>
            <h2>Añadir mesa</h2>
            <hr/>
            <input ref={input} type='number' onKeyDown={submit} placeholder='Número de mesa' min="1" max="50"/>
            <button onClick={()=>{
                if(input.current) confirm(input.current.value)
            }}>
                Confirmar
            </button>
        </div>
    </div>
    }