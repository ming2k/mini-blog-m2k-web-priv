import React, { useState } from 'react';
import styles from './Home.module.css';
import PostCard from '../components/PostCard';
import PostInput from '../components/PostInput';
import Calendar from '../components/Calendar';
import { FaHashtag, FaPaperclip, FaLock } from 'react-icons/fa';

export default function Home() {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  // Placeholder for memos
  const [memos, setMemos] = useState([
    // Example memos for now
    {
      id: 1,
      content: 'Hello world. This is my first memo! #hello',
      tags: ['hello'],
      references: [],
      checklist: [],
      createdAt: 'now',
    },
    {
      id: 2,
      content: 'And here are my tasks. #todo',
      tags: ['todo'],
      references: [],
      checklist: [
        { text: 'deploy memos for myself', checked: true },
        { text: 'share to my friends;', checked: false },
        { text: 'sounds good to me!', checked: false },
      ],
      createdAt: 'now',
    },
    {
      id: 3,
      content: 'Wow, it can be referenced too! REALLY GREAT!!! #features',
      tags: ['features'],
      references: [1],
      checklist: [],
      createdAt: 'now',
    },
  ]);

  const handleInputChange = (e) => setInput(e.target.value);
  const handleSave = () => {
    if (!input.trim()) return;
    setMemos([
      {
        id: memos.length + 1,
        content: input,
        tags: [],
        references: [],
        checklist: [],
        createdAt: 'now',
      },
      ...memos,
    ]);
    setInput('');
  };

  return (
    <div className={styles.pageLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          {/* Search Bar */}
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search memos..."
          />
          {/* Calendar (static for now) */}
          <Calendar />
          {/* Shortcuts */}
          <div className={styles.shortcutsSection}>
            <div className={styles.sectionTitle}>Shortcuts</div>
            <ul className={styles.shortcutsList}>
              <li>Links</li>
              <li>To-do</li>
              <li>Code</li>
            </ul>
          </div>
          {/* Tags */}
          <div className={styles.tagsSection}>
            <div className={styles.sectionTitle}>Tags</div>
            <div className={styles.tagsList}>
              <span className={styles.tag}>#features</span>
              <span className={styles.tag}>#hello</span>
              <span className={styles.tag}>#todo</span>
            </div>
          </div>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {/* Input Bar */}
        <PostInput onSave={handleSave} />
        {/* Memo List */}
        <div className={styles.memoList}>
          {memos.map(memo => (
            <PostCard key={memo.id} memo={memo} referencedMemos={memos} />
          ))}
        </div>
      </main>
    </div>
  );
} 