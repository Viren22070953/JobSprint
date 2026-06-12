import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        console.log(err.response?.data);
        throw err;

    }

}

export async function login({ email, password }) {
  console.log("login api called", email, password);

  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    console.log("backend response:", response.data);
    return response.data;
  } catch (err) {
    console.log("login api error:", err.response?.data || err.message);
    throw err;
  }
}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
    }

}