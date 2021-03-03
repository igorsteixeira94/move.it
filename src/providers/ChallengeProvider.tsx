import React, { createContext,ReactNode, useCallback, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeProviderProps {
  level?: number;
  currentExperience: number;
  challengesCompleted: number;
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
  completeChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

const FACTOR = 4; // Fator de difilcudade, quanto maior mais dificil.

const ChallengeProvider: React.FC<ChallengeProviderProps> = ({children,...rest}:ChallengeProviderProps) => {
  const [level, setLevel] = useState(rest.level || 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * FACTOR, 2);

  useEffect(()=>{
    Notification.requestPermission()
  },[])

  const levelUp = useCallback(()=>{
    setLevel( level + 1);
  },[]);

  useEffect(()=>{
    Cookies.set('level',String(level));
    Cookies.set('currentExperience',String(currentExperience));
    Cookies.set('challengeCompleted',String(challengesCompleted));
  },[level,currentExperience,challengesCompleted])

  const startNewChallenge = useCallback(()=>{
    
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (!("Notification" in navigator)) {
      console.log('Esse browser não suporta notificações desktop');
    }

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp`
      });
    }


  },[]);

  const resetChallenge = useCallback(()=>{
    setActiveChallenge(null);
  },[]);

  const completeChallenge = useCallback(()=>{
    
    
    if(activeChallenge === null) {
      console.log(activeChallenge)
      return;

    }
    console.log('cheguei aqui')
    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {

      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();

    }

      setCurrentExperience(finalExperience);
      setActiveChallenge(null);
      setChallengesCompleted(challengesCompleted + 1);
    
  },[activeChallenge,currentExperience,experienceToNextLevel,challengesCompleted]);

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
      completeChallenge,
    }}>
      {children}
    </ChallengeContext.Provider>
  );
}

export default ChallengeProvider;