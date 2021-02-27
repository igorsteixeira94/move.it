import React, { useEffect, useState } from 'react';

import styles from "../styles/components/CountDown.module.css"

const CountDown: React.FC = () => {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

  function startCountDown(){
    setActive(true);
  }

  useEffect(()=>{

  },[active]);

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      <button type="button" className={styles.countDownButton}>Iniciar um ciclo</button>
    </div>
  );
}

export default CountDown;