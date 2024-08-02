'use client';

import React, { useEffect, useState } from 'react';
import Table from '@components/Table/Table';
import MarkSelector from '@components/MarkSelector/MarkSelector';
import styles from './Main.module.scss';

function Main() {
  const [carList, setCarList] = useState([]);
  const [markList, setMarkList] = useState([]);

  //Запрос всего списка при загрузке приложения
  useEffect(() => {
    Promise.all([
      fetch('/api/stock').then((res) => res.json()),
      fetch('/api/mark_list').then((res) => res.json())
    ])
      .then(([stockRes, markRes]) => {
        setCarList(stockRes.data);
        setMarkList(markRes.data);
      })
    fetch('/api/stock')
      .then((res) => res.json())
      .then((data) => setCarList(data.data))
      .catch((error) => console.error(error));
  }, []);

  function markSelectorHandler(value) {
    fetch(`/api/aggregateByMark?mark=${value}`)
      .then((res) => res.json())
      .then((data) => setCarList(data.data))
      .catch((error) => console.error(error));
  }

  return (
    <main className={styles.main}>
      <MarkSelector markList={markList} markSelectorHandler={markSelectorHandler}/>
      <Table carList={carList} />
    </main>
  );
}

export default Main;
