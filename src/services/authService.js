const BASE_URL = `${import.meta.env.VITE_BACK_END_URL}/auth`;

const signUp = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/sign-up`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error)
        };

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("invalid response from server");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("invalid response from server");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const signOut = () => {
  localStorage.removeItem("token");
};

export { signUp, signIn, signOut };
