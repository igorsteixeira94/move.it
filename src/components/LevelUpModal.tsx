import { deflate } from 'node:zlib';
import { useContext } from 'react';
import { ChallengeContext } from '../providers/ChallengeProvider';
import styles from '../styles/components/LevelUpModal.module.css';

const LevelUpModal: React.FC = () =>{
  const {level,closedModalLevelUp} = useContext(ChallengeContext)
  return (
    <div className={styles.overlay}>
       <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={()=>closedModalLevelUp()}>
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
       </div>

    </div>
   
  );
}

export default LevelUpModal;