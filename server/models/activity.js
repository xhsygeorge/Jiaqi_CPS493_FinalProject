const data = require('../data/activity.json');
const { connect } = require('./mongo');
const { ObjectId } = require('mongodb')

const COLLECTION_NAME = 'activity';

async function collection() {
    const client = await connect();
    return client.db('chopiphy').collection(COLLECTION_NAME);
}

async function getActivities(limit=20, skip=0) {
    const db = await collection();
    const data =await db.find().limit(limit).skip(skip).toArray();
    return {total:data.length, length:data.length, activities:data};
}

async function getActivity(id) {
    const db = await collection();
    const data = db.findOne({ _id:  new ObjectId(id)});
    return data;
}

async function addActivity(){
    const db = await collection();
    db.deleteMany();
    db.insertMany(data.activity);
    return 'success';
}

async function searchActivity(){
    const db = await collection();
    const data = db.find({activityname:{$regex: q, $options: 'i'}} ).toArray();
    return {total:data.length, length:data.length, activities:data};
}

module.exports = {
    COLLECTION_NAME,
    collection,
    getActivities,
    getActivity,
    addActivity,
    searchActivity,
};
