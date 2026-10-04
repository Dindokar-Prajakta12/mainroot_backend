export const createAuthToken = (user) => {
    const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    return `fake.${Buffer.from(JSON.stringify(payload)).toString("base64")}.token`;
};

export const decodeAuthToken = (token) => {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    try {
        return JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
    } catch (error) {
        return null;
    }
};
