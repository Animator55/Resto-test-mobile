import React from 'react'
import { Table, TablesType } from '../vite-env'

type Props = {
    historial: Table | undefined
}

export default function Historial({ historial }: Props) {

    return <div>
            {historial && historial.historial.map(item=>{
                return <div className='historial-block' key={Math.random()}>
                    <p>{item.timestamp}</p>
                    {item.change.map((el: string[][])=>{
                        return <div className='d-flex' key={Math.random()}>
                            <p>{el[0]}</p>
                            <p>{el[1]}</p>
                        </div>
                    })}
                </div>
            })}
        </div>
}