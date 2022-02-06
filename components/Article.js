import React, { useEffect, useRef } from 'react'
import styles from '../styles/Article.module.css'

const Article = ({ id, path, title, content, createObserver }) => {
  const el = useRef(null);

  useEffect(() => {
    createObserver(el.current);
  }, []);

  return (
    <article ref={el} className={styles.article} id={path} data-path={path}>
      <h2>{title}</h2>
      <p className={styles.content}>{content}</p>
    </article>
  )
}

export default Article
