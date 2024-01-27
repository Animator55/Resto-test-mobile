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

    let time = date.getHours() +":"+ (date.getMinutes() > 10 ? "" : "0") +date.getMinutes()

    let dateString = date.getDate()+ "/"+ date.getMonth() + "/" + date.getFullYear()

    const copyPay = (e: React.MouseEvent)=>{
        let buys:string[] = []
        for(const key in content) {
            if(key === "Total" || key === "Mesa") continue
            buys.push("<LEFT>"+ key + "<RIGHT>"+content[key])
        }

        let result = "<CENTER><BIG>Club Vermut<BR><CENTER>Moreno 261<BR><CENTER>San Antonio de Areco<BR>" +
        "<RIGHT>" + dateString + "<BR>" +
        "<LEFT>Mesa " + content.Mesa + "<RIGHT>"+time+"<BR><LINE>" +
        buys.join("<BR>") +
        "<DLINE><BR>"+
        "<LEFT><BOLD>Total<RIGHT><BOLD>"+ content.Total
        "<BR><CUT>"
        navigator.clipboard.writeText(result);
        e.currentTarget.classList.add("copied")
    }

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
                <h5>{time}</h5>
                <button onClick={(e)=>{copyPay(e)}}>Copy</button>
            </div>
            <hr></hr>
            <RenderContent/>
        </div>
    </div>
}