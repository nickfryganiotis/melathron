import React, {useState, useEffect} from 'react'
import {timeConverter} from '../helperFunctions'

export default function DosesInfo({dosess}){

    const [doses, setDoses] = useState([])

    useEffect( () => {
        setDoses([...dosess])
    }, [dosess])

    return(
        <div>
            <table>
                <th>ΑΡΙΘΜΟΣ ΔΟΣΗΣ</th>
                <th>ΠΟΣΟ ΔΟΣΗΣ</th>
                <th>ΠΛΗΡΩΘΕΝ ΠΟΣΟ</th>
                <th>ΠΡΟΘΕΣΜΙΑ ΕΞΟΦΛΗΣΗΣ ΔΟΣΗΣ</th>
                <th>ΗΜΕΡΟΜΗΝΙΑ ΕΞΟΦΛΗΣΗΣ</th>
                <th>ΜΕΘΟΔΟΣ ΠΛΗΡΩΜΗΣ</th>
            {doses.map((element) => {
                return(
                    <tr>
                        <td>{element["dose_number"]}</td>
                        <td>{element["dose_amount"]}</td>
                        <td>{element["payment_amount"]}</td>
                        <td>{timeConverter(element["dose_deadline"])}</td>
                        <td>{timeConverter(element["payment_date"])}</td>
                        <td>{element["payment_method"]}</td>
                    </tr>
                )
            })}
            </table>
        </div>
    )

}