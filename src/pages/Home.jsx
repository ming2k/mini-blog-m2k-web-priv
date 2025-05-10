import React, { useState } from 'react';
import styles from './Home.module.css';
import MemoCard from '../components/MemoCard';
import { FaHashtag, FaPaperclip, FaLock } from 'react-icons/fa';

export default function Home() {
  const [input, setInput] = useState('');
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
    <div className={styles.mainContent}>
      {/* Input Bar */}
      <div className={styles.inputBar}>
        <input
          type="text"
          className={styles.input}
          placeholder="Any thoughts..."
          value={input}
          onChange={handleInputChange}
        />
        {/* Icons and Save button */}
        <div className={styles.inputActions}>
          <FaHashtag className={styles.inputIcon} title="Add tag" />
          <FaPaperclip className={styles.inputIcon} title="Attach file" />
          <FaLock className={styles.inputIcon} title="Private" />
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        </div>
      </div>
      {/* Memo List */}
      <div className={styles.memoList}>
        {memos.map(memo => (
          <MemoCard key={memo.id} memo={memo} referencedMemos={memos} />
        ))}
      </div>
    </div>
  );
} 