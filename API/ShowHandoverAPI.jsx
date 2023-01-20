const ShowHandoverAPI = async () => {

    
    const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/showUnapprovedHandover", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
        },

        // body: JSON.stringify({

        // })
    });

const data = await res.json();
// console.log("Access token" + data);
return data;
}

export default ShowHandoverAPI