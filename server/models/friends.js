const data = require('../data/friends.json');
const { connect } = require('./mongo');
const { ObjectId } = require('mongodb')

const COLLECTION_NAME = 'friends';

async function collection() {
    const client = await connect();
    return client.db('chopiphy').collection('friends');
}

async function getFriends(limit=30, skip=0) {
    const db = await collection();
    const data =await db.find().limit(limit).skip(skip).toArray();
    return {total:(await data).length, length: (await data).length, friends:data};
}

async function getFriend(id) {
    const db = await collection();
    const data = db.findOne({ _id:  new ObjectId(id)});
    return data;
}

async function seed(){
    const db = await collection();
    db.deleteMany();
    db.insertMany(data.friends);
    return 'success';
}
module.exports = {
    COLLECTION_NAME,
    collection,
    getFriends,
    getFriend,
    seed,
};
