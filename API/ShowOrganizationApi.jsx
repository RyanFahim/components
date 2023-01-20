const ShowOrganizationApi = async () => {
    const res = await fetch("https://trackdev3.ultra-x.jp/backend/organizations/showAllOrganizations",{

    method:"POST",
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json" ,  
        "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
    },

    });

    const data = await res.json();
    return data;
}

export default ShowOrganizationApi