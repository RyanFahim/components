const showHandoverRequestAPI = async () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTNlODlmYTY2ZjQ4ZGM4NzkzOGFjNCIsImVtYWlsIjoidGFudmlyYXVuanVtMDMwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJUYW52aXIiLCJsYXN0X25hbWUiOiJTdW5ueSIsImNvbnRhY3RfbnVtYmVyIjoiMDE4MzE1Mzg3NzEiLCJvcmdhbml6YXRpb24iOiI2Mzg4MWM1YjljNDg5NjQyZGY3ZTlmYzEiLCJvcmdhbml6YXRpb25fbmFtZV9lbiI6IkJyYXppbCBiZCIsIm9yZ2FuaXphdGlvbl9uYW1lX2pwIjoiQnJhemlsIGpwIiwicGVybWlzc2lvbiI6IjYzOGQ2OGViZGUzZjgwNDYyMzg2MDY0ZiIsImlhdCI6MTY3MzU3ODkyOSwiZXhwIjoxNjczNjExMzI5fQ.b1kj4uTiKcudFSPZowHDbfhIjrC9C80VnY7dC8K-S_Q"
    const res = await fetch("https://tracktest.ultra-x.jp/handover/handover/showhandoverRequest",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
 
          }
    });

    const data = await res.json();
    console.log("Handover request data is ", data)
    return data;
}

export default showHandoverRequestAPI;