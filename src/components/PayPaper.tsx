import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
    content: any
    close: Function
}

export default function PayPaper({ content, close }: Props) {
    React.useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") close()
        })
    }, [])

    const RenderContent = ()=>{
        let jsx = []

        for(const key in content) {
            if(key === "Total" || key === "Mesa") continue
            jsx.push(
                <li key={Math.random()}>
                    <p>{key}</p>
                    <p>{content[key]}</p>
                </li>
            )
        }

        return <ul>
            {jsx}
            <hr/>
            <li>
                <p>Total</p>
                <p>{content["Total"]}</p>
            </li>
        </ul>
    }

    let date =new Date()

    return <div className='pop-background' onClick={(e)=>{
        let el = e.target as HTMLElement
        if(el.className! === "pop-background") close()
    }}>
        <div className='pop'>
            <div className='d-flex'>
                <button onClick={()=>{close()}}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <h3>Mesa {content.Mesa}</h3>
                <h5>{date.getHours() +":"+ (date.getMinutes() > 10 ? "" : "0") +date.getMinutes()}</h5>
            </div>
            <hr></hr>
            <RenderContent/>
        </div>
    </div>
}