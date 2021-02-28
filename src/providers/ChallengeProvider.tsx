import React, { createContext,ReactNode, useCallback, useState } from 'react';
import challenges from '../../challenges.json';

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeProviderProps {
   children: ReactNode;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

const FACTOR = 4; // Fator de difilcudade, quanto maior mais dificil.

const ChallengeProvider: React.FC = ({children}:ChallengeProviderProps) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * FACTOR, 2)

  const levelUp = useCallback(()=>{
    setLevel( level + 1);
  },[]);

  const startNewChallenge = useCallback(()=>{
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge)

  },[]);

  const resetChallenge = useCallback(()=>{
    setActiveChallenge(null);
  },[])

  return (
    <ChallengeContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      experienceToNextLevel,
      //methods
      levelUp,
      startNewChallenge,
      resetChallenge,
    }}>
      {children}
    </ChallengeContext.Provider>
  );
}

export default ChallengeProvider;