import clientPromise from '.';

let client;
let db;
let stock;

async function init() {
  if (!db) {
    try {
      client = await clientPromise;
      db = await client.db('hrTest');
      stock = await db.collection('stock');
    } catch (error) {
      throw new Error(error);
      // throw new Error('Не удалось подключиться к базе данных');
    }
  }
}

(async () => {
  await init();
})();

export async function getStock() {
  try {
    if (!stock) await init();
    const result = await stock
      .find({})
      .toArray();
    return { data: result };
  } catch (error) {
    throw new Error(error);
    // throw new Error('Не удалось получить данные');
  }
}
