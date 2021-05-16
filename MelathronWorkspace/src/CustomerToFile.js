import React, { useEffect } from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import {makeIntoExcel} from "./helperFunctions"

export default function CustomerToFile({customers}){

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8'
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData) => {
        const ws = XLSX.utils.json_to_sheet(csvData)
        const wb = { Sheets: { 'data': ws}, SheetNames: ['data']}
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer] , {type : fileType})
        FileSaver.saveAs(data, 'customers.xlsx' )
    }

    useEffect( () => {
        console.log(makeIntoExcel(customers))
    }, [])

    return(
        <div>
            <button onClick={(e) => exportToCSV(makeIntoExcel(customers))}>ΕΞΑΓΩΓΗ ΩΣ EXCEL</button>
        </div>
    )
}