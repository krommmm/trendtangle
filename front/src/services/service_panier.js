import { HOST } from "../global.config.js";

export async function getOnePanier(token) {
    try {
        const preRes = await fetch(`${HOST}/api/panier/getpanier`, {
            method: "POST",
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

export async function addToPanier(data, token) {
    try {
        const preRes = await fetch(`${HOST}/api/panier/add`, {
            method: "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
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

export async function deleteItemsFromPanier(data, token) {
    console.log(data);
    console.log(token);
    try {
        const preRes = await fetch(`${HOST}/api/panier/deleteitems`, {
            method: "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
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

export async function deletePanier(token) {
    try {
        const preRes = await fetch(`${HOST}/api/panier/delete`, {
            method: "DELETE",
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