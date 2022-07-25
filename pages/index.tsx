import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import MainLayout from '../src/layouts';
import { GetStaticProps } from 'next';
import Article from '../src/components/article';
import Nav from '../src/components/nav';

function Home(props: any) {
  // 記事を取得できているか確認
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        {/* Articleコンポーネントを追加 */}
        <div className={styles.main}>
          <Article title="headlines" articles={props.topArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10;
  const topRes = await fetch(
    `${process.env.NEXT_PUBLIC_NEWS_URL}?country=jp&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`
  );

  const res = await topRes.json();
  const topArticles = res?.articles;
  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  };
};

export default Home;
