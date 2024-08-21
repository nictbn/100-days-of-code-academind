const Quote = require('../models/quote.model');

async function getRandomQuote(req, res, next) {
    let randomQuote
    try {
        randomQuote = await Quote.getRandomQuote();
    } catch(error) {
        next(error);
        return;
    }
    res.json({
        quote: await Quote.getRandomQuote(),
    });
}

module.exports = {
    getRandomQuote: getRandomQuote,
}