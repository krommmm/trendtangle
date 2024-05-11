async function getArticles(){
    const preRes = await fetch("https://gobliiins.fr/api/trendtangle/articles");
    const res = await preRes.json();
    return res;
};  

export default getArticles;