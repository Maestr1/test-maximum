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
      throw new Error('Не удалось подключиться к базе данных');
    }
  }
}

(async () => {
  await init();
})();

export async function getStock() {
  try {
    if (!stock) await init();
    const data = await stock.find({}).limit(100).toArray();
    return { data };
  } catch (error) {
    throw new Error('Не удалось получить данные');
  }
}

export async function getMarkList() {
  try {
    if (!stock) await init();
    const markList = await stock.distinct('mark', {});
    const markCounts = await Promise.all(
      markList.map((mark) => stock.countDocuments({ mark }))
    );
    const data = markList.map((mark, index) => ({
      name: mark,
      count: markCounts[index],
    }));
    return { data };
  } catch (error) {
    throw new Error('Не удалось получить данные');
  }
}

export async function getAggregateByMark(markValue) {
  try {
    if (!stock) await init();
    const data = await stock
      .aggregate([{ $match: { mark: markValue } }])
      .toArray();
    return { data };
  } catch (error) {
    throw new Error('Не удалось получить данные');
  }
}
