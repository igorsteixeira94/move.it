import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeProvider";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

const TIME_POMODORO = 0.1 * 60; //Representação de 25 min em segundos.
let countdownTimeout: NodeJS.Timeout;

const CountdownProvider = ({children}:CountdownProviderProps) => {
  const {startNewChallenge} = useContext(ChallengeContext)
  const [time, setTime] = useState(TIME_POMODORO);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);


  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountDown = useCallback(()=>{
    
    setIsActive(true);
  
  },[]);
  
  const resetCountDown = useCallback(()=>{
    clearTimeout(countdownTimeout);
    
    setIsActive(false);
    setTime(TIME_POMODORO);

    setHasFinished(false);
    
  },[]);
  
  useEffect(()=> {
    if(isActive && time > 0) {
      
      countdownTimeout = setTimeout(()=> {
      
        setTime(time - 1);

      }, 1000);
  
      } else if ( isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge()
      }
  
    },[isActive,time]);

  return(
  <CountdownContext.Provider value={{
    minutes,
    seconds,
    isActive,
    hasFinished,
    //methods
    startCountDown,
    resetCountDown,
  }}>
    {children}
  </CountdownContext.Provider>
  );
};

export default CountdownProvider;