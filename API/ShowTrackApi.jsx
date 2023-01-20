const ShowTrackApi = async () => {
    const res = await fetch("https://tracktest.ultra-x.jp/backend/tracks/showAllActiveTracksOfFollowingProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${ 
          process.env.REACT_APP_TOKEN
         }`
      },
      body: JSON.stringify({
        // project_id: "636b79b7cee6e44870e0f08f"
        project_id : "6389bb8d739d2bcc55638e42"

      }),

    });

    const data = await res.json();
    console.log(data)
    return data;

}

export default ShowTrackApi