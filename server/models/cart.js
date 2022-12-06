const { getFriend } = require('./friends');
const list = [];

const { connect } = require('./mongo');

async function collection() {
    const client = await connect();
    return client.db('chopiphy').collection('COLLECTION_NAME');
}

const get = async (userId) => {
    const db = await collection();
    const data = await db.find({ userId }).toArray();
    return data
        .map((cartItem) => ({
            ...cartItem, 
            friend: getFriend(cartItem.friendId)
        }));
};

/**
 * 
 * @param {string} userId 
 * @param {number} friendId 
 * @param {number} quantity 
 * @returns 
 */
const add = async (userId, friendId, quantity) => {
    const db = await collection();
    let cartItem = db.findOne({userId, friendId})
    if (cartItem) {
        cartItem.quantity += quantity;
        db.updateOne({userId, friendId},cartItem)
    } else {
        cartItem = { id: list.length + 1, quantity, friendId, userId };
        // list.push(cartItem);
        await db.insertOne(cartItem)
    }
    return { ...cartItem, friend: getFriend(friendId) };
};


/**
 * 
 * @param {string} userId 
 * @param {number} friendId 
 * @param {number} quantity 
 * @returns 
 */
const update = async (userId, friendId, quantity) => {
    console.log(userId, friendId, quantity);
  const index = list.findIndex((cartItem) => cartItem.userId === userId && cartItem.friendId === friendId);
  if (index !== -1) {
    if(quantity === 0) {
        const db = await collection();
        db.deleteOne({ userId,friendId })
        return "null";
    } else {
        let cartItem = await db.findOne({userId, friendId})
        cartItem.quantity = quantity;
        db.updateOne({ userId,friendId }, cartItem);
    }
  }else {
        throw new Error('Cart item not found');
  }
  return { ...list[index], friend: getFriend(friendId) };
}

module.exports = { add, get, update }