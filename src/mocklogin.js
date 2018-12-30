class BadLogin extends Error {
    constructor(message) {
        super(message);
        this.name = "BadLogin";
    }
}

const getStoredToken = () => {
    const token = localStorage.getItem("MentorQToken");
    if (token === "null") {
        return null;
    } else {
        return token;
    }
};

const setStoredToken = (token) => {
    return localStorage.setItem("MentorQToken", token);
};

const getToken = async (username, password) => {
    if (username !== "heman" || password !== "ghandi") {
        throw new BadLogin();
    }
    setStoredToken("one hashy boi");
    return "one hashy boi";
};

const tokenStillValid = async (token) => {
    return true;
};

export {
    BadLogin,
    getToken,
    tokenStillValid,
    getStoredToken,
    setStoredToken
}
