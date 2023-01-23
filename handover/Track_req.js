import React, { useEffect, useState } from 'react'
import ShowHandoverAPI from '../API/ShowHandoverAPI'
import ShowOrganizationApi from '../API/ShowOrganizationApi';


const Track_req = () => {

  /**===> USING USTATE FOR HANDOVER DATA TO MAP <=== */
  const [handoverData, setHandoverData] = useState([])


  /**useState for ORGANIZATION */
  const [organizationData, setOrganizationData] = useState([])



 


  /**===> API CALLING START <=== */

  useEffect(() => {

    const fetchHandoverTableData = async () => {
      const showHandoverData = await ShowHandoverAPI();

      if (showHandoverData.success == true) {
        // console.log(JSON.stringify(handoverData, null, 2))
        setHandoverData(showHandoverData.body)
      }
    }
    fetchHandoverTableData();
  }, [])

  /**===> API CALLING END <=== */






  /** ===> API CALL FOR ORGANIZATION SELECTION START <=== **/

  useEffect(() => {
    const fetchOrganizationApi = async () => {
      const showOrganizationData = await ShowOrganizationApi();

      if (showOrganizationData.success == true) {
        
        setOrganizationData(showOrganizationData.body)
        // console.log(JSON.stringify(organizationData.body, null, 2))

      }
    }
    fetchOrganizationApi();
  }, [])

  /** ===> API CALL FOR ORGANIZATION SELECTION END <=== **/





  /** ===> API SEND FOR APPROVING HANDOVER STARTS <===* */

  async function approveHandover(h_id, h_org) {
    
    const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/approveHandover",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
      },
      body: JSON.stringify({
        handover_id: h_id,
        request_to: h_org
      })
    });
    const value = await res.json();
    console.log("Approve handover data is " + JSON.stringify(value, null, 2))
    // console.log(h_org)
    return value
  }


  /** ===> API SEND FOR APPROVING HANDOVER ENDS <===* */



  return (

    <>

      <h2 className="track-req__h2">Handover table</h2>

      <table className="track-req__table">
        <tr style={{ color: "white", backgroundColor: "#5b9346" }}>
          <th>Handover ID</th>
          <th>Track ID</th>
          {/* <th>Project ID</th> */}
          <th>Status</th>
          <th>Org</th>
          <th>Action</th>
        </tr>

        {handoverData.map((h, index) => {




          return (
            <>
              
              <tr id={h.track_id}>
                <td> {h._id} </td>
                <td> {h.track_id} </td>
                {/* <td> {h.project} </td> */}
                <td> {h.status} </td>
                
                <td>
                  
                 
                  <select onChange={e => (h._org = (e.target.value))}
                  
                  >
                    <option></option>
                    
                    {organizationData.map((o) =>
                      <option value={o._id}>{o.name_en}</option>
                    )}


                  </select>
                 

                </td>


                {/* Future work with org */}


                <td>

                  <button
                    className="handover__button"
                    onClick={() => approveHandover(h._id, h._org)}
                    
                  >  Send </button>

                </td>

              </tr>
            </>
          )
        })}
      </table>

     
    </>
  )
}

export default Track_req
