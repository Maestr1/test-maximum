import React, {useEffect, useState} from 'react';
import styles from './MarkSelector.module.scss';

function MarkSelector(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/mark_list')
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <ul className={styles.list}>
      {data.map((mark) => (
        <li className={styles.item} key={mark.name}>{`${mark.name} ${mark.count}`}</li>
      ))}
    </ul>
  );
}

export default MarkSelector;
