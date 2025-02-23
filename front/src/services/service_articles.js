import { HOST } from "../global.config.js";

export async function getArticles() {
    try {
        const preRes = await fetch(`${HOST}/api/articles`, {
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

    } catch (err) {
        console.error(err);
    }
}

export async function getOneArticle(articleId) {
    try {
        const preRes = await fetch(`${HOST}/api/articles/${articleId}`, {
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

    } catch (err) {
        console.error(err);
    }
}

export async function getArticlesByPanier(token) {
    try {
        const preRes = await fetch(`${HOST}/api/articles/articlesByPanier`, {
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

export async function createArticle(data, token) {

    const preRes = await fetch(`${HOST}/api/articles`, {
        method: "POST",
        headers: {
            "Accept": "Application/json",
            "Authorization": `Bearer ${token}`
        },
        body: data,
    });
    const res = await preRes.json();
    return {
        status: preRes.status,
        ok: preRes.ok,
        data: res
    };


}

export async function deleteArticle(token, articleId) {
    try {
        const preRes = await fetch(`${HOST}/api/articles/${articleId}`, {
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

export async function modifyArticle(data, token, articleId) {
    try {
        const preRes = await fetch(`${HOST}/api/articles/${articleId}`, {
            method: "PATCH",
            headers: {
                "Accept": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: data
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

export async function handleLike(token, articleId) {
    try {
        const preRes = await fetch(`${HOST}/api/articles/${articleId}/likes`, {
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




export async function articlesByPanier(token) {
    try {
        const preRes = await fetch(`${HOST}/api/articles/articlesByPanier`, {
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


export async function articleBySearch(searchTerms) {

    try {
        const preRes = await fetch(`${HOST}/api/articles/articlesBySearch?searchedArticles=${encodeURIComponent(searchTerms)}`, {
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

    } catch (err) {
        console.error(err);
    }
}