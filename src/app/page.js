import {getStock} from '@utils/mongo/stock';
import Main from '@/app/Main';


async function fetchStock() {
  const { data } = await getStock();
  if (!data) throw new Error('Не удалось получить данные');

  return data;
}

export default async function Home() {

  const data = await fetchStock();

  return (
    <main>
      <Main data={data}/>
    </main>
  );
}
