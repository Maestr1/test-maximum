import {MongoClient} from 'mongodb';
import {global} from 'styled-jsx/css';

const URI = process.env.MONGODB_URI
const options = {}

if (!URI) throw new Error('Пожалуйста, определите переменную MONGODB_URI внутри .env')

const client = new MongoClient(URI, options);
let clientPromise

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export default clientPromise
