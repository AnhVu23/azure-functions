const mongoClient = require('mongodb').MongoClient
let db
mongoClient.connect(
  'mongodb://functionstests2403:vadVJkuHQD5n141PnvBpqXGEZHmyBytmg4X3kYiJSodWZIRinRtFuwrigSAT5kQyg0U5vErCI6pHfEh67LDmqg%3D%3D@functionstests2403.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@functionstests2403@',
  (err, client) => {
    db = client.db('functionstests2403')
  }
)
let studentList = [
  {
    name: 'Anh Vu',
    email: 'anh.vu@stu.com',
  },
  {
    name: 'Hai Vu',
    email: 'hai.vu@stu.com',
  },
  {
    name: 'John Smith',
    email: 'john.smith@stu.com',
  },
]
module.exports = async function (context, req) {
  if (req.method === 'GET') {
    const collection = db.collection('students')
    const list = await collection.find({}).toArray()
    console.log(list)
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: JSON.stringify(list),
    }
  } else {
    const collection = db.collection('students')
    await collection.insertMany(studentList)
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Inserted',
    }
  }
}
