import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Title from '../components/Title'
import Article from '../components/Article'

import data from '../data/data.json'

export default function Home() {
  const router = useRouter()
  const [activeArticle, setActiveArticle] = useState('first');

  const handleIntersect = (entries) => {
    if (entries[0].isIntersecting) {
      setActiveArticle(entries[0].target.id);
      router.replace(`/#${entries[0].target.dataset.path}`, `/${entries[0].target.dataset.path}`, { shallow: true, scroll: false });
    }
  };

  useEffect(() => {
    const hash = location.pathname.replace(/^\/(.*)/, "/#$1");
    console.log(`HASH: ${hash}`);
    router.replace(`${hash}`, undefined, { shallow: true, scroll: false });

    // const handleRouteChange = (url, { shallow }) => {
    //   console.log(
    //     `App is changing to ${url} ${
    //       shallow ? 'with' : 'without'
    //     } shallow routing `
    //   );
    // }
    // router.events.on('hashChangeStart', hashRouteChange);
    // return () => {
    //   router.events.off('routeChangeStart', handleRouteChange);
    //   router.events.off('hashChangeStart', hashRouteChange);
    // }
  }, []);


  const createObserver = (target) => {
    const options = {
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(target);
  };

  return (
    <>
      <Head>
        <title>Intersection Observer API</title>
      </Head>
      <main className={styles.main}>
        <ul className={styles.titles}>
          {data.titles.map(({title, id, path}) => {
            return <Title key={id} text={title} path={path} isActive={path === activeArticle} />
          })}
        </ul>

        <div className={styles.articles}>
          {data.articles.map(({id, path, title, content}) => {
            return <Article key={id} path={path} title={title} content={content} id={path}  createObserver={createObserver} />
          })}
        </div>
      </main>
    </>
  )
}
