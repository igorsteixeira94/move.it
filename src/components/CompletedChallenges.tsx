import React from 'react';
import styles from '../styles/components/CompletedChallenges.module.css'
const CompletedChallenges: React.FC = () => {
  return (
    <div className={styles.completedChallenges}>
      <span>Desafios completos</span>
      <span>0</span>
    </div>
  );
}

export default CompletedChallenges;