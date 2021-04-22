import React, { useEffect, useState } from 'react'


export default function StaticSaleInfo({ssale}){

    const [sale, setSale] = useState({});
    useEffect( () => {
        setSale({...ssale})
    }, [ssale])
    return(
        <table>
            {JSON.stringify(sale)}
        </table>
    )
}