

export function getArticlesWithDiscountPrice(articles) {
    for (let i = 0; i < articles.length; i++) {

        if (articles[i].flash && articles[i].flash.state === true && articles[i].flash.sale > 0) {

            if (articles[i].discount && articles[i].discount > 0) {

                if (articles[i].flash.sale > articles[i].discount) {
                    let discount = parseFloat(articles[i].flash.sale);
                    const priceDiscounted = articles[i].price * (1 - (discount / 100));
                    articles[i].priceDiscounted = parseFloat(priceDiscounted.toFixed(2));
                    articles[i].discount = articles[i].flash.sale;
                } else {
                    let discount = parseFloat(articles[i].discount);
                    const priceDiscounted = articles[i].price * (1 - (discount / 100));
                    articles[i].priceDiscounted = parseFloat(priceDiscounted.toFixed(2));
                }
            } else {
                let discount = parseFloat(articles[i].flash.sale);
                const priceDiscounted = articles[i].price * (1 - (discount / 100));
                articles[i].priceDiscounted = parseFloat(priceDiscounted.toFixed(2));
                articles[i].discount = articles[i].flash.sale;
            }
        } else {
            let discount = parseFloat(articles[i].discount);
            const priceDiscounted = articles[i].price * (1 - (discount / 100));
            articles[i].priceDiscounted = parseFloat(priceDiscounted.toFixed(2));
        }
    }
    return articles;
}