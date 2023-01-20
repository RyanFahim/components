import React from 'react'
import { useState, useEffect } from 'react'
import showHandoverRequestAPI from '../API/showHandoverRequestAPI'


const HandoverRequest = () => {


    const [handoverReq, setHandoverReq] = useState([])


    /**====> SHOWING ALL HANDOVER API STARTS  <====* */

    useEffect(()=>{
        const GetHandoverRequest = async () =>{
            const allData = await showHandoverRequestAPI();
            console.log(allData.body);

            if (allData.success === true){
                setHandoverReq(allData.body)
            }
        }
        GetHandoverRequest();
    },[])

    /**====> SHOWING ALL HANDOVER API ENDS  <====* */




    /**====> ACCEPTENCE OF HANDOVER API STARTS  <====* */

    async function handoverRequestAccept(h_id){
        const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/handoverAcceptence",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
            },
            body: JSON.stringify({
                handover_id: h_id
            })
        });
        const value = await res.json();
        console.log("Accepted handover id is " + h_id)
        return value
    }

    /**====> ACCEPTENCE OF HANDOVER API ENDS  <====* */




    async function rejectHandover(h_id){

        const respond = await fetch("https://tracktest.ultra-x.jp/handover/handover/rejectHandover",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
            },
            body: JSON.stringify({
                handover_id: h_id
            })
        });
        const value = await respond.json();
        console.log("Rejected handover id is ", h_id)
        return value
    }




  return (
    <>



            <h2 className="track__h2">Handover Requests</h2>
            <table className="track__table">
                <tr style={{ color: "white", backgroundColor: "#2471A3" }}>
                  
                    <th> Handover ID</th>
                    <th> Track ID</th>
                    {/* <th> Project ID</th> */}
                    <th> Request To</th>
                    <th> Status</th>
                    <th>Action</th>
                    <th></th>
                </tr>

               {handoverReq.map((h)=>{

               
                    return (
                        <>
                            <tr>
                              
                                <td> {h._id} </td>
                                <td> {h.track_id} </td>
                                {/* <td> {h.project} </td> */}
                                <td> {h.request_to} </td>
                                <td> {h.status} </td>
                                <td>


                                    <button 
                                    className="handover__button"
                                    style={{margin:"0 4px"}}
                                    onClick={() => handoverRequestAccept(h._id)}
                                    disabled = {h.status === "Handover Request accepted"
                                     || h.status == "Handover Request Rejected" 
                                     || h.status === "Task Completed" ? true: false}
                                    >
                                    {h.status === "Handover Request accepted" ? "Running": "Accept"}
                                    </button>

                                    
                                   </td>
                                   <td>    
                               
                                <button 
                                    className="handover__button"
                                    style={{margin:"0 4px"}}
                                    onClick={()=>rejectHandover(h._id)}
                                    disabled = {h.status == "Handover Request Rejected" || h.status === "Handover Request accepted" 
                                    || h.status === "Task Completed"
                                    ? true : false}
                                    >
                                        {h.status == "Handover Request Rejected"? "Rejected" : "Reject"}
                                    </button>

                                </td>

                                {/* <td>
                                    <button 
                                    className="handover__button"
                                    disabled = {h.status === "Handover Request accepted" 
                                    || h.status == "Handover Request Rejected" 
                                    || h.status === "Task Completed"? true: false}
                                    >Handover</button>
                                </td> */}
                            </tr>
                            
                        </>
                    )

                })}



                
            </table>

            



        </>
  )
}

export default HandoverRequest
