import React, { useState } from 'react'
import { useEffect } from 'react'
import ShowOwnCompanyHandoverStatus from '../API/ShowOwnCompanyHandoverStatus'

const HandoverSentStatus = () => {

    const [ownHandoverData, setOwnHandoverData] = useState([])


    useEffect(()=>{
        const FetachHandoverStatus = async() =>{
            const allData = await ShowOwnCompanyHandoverStatus();
            console.log("qwerty ", allData);

            if (allData.success == true){
                setOwnHandoverData(allData.body)
            }
        }
        FetachHandoverStatus();
    }, [])


  return (
    <>
    <h2 className="track__h2">My company Handover status</h2>
      <table className="track__table">
        <tr style={{ color: "white", backgroundColor: "#5b9346" }}>
            <th>Handover ID</th>
            <th>Track ID</th>
            {/* <th>Project ID</th> */}
            <th>Status</th>
        </tr>

        
        {ownHandoverData.map((o)=>{
            return(
                <>
                    <tr>
                        <td>{o._id}</td>
                        <td>{o.track_id}</td>
                        {/* <td>{o.project}</td> */}
                        <td>{o.status}</td>
                    </tr>
                </>
            )
        })}

      </table>
    </>
  )
}

export default HandoverSentStatus
