import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import MainLayout from '../src/layouts';
import { GetStaticProps } from 'next';
import Article from '../src/components/article';
import Nav from '../src/components/nav';
import WeatherNews from '../src/components/weather-news';
import PickupArticle from '../src/components/pickup-article';

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
        <div className={styles.aside}>
          <WeatherNews weatherNews={props.weatherNews} />
          <PickupArticle articles={props.pickupArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10;
  const topRes = await fetch(
    `${process.env.NEXT_PUBLIC_NEWS_URL}/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`
  );

  const res = await topRes.json();
  const topArticles = res?.articles;

  // OpenWeatherMapの天気の情報を取得
  const lat = 35.4122; // 取得したい地域の緯度と経度(今回は東京)
  const lon = 139.413;
  const exclude = 'hourly,minutely'; // 取得しない情報(1時間ごとの天気情報と1分間ごとの天気情報)
  const weatherRes = await fetch(
    `${process.env.NEXT_PUBLIC_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // NewsAPIのピックアップ記事の情報を取得
  const keyword = 'software'; // キーワードで検索(ソフトウェア)
  const sortBy = 'popularity'; // 表示順位(人気順)
  const pickupPageSize = 5; // ページサイズ(5)
  const pickupRes = await fetch(
    `${process.env.NEXT_PUBLIC_NEWS_URL}/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;
  return {
    props: {
      topArticles,
      weatherNews,
      pickupArticles,
    },
    revalidate: 60 * 10,
  };
};

export default Home;
