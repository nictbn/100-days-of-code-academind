const { ObjectId } = require('mongodb');
const db = require('../data/database');
class Post {
    constructor(title, content, id) {
        this.title = title;
        this.content = content;
        if (id) {
            this.id = new ObjectId(id)
        }
    }

    async upsert() {
        let result;
        if (this.id) {
            result = await db
                .getDb()
                .collection('posts')
                .updateOne(
                            { _id: this.id },
                            { $set: { title: this.title, content: this.content } }
                        );
        } else {
            result = await db.getDb().collection('posts').insertOne({
                title: this.title,
                content: this.content,
            });
        }        
        return result;
    }

    async delete() {
        if (!this.id) {
            return;
        }
        return await db.getDb().collection('posts').deleteOne({ _id: this.id });
    }
}

module.exports = Post;