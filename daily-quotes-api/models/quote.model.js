const db = require('../data/database');

class Quote {
    static async getRandomQuote() {
        const quotes = await db.getDb().collection('quotes').find().toArray();
        const index = Math.floor(Math.random() * quotes.length);
        return quotes[index].text;
    }
}

module.exports = Quote;