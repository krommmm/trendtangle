import { HOST } from "../global.config.js";

export async function signUp(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };

    } catch (err) {
        console.error(err);
    }
}


export async function logIn(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/login`, {
            method: "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };

    } catch (err) {
        console.error(err);
    }
}

export async function isUserAdmin(token) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/isuseradmin`, {
            method: "GET",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const res = await preRes.json();
        return res;

    } catch (err) {
        console.error(err);
    }
}

export async function isUserConnected(token) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/isuserconnected`, {
            method: "GET",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };

    } catch (err) {
        console.error(err);
    }
}

export async function isUserOwner(token, userId, articleId) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/isuserowner`, {
            method: "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: userId,
                articleId: articleId
            })
        });
        const res = await preRes.json();
        return res;

    } catch (err) {
        console.error(err);
    }
}