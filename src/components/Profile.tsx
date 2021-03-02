import React, { useContext } from 'react';
import { ChallengeContext } from '../providers/ChallengeProvider';
import styles from "../styles/components/Profile.module.css"

const Profile: React.FC = () => {
  const {level} = useContext(ChallengeContext)
  return (
    <div className={styles.profileContainer}> 
      <img src="https://github.com/igorsteixeira94.png" alt="Igor Rodrigues" />
      <div>
        <strong>Igor Rodrigues</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile;