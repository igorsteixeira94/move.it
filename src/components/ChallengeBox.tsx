import React, { useCallback, useContext } from 'react';
import { ChallengeContext } from '../providers/ChallengeProvider';
import { CountdownContext } from '../providers/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css'

const ChallengeBox: React.FC = () => {
  const {activeChallenge, resetChallenge,completeChallenge} = useContext(ChallengeContext);
  const {resetCountDown} = useContext(CountdownContext);

  const handleChallengeSucceeded = useCallback(()=>{

    completeChallenge();
    resetCountDown();
    
  },[completeChallenge,resetCountDown]);

  const handleChallengeFailed = useCallback(()=> {

    resetChallenge();
    resetCountDown();

  },[resetChallenge,resetCountDown])
  
  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>

            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeBoxNotActiveContainer}>
        <strong>Finalize um ciclo para receber um desafio</strong>
        <p>
          <img src="icons/level-up.svg" alt="Level Up" />
          Avance de level completando desafios.
        </p>
      </div>
      )
      }
    </div>
  );
}

export default ChallengeBox;