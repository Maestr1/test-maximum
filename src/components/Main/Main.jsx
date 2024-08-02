'use client';

import React, { useEffect, useState } from 'react';
import Table from '@components/Table/Table';
import MarkSelector from '@components/MarkSelector/MarkSelector';
import ModelSelector from '@components/ModelSelector/ModelSelector';
import styles from './Main.module.scss';

function Main() {
  const [carList, setCarList] = useState([]);
  const [filteredByMarkList, setFilteredByMarkList] = useState([]);
  const [filteredCarList, setFilteredCarList] = useState([]);
  const [markList, setMarkList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  //Запрос всего списка при загрузке приложения
  useEffect(() => {
    Promise.all([
      fetch('/api/stock').then((res) => res.json()),
      fetch('/api/mark_list').then((res) => res.json()),
    ])
      .then(([stockRes, markRes]) => {
        setCarList(stockRes.data);
        setFilteredCarList(stockRes.data);
        setMarkList(markRes.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const listToProcess = filteredByMarkList.length
      ? filteredByMarkList
      : carList;
    getUniqueModelList(listToProcess);
  }, [filteredByMarkList, carList]);

  useEffect(() => {
    const updatedFilteredCarList =
      selectedModels.length > 0
        ? filterCarListByModels(carList, selectedModels)
        : filteredByMarkList.length > 0
        ? filteredByMarkList
        : carList;
    setFilteredCarList(updatedFilteredCarList);
  }, [selectedModels, filteredByMarkList, carList]);

  function getUniqueModelList(carList) {
    const uniqueModelList = new Set(carList.map((car) => car.model));
    setModelList(Array.from(uniqueModelList));
  }

  function markSelectorHandler(value) {
    fetch(`/api/aggregateByMark?mark=${value}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredByMarkList(data.data);
        setFilteredCarList(data.data);
      })
      .catch((error) => console.error(error));
  }

  function filterCarListByModels(carList, selectedModels) {
    return carList.filter((car) => selectedModels.includes(car.model));
  }

  return (
    <main className={styles.main}>
      <MarkSelector
        markList={markList}
        markSelectorHandler={markSelectorHandler}
      />
      <ModelSelector
        modelList={modelList}
        changeHandler={setSelectedModels}
        selectedModels={selectedModels}
      />
      <Table carList={filteredCarList} />
    </main>
  );
}

export default Main;
