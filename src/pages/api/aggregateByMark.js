import { getAggregateByMark } from '@utils/mongo/stock';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { data, error } = await getAggregateByMark(req.query.mark);
      // Генерация исключения для его обработки в catch
      if (error) throw new Error(error);

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.setHeader('Allow', ['GET']);
  res.status(425).json(`Метод ${req.method} не поддерживается`);
};

export default handler;
