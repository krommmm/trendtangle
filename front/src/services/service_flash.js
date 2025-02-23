import { HOST } from "../global.config.js";


export async function createFlashOffer(data, token) {

    const preRes = await fetch(`${HOST}/api/flash`, {
        method: "PATCH",
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

}

export async function deleteFlashOffer(token) {

    const preRes = await fetch(`${HOST}/api/flash`, {
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

}

export async function getFlashOffer() {

    const preRes = await fetch(`${HOST}/api/flash`, {
        method: "GET",
        headers: {
            "Accept": "Application/json",
            "Content-Type": "Application/json",
        },
    });

    const res = await preRes.json();
    return {
        status: preRes.status,
        ok: preRes.ok,
        data: res
    };

}