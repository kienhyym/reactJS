async function waitForServer(api, auth, setAtuh, timeout = 60000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        try {
            const response = await api();
            if (response.status === 200) {
                console.log("Server ready");
                setAtuh({ ...auth, loading: false })
                if (response && response.data) return response.data;
                return response;
            }
        } catch (err) {
            console.log("Server not ready, retrying...");
        }

        await new Promise(r => setTimeout(r, 3000)); // chờ 3s rồi thử lại
    }

    throw new Error("Server did not start in time");
}
async function startApp(api, auth, setAtuh) {
    try {
        setAtuh({ ...auth, loading: true })
        return await waitForServer(api, auth, setAtuh);

    } catch (err) {
        console.error("Server failed to start");
    }
}
export {
    startApp,
}