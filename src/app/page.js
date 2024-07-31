import {getStock} from '@utils/mongo/stock';


async function fetchStock() {
  const { data } = await getStock();
  if (!data) throw new Error('Не удалось получить данные');

  return data;
}

export default async function Home() {

  const data = await fetchStock();

  return (
    <main>
      <ul>
        {data.map(car => (
          <li>{car.model}</li>
        ))}
      </ul>
    </main>
  );
}
