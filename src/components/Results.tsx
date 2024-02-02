import { Item, TablesType } from '../vite-env'

type Props = {
    Tables: TablesType
}

export default function Results({Tables}: Props) {
    let list = []

    const calculateTotal = (buys: Item[])=>{
        let total = 0
        for(let i=0; i < buys.length; i++) {
            total += buys[i].price * buys[i].amount!
        }
        realTotal += total
        return total
    }

    let realTotal = 0

    if(Tables) {
        for(const key in Tables) {
            let tabl = Tables[key]
    
            let item = <div key={Math.random()} className={tabl.state === "active" ? 'table-button active-table' : 'table-button unactive-table'}>
                <p>Mesa {tabl.number}</p>
                <p>${calculateTotal(tabl.buys)}</p>
            </div>
            list.push(item)
        }
    } 

  return <div className='results-list'>
    {list}
    <hr></hr>
    <div className='total-result'>
        <p>Total</p>
        <p>$ {realTotal}</p>
    </div>
  </div>
}