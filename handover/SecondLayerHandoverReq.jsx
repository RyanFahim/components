import React, { useEffect } from 'react'
import { useState } from 'react'
import ShowSecondHORequestAPI from '../API/ShowSecondHORequestAPI'

const SecondLayerHandoverReq = () => {

const [secondHOreq, setSecondHOReq] = useState([])

/** ====> API CALL FOR SECOND LAYER HO REQUEST START <==== **/

useEffect(()=>{
  const fetchSecondHOReq = async () =>{
    const showSecondHandOverReq = await ShowSecondHORequestAPI();
    console.log(showSecondHandOverReq)

    if (showSecondHandOverReq.success == true){
      setSecondHOReq(showSecondHandOverReq.body)

      console.log("Second HO request is ", showSecondHandOverReq.body)


    }
  }

  fetchSecondHOReq()
},[])

/** ====> API CALL FOR SECOND LAYER HO REQUEST END <==== **/



 /** ===> API FOR APPROVING SECOND LAYER HANDOVER STARTS <===* */

 async function approveNextHO(h_id){
  
  const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/acceptHandoverSecondLayer",{
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
      },
      body: JSON.stringify({
        handover_id: h_id,
        
      })
  });

  const value = await res.json();
  console.log("Approved second layer HO ID is ", JSON.stringify(value, null, 2))

  return value

 }

 /** ===> API FOR APPROVING SECOND LAYER HANDOVER ENDS <===* */
 
 
 /** ===> API FOR REJECING SECOND LAYER HANDOVER STARTS <===* */
 
 async function rejectNextHo(h_id){

  const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/rejecthandoverSecondlayer",{
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
      },
      body: JSON.stringify({
        handover_id: h_id,
        
      })
  });

  const value = await res.json();
  console.log("Rejected second layer HO ID is ", JSON.stringify(value, null, 2))

  return value

   
}

/** ===> API FOR REJECING SECOND LAYER HANDOVER ENDS <===* */



async function returnNextHo(h_id){
  
  const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/returnHandovertoPreviousOrganization",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
    },
    body: JSON.stringify({
      handover_id: h_id,
      
    })
  });
  const value = await res.json();
  console.log("Return handover is ", JSON.stringify(value,null,2))

}



  return (
    <>
      <h2 className="track-req__h2">Second Layer Handover Req</h2>

      <table className="track-req__table">
        <tr  style={{ color: "white", backgroundColor: "#882588" }}>
          <th>Handover ID</th>
          <th>Track ID</th>
          <th>Status</th>
          <th>Requested From</th>
          <th>Action</th>
          <th>Refuse</th>
          <th>Return</th>
          

        </tr>

        {secondHOreq.map((s)=>{
          return(
            <>
              <tr>
                <td> {s._id} </td>
                <td> {s.track_id} </td>
                <td> {s.status_for_nextlayer} </td>
                <td> {s.secondLayer_request_by} </td>
                <td> 
                  <button
                  className="handover__button"
                  onClick={()=> approveNextHO(s._id) }
                  disabled={s.status_for_nextlayer === "Handover Request accepted" 
                  || s.status_for_nextlayer === "Task Completed" 
                  || s.status_for_nextlayer === "Handover Request Rejected"? true:false}
                  >Accept
                  </button>  
                </td>
                <td> 
                  <button
                  className="handover__button"
                  onClick={()=> rejectNextHo(s._id)}
                  disabled={s.status_for_nextlayer === "Handover Request accepted" 
                  || s.status_for_nextlayer === "Task Completed"
                  || s.status_for_nextlayer === "Handover Request Rejected" ? true:false}
                  >Refuse</button>  
                </td>
                <td> 
                  <button
                  className="handover__button"
                  onClick={()=> returnNextHo(s._id)}
                  disabled ={s.status_for_nextlayer === "Handover Request accepted"
                  ? false: true}
                  >Return</button>  
                </td>

             

              </tr>
            </>
          )
        })}

      </table>
    </>
  )
}

export default SecondLayerHandoverReq
