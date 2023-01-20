import React, { useState } from 'react'

const SingleSelect = (props) => {

    const [selectData, setSelectData] = useState();
    
    const [number, setNumber] = useState(props.t)

    // console.log("number is ",number)
    // console.log("org name ", selectData)
    console.log(number, selectData)
    
    return (
        <>
            <select value={selectData} onChange={e => setSelectData(e.target.value)} onClick={(e)=>props.setSelectData(e.target.value)} 
            // number = {setNumber(number)}
             >
                <option></option>
                <option>Ultra-X BD</option>
                <option>Ultra-X Asia Pacific</option>
                <option>BJIT</option>
                <option>Japan XD</option>
                <option>Tesla</option>
                

            </select>
            {/* <p>{selectData}</p> */}
        </>
    )
}

export default SingleSelect
