import Head from 'next/head';
import { useRouter } from 'next/router';
import Article from '../../src/components/article';
import Nav from '../../src/components/nav';
import MainLayout from '../../src/layouts';
import styles from '../../styles/Home.module.scss';

function Topic(props: any) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const title = `Simple News - ${props.title}`;

  return (
    <MainLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} style={{ marginRight: '10%' }}>
          <Article title={props.title} articles={props.topicArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const topicRes = await fetch(
    `${process.env.NEXT_PUBLIC_NEWS_URL}?country=jp&category=${params.id}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`
  );

  const topicJson = await topicRes.json();
  const topicArticles = await topicJson.articles;

  const title = params.id;

  return {
    props: { topicArticles, title },
    revalidate: 60 * 10,
  };
}

export default Topic;
