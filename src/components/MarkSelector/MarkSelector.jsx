import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './MarkSelector.module.scss';

function MarkSelector(props) {
  const [selectedFilter, setSelectedFilter] = useState(null);

  function buttonHandler(event) {
    const value = event.target.closest('button').value;
    props.markSelectorHandler(value);
    setSelectedFilter(value);
  }

  return (
    <ul className={styles.list}>
      {props.markList.map((mark) => (
        <li className={styles.item} key={mark.name}>
          <Button
            className={selectedFilter === mark.name ? styles.selected : ''}
            onClick={buttonHandler}
            value={mark.name}
            style={{ paddingInline: 2, paddingBlock: 0 }}
            type="link"
          >
            {mark.name}
          </Button>
          <span className={styles.count}> {mark.count}</span>
        </li>
      ))}
    </ul>
  );
}

export default MarkSelector;
