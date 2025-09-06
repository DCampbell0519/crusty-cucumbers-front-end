const BASE_URL = `${import.meta.env.VITE_BACK_END_URL}/user`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            } 
        })

        const data = res.json();

        if (data.error) {
            throw new Error(data.error)
        }

        return data
    } catch (error) {
        console.log(error)
    }
}

export {
    index,
}