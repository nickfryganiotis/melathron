import {React} from 'react';


export default function StaticInfo( {customer} ){
    return(
        <table>
            {Object.keys(element).map((key, index) => {
              return (
                <tr>
                  <th>{key}</th>
                  <th><input type="text" placeholder ={element[key]} /></th>
                </tr>
              );
            })}
          </table>
    )
}