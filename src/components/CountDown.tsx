import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../providers/ChallengeProvider';

import styles from "../styles/components/CountDown.module.css"

let countdownTimeout: NodeJS.Timeout;
const TIME_POMODORO = 0.1 * 60; //Representação de 25 min em segundos.

const CountDown: React.FC = () => {
  const {startNewChallenge} = useContext(ChallengeContext)
  const [time, setTime] = useState(TIME_POMODORO);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);


  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

 const startCountDown = useCallback(()=>{
  setIsActive(true);
  },[]);

  const resetCountDown = useCallback(()=>{
    clearTimeout(countdownTimeout);
    
    setIsActive(false);
    setTime(TIME_POMODORO);
  },[])
    

  useEffect(()=>{
    if(isActive && time > 0) {
      
      countdownTimeout = setTimeout(()=> {
        setTime(time - 1);
      }, 1000);

    }else if( isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge()
    }

  },[isActive,time]);

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
      {hasFinished ? (
      <button 
        disabled
        className={styles.countDownButton}
      >
        Ciclo encerrado
      </button>
      ) : (
        <>
      {isActive  ? (
        <button 
          onClick={resetCountDown}
          type="button" 
          className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
        >
          Abandonar ciclo
        </button>
        ) : (
          <button 
            onClick={startCountDown}
            type="button" 
            className={styles.countDownButton}
          >
            Iniciar um ciclo
          </button>
          )}
        </>
      )
    
    }



    </div>
  );
}

export default CountDown;