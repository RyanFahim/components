import React, { useState } from 'react'
import Track_data from './data'
import SingleSelect from './SingleSelect'
// import awards from "./data"
import Select_data from './data2'

const Track_req = () => {
  // console.log("From track request ", Track_data)
  // console.log("The select Data is  ", Select_data)

  const [selectData, setSelectData] = useState('')
  const [values, setValues] = useState([])
  const [option, setOption] = useState()
  const [aID, setAID] = useState(0)
  const [number, setNumber] = useState(0);

console.log("parent select data ", selectData)
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    // console.log(Select_data);
    <>

      <h2 className="track-req__h2">Handover table</h2>

      <table className="track-req__table">
        <tr style={{ color: "white", backgroundColor: "#5b9346" }}>
          <th>Track ID</th>
          <th>Project ID</th>
          <th>Reuse Track ID</th>
          {/* <th>Org</th> */}
          <th>Select Org</th>
          <th>Action</th>
        </tr>

        {Track_data.map((t, index) => {

          
         
          console.log({option}, t.track_id, number)
          return (

            <tr  id={t.track_id}>
              <td> {t.track_id} </td>
              <td> {t.project_id} </td>
              <td> {t.reuse_trackid} </td>
              {/* <td>
                { t.track_id?"Ultax-x BD" : "BJIT"}
              </td> */}
              {/* <td> {selectData} </td> */}
              <td>
                <SingleSelect key={index} selectDataX={selectData} setSelectData={setSelectData} t={t.track_id} number={number} setNumber={setNumber} />
                {/* <p>{ t.track_id ===  ? selectData: "BJIT"}</p> */}
                





              </td>

              <td>
                <button className="handover__button"> Send </button>
              </td>

            </tr>
          )
        })}
      </table>





    </>
  )
}

export default Track_req
