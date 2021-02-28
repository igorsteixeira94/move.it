import React, { useContext } from 'react';
import { ChallengeContext } from '../providers/ChallengeProvider';
import styles from '../styles/components/CompletedChallenges.module.css'

const CompletedChallenges: React.FC = () => {
  const {challengesCompleted} = useContext(ChallengeContext);

  return (
    <div className={styles.completedChallenges}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}

export default CompletedChallenges;