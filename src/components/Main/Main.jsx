'use client';

import React, {useEffect, useState} from 'react';
import Table from '@components/Table/Table';
import MarkSelector from '@components/MarkSelector/MarkSelector';
import styles from './Main.module.scss';


function Main() {

  return (
    <main className={styles.main}>
      <MarkSelector/>
      <Table/>
    </main>
  );
}

export default Main;
