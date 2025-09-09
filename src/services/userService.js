const BASE_URL = `${import.meta.env.VITE_BACK_END_URL}/user`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMyProfile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateMyProfile = async (profileData) => {
    try {
        const res = await fetch(`${BASE_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(profileData)
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error)
        }

        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export {
    index,
    getMyProfile,
    updateMyProfile,
}

