import React, { useContext, useMemo } from 'react';
import { ChallengeContext } from '../providers/ChallengeProvider';
import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar: React.FC = () => {
  const {currentExperience,experienceToNextLevel} = useContext(ChallengeContext);

  const percentToNextLevel = useMemo(()=> Math.round(currentExperience * 100) / experienceToNextLevel,[])

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width:`${percentToNextLevel}%`}} />

        <span className={styles.currentExperience} style={{left:`${percentToNextLevel}%`}}>{currentExperience} xp</span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
    )
}

export default ExperienceBar;