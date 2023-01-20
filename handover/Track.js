import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ShowTrackApi from '../API/ShowTrackApi.jsx'

import "./track.css"

const Track = () => {
    const [trackData, setTrackData] = useState([]);
    const number = 0;

    const [isDisable, setIsDisable] = useState(false);



    /***====> API CALLING FOR SHOWING ALL TACK LIST UNDER THE PROJECT ID STARTS <====***/

    useEffect(() => {
        const FetchOrganizationData = async () => {
            const allData = await ShowTrackApi();
            
            if (allData.success === true) {
                setTrackData(allData.body)
            }
            
        }
        FetchOrganizationData();
    }, [])
    
    /***====> API CALLING FOR SHOWING ALL TACK LIST UNDER THE PROJECT ID ENDS <====***/

    

    async function approveTrack(track, project,status) {
        const res = await fetch(
            // "https://tracktest.ultra-x.jp/handover/backend/handover/createHandover",
            "https://tracktest.ultra-x.jp/handover/handover/createHandover",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
                },
                body: JSON.stringify({
                    project_id: project,
                    track_id: track,
                    devices: ["63884471d41c341537de4b68", "63b5496e0253fda9f8ac7935"],
                    select_organization: "638589e1c005a7cdef58d26d",
                    status: status,
                    active: false
                })
            }
        );
        setIsDisable(true)

        const value = await res.json();
        console.log("1st" + JSON.stringify(value, null, 2))

            const a =  value.success;
            console.log("a is ", a)
            return a;
       

    }


    return (
        <>



            <h2 className="track__h2">Track IDs</h2>
            <table className="track__table">
                <tr style={{ color: "white", backgroundColor: "#5b9346" }}>
                    <th>#</th>
                    <th> Track ID</th>
                    <th> Project ID</th>
                    <th> Registration time</th>
                    <th> Complete time</th>
                    <th> Status</th>
                    <th>Action</th>
                </tr>

                {trackData.map((t) => {
                    return (
                        <>
                            <tr>
                                <td>{number}</td>
                                <td> {t._id} </td>
                                <td> {t.project._id} </td>
                                <td> {t.track_start_date} </td>
                                <td> {t.track_end_date} </td>
                                <td> {t.status} </td>
                                <td>


                                    <button 
                                    className = "handover__button"
                                    // className={isDisable? "handover__button-disable" :"handover__button"}
                                    onClick={() => 
                                    {
                                        const a =approveTrack(t._id, t.project._id, t.status)
                                        // console.log(a)
                                        console.log("asda", a.Promise)
                                        } }
                                    
                                    // disabled={isDisable}
                                    // disabled = {disable? true : false}
                                    
                                    >Handover</button>

                                </td>
                            </tr>
                            {/* {number} = {number ++} */}
                        </>
                    )

                }
                )}
            </table>

            <NavLink to="track_req" target="_blank" style={{ display: "flex", justifyContent: "center", marginTop: "2rem", fontWeight: "600" }}>Go to the Track Request</NavLink>



        </>
    )
}

export default Track
