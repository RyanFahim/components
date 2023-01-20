const ShowSecondHORequestAPI = async () =>{
    const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/showUnacceptedHandoverSecondLayer",{
        method:"POST",
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json" ,  
        "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
    },
    });

    const data = await res.json();
    console.log(data);
    return data;
}

export default ShowSecondHORequestAPI