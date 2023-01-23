import React from 'react'
import { useState, useEffect } from 'react'
import ShowhandoverReqStatus from '../API/ShowhandoverReqStatus';
// import ShowhandoverReqStatus from "../API/ShowhandoverReqStatus"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ShowOrganizationApi from '../API/ShowOrganizationApi';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrgHandoverAccepted = () => {

  /**FOR MUI START**/
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [handoverClickId, setHandoverClickId] = useState(null)
  /**FOR MUI END**/

  const [orgData, setOrgData] = useState([])
  const [orgSelection, setOrgSelection] = useState("gygu");

  console.log("org ", orgData)


  const [handoverStatus, setHandoverStatus] = useState([]);
  console.log("ade ", orgSelection)


  /** ===> API CALL FOR ORGANIZATION SELECTION START <=== **/

  useEffect(() => {
    const fetchOrgApi = async () => {
      const showOrgData = await ShowOrganizationApi();

      if (showOrgData.success == true) {
        setOrgData(showOrgData.body)

        console.log("all org data are" + JSON.stringify(showOrgData.body))
      }
    }
    fetchOrgApi()
  }, [])

  /** ===> API CALL FOR ORGANIZATION SELECTION END <=== **/




  useState(() => {
    const GethandoverReqStatus = async () => {
      const allData = await ShowhandoverReqStatus();
      console.log(allData.body)

      if (allData.success === true) {
        setHandoverStatus(allData.body)
      }
    }

    GethandoverReqStatus();
  }, [])






  async function getReturnHandover(h_id) {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTNlODlmYTY2ZjQ4ZGM4NzkzOGFjNCIsImVtYWlsIjoidGFudmlyYXVuanVtMDMwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJUYW52aXIiLCJsYXN0X25hbWUiOiJTdW5ueSIsImNvbnRhY3RfbnVtYmVyIjoiMDE4MzE1Mzg3NzEiLCJvcmdhbml6YXRpb24iOiI2Mzg4MWM1YjljNDg5NjQyZGY3ZTlmYzEiLCJvcmdhbml6YXRpb25fbmFtZV9lbiI6IkJyYXppbCBiZCIsIm9yZ2FuaXphdGlvbl9uYW1lX2pwIjoiQnJhemlsIGpwIiwicGVybWlzc2lvbiI6IjYzOGQ2OGViZGUzZjgwNDYyMzg2MDY0ZiIsImlhdCI6MTY3MzU3ODkyOSwiZXhwIjoxNjczNjExMzI5fQ.b1kj4uTiKcudFSPZowHDbfhIjrC9C80VnY7dC8K-S_Q"

    const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/returnHandover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
      },
      body: JSON.stringify({
        handover_id: h_id
      })

    });
    const value = await res.json()
    console.log("The return handover value is ", value);
    // return value
  }



  function HandleOrganizationSelection(h_id) {

    setOpen(true);
    console.log("hId is", h_id);
    setHandoverClickId(h_id)



  }

  /** ====>API FOR SECOND LAYER HANDOVER CALLING START <==== **/
  
 async function approveNextHandover(h_id, h_org) {
    // console.log("ID and Org Id are ", h_id, h_org)

    const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/secondLayerHandover",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${
          process.env.REACT_APP_TOKEN
        }`
      },

      body: JSON.stringify({
        handover_id: h_id,
        secondLayer_request_to : h_org
      })

    });
    const value = await res.json();
    console.log("The next layer handover data is ", JSON.stringify(value))
    setOpen(false)
  }
  
  /** ====>API FOR SECOND LAYER HANDOVER CALLING END <==== **/

  return (

    <>

      <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2">
           Organization selection for {handoverClickId}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Select  <br />

            <select value={orgSelection} onChange={e => (setOrgSelection(e.target.value))}>
              <option></option>
              {orgData.map((o) =>
                <option value={o._id}>{o.name_en}</option>
              )}

            </select> <br />

            {/* <select onChange={e => (setOrgSelection = (e.target.value))}
            
            >
              <option></option>

              {orgData.map((o) =>
                <option value={o._id}>{o.name_en}</option>
              )}


            </select> */}


            <Button onClick={() => approveNextHandover(handoverClickId, orgSelection)} >Submit</Button>
            <Button onClick={handleClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>

      <h2 className="track-req__h2">Requested Handover</h2>

      <table className="track-req__table">
        <tr style={{ color: "white", backgroundColor: "#2471A3" }}>
          <th>Handover ID</th>
          <th>Track ID</th>
          <th>Status</th>
          <th>Next layer Status</th>
          <th>Action</th>
          <th></th>
        </tr>


        {handoverStatus.map((h) => {
          return (
            <>
              <tr>
                <td>{h._id}</td>
                <td>{h.track_id}</td>
                <td>{h.status}</td>
                <td>
                  {h.status_for_nextlayer}
                   {/* {h.status_for_nextlayer ==="Task Completed"? <button className='hadndover__button' style={{marginLeft:"5px"}}
                   disabled={h.status_for_nextlayer ==="Task Completed" && h.status === "Task Completed"? true:false }
                   onClick={() => getReturnHandover(h._id)} >Return</button>:""} */}
                </td>
                <td>
                  <button
                    className="handover__button"
                    onClick={() => getReturnHandover(h._id)}
                    disabled={h.status === "Task Completed" 
                    || h.status_for_nextlayer == "Handovered Request is pending" 
                    || h.status_for_nextlayer === "Handover Request accepted" ? true : false}
                  >
                    {h.status === "Task Completed" ? "Completed" : "Return"}
                  </button>

                </td>
                <td>
                  <button className="handover__button" style={{ margin: "0 2px" }} 
                  onClick={() => HandleOrganizationSelection(h._id)} 
                  disabled={h.status_for_nextlayer == "Handovered Request is pending" 
                  || h.status === "Task Completed" 
                  || h.status_for_nextlayer === "Task Completed"
                  || h.status_for_nextlayer === "Handover Request accepted" ? true : false}
                  >
                    Handover
                  </button>
                </td>
              </tr>
            </>
          )
        })}

      </table>
    </>
  )
}

export default OrgHandoverAccepted
