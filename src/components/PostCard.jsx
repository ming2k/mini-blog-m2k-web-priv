import React from 'react';
import styles from './PostCard.module.css';
import { FaEllipsisV } from 'react-icons/fa';

export default function PostCard({ memo, referencedMemos = [] }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.timestamp}>{memo.createdAt}</span>
        <button className={styles.menuButton}>
          <FaEllipsisV />
        </button>
      </div>
      <div className={styles.content}>
        {memo.content}
      </div>
      {memo.checklist && memo.checklist.length > 0 && (
        <ul className={styles.checklist}>
          {memo.checklist.map((item, idx) => (
            <li key={idx} className={styles.checkItem}>
              <input type="checkbox" checked={item.checked} readOnly />
              <span className={item.checked ? styles.checked : ''}>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
      {memo.tags && memo.tags.length > 0 && (
        <div className={styles.tags}>
          {memo.tags.map((tag, idx) => (
            <span key={idx} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      )}
      {memo.references && memo.references.length > 0 && (
        <div className={styles.references}>
          {memo.references.map((refId, idx) => {
            const ref = referencedMemos.find(m => m.id === refId);
            return ref ? (
              <div key={refId} className={styles.referencePreview}>
                <span className={styles.referenceLabel}>Referenced:</span>
                <span className={styles.referenceContent}>{ref.content}</span>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
} 