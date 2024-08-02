import React, { useEffect } from 'react';
import { Select } from 'antd';
function ModelSelector(props) {
  function handleChange(value) {
    props.changeHandler(value);
  }

  //Добалено значение по умолчанию, т.к. в некоторых строках нет модели
  function formatOptions(options) {
    return options.map((option) => ({
      label: option ?? 'Модель не известна',
      value: option ?? 'Модель не известна',
    }));
  }

  return (
    <div>
      <Select
        mode="multiple"
        allowClear
        style={{ width: 'fit-content', minWidth: '200px' }}
        placeholder="Выберите модели"
        onChange={handleChange}
        options={formatOptions(props.modelList)}
      />
    </div>
  );
}

export default ModelSelector;
