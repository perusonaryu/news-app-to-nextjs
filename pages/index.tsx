import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import MainLayout from '../src/layouts';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      
    </MainLayout>
  );
};

export default Home;
