const db = require('../data/database');
const mongodb = require('mongodb');

class Product {
    
    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();
        return products.map(function(productDocument) {
            return new Product(productDocument);
        });
    }

    static async findById(productId) {
        let prodId;
        try {
            prodId = new mongodb.ObjectId(productId);
        } catch (error) {
            error.code = 404;
            throw error;
        }
    
        const productDocument = await db.getDb().collection('products').findOne({_id: prodId});
        if (!productDocument) {
            const error = new Error('Could not find product with provided id.');
            error.code = 404;
            throw error;
        }
        const product = new Product(productDocument);
        return product;
    }

    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description; 
        this.image = productData.image; // more specifically, the name of the image
        this.updateImageData();
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    updateImageData() {
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        }

        if (this.id) {
            const productId = new mongodb.ObjectId(this.id);

            if (!this.image) {
                delete productData.image;
            }

            await db.getDb().collection('products').updateOne({_id: productId},
            {
                $set: productData
            });
        } else {
            await db.getDb().collection('products').insertOne(productData);
        }
    }

    replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }
}

module.exports = Product;