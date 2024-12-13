import express from 'express';
import mongoose from "mongoose";
import ProductModel from './product.model.js';

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 30,
        require: true,
        unique: true,
    }
})

TagSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await ProductModel.updateMany({tags: doc._id}, {$pull: {tags: doc._id}});
    }
})

const TagModel = mongoose.model('Tag', TagSchema);
export default TagModel;