import React, { useEffect, useState } from 'react';

import { Table as AntTable } from 'antd';

function Table(props) {
  const [formattedCarList, setFormattedCarList] = useState([]);
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      width: '220px',
    },
    {
      title: 'Марка/модель',
      dataIndex: 'mark',
    },
    {
      title: 'Модификация',
      dataIndex: 'modificationName',
    },
    {
      title: 'Комплектация',
      dataIndex: 'equipmentName',
    },
    {
      title: 'Стоимость',
      dataIndex: 'price',
      width: '120px',
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      width: '150px',
    },
  ];

  useEffect(() => {
    if (props.carList) {
      formatCarList(props.carList);
    }
  }, [props.carList]);

  function formatCarList(carList) {
    const newFormattedData = carList.map((car, index) => ({
      key: `car_${index}`,
      _id: car._id,
      mark: `${car.mark} ${car.model ? `${car.model}` : '-'}`,
      modificationName: `${car.engine.volume} ${car.engine.transmission} (${
        car.engine.power
      } л.с.) ${car.drive === '4WD' ? '4WD' : ''}`,
      equipmentName: car.equipmentName,
      price: formatPrice(car.price),
      createdAt: formatDate(car.createdAt),
    }));
    setFormattedCarList(newFormattedData);
  }

  function formatDate(date) {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function formatPrice(price) {
    return price
      ? price.toLocaleString('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: '0',
        })
      : '-';
  }

  return (
    <>
      <AntTable columns={columns} dataSource={formattedCarList} />
    </>
  );
}

export default Table;
