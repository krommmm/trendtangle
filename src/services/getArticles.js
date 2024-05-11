async function getArticles(){
    const preRes = await fetch("http://localhost/api_multi/api/trendtangle/articles");
    const res = await preRes.json();
    return res;
};  

export default getArticles;