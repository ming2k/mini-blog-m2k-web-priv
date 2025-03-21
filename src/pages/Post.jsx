import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { formatDate } from '../utils/dateFormat';
import { getPost } from '../api';
import styles from './Post.module.css';
import 'katex/dist/katex.min.css';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className={styles['post-error']}>
        <h2>Error loading post</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles['post-loading']}>
        <div className={styles['loading-spinner']}></div>
      </div>
    );
  }

  return (
    <article className={styles['post-container']}>
      <header className={styles['post-header']}>
        <h1>{post.title}</h1>
        <div className={styles['post-meta']}>
          <time dateTime={post.created_at}>
            {formatDate(post.created_at)}
          </time>
        </div>
      </header>
      <div className={styles['post-content']}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            // Custom components for markdown elements
            h1: ({node, ...props}) => <h1 className={styles.heading1} {...props} />,
            h2: ({node, ...props}) => <h2 className={styles.heading2} {...props} />,
            h3: ({node, ...props}) => <h3 className={styles.heading3} {...props} />,
            p: ({node, ...props}) => <p className={styles.paragraph} {...props} />,
            code: ({node, inline, ...props}) => (
              <code className={inline ? styles.inlineCode : styles.codeBlock} {...props} />
            ),
            pre: ({node, ...props}) => <pre className={styles.pre} {...props} />,
            div: ({node, className, ...props}) => 
              className === 'math math-display' 
                ? <div className={styles.mathDisplay} {...props} />
                : <div {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}