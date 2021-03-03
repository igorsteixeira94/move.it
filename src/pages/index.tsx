import CompletedChallenges from "../components/CompletedChallenges";
import Head from 'next/head';
import {GetServerSideProps} from 'next';

import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import ChallengeBox from "../components/ChallengeBox";
import CountDown from "../components/CountDown";
import styles from "../styles/pages/Home.module.css"
import CountdownProvider from "../providers/CountdownContext";
import ChallengeProvider from "../providers/ChallengeProvider";

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({level,currentExperience,challengesCompleted}:HomeProps) {

  return (
    <ChallengeProvider 
      level={level}
      currentExperience={currentExperience} 
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />

      <CountdownProvider>
          <section>
            <div>
              <Profile /> 
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
            <ChallengeBox />
            </div>
          </section>
      </CountdownProvider>
      </div>
    </ChallengeProvider>
  
    );
}

//Busca dados antes de renderizar os components
export const getServerSideProps:GetServerSideProps = async(ctx) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return {
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}
