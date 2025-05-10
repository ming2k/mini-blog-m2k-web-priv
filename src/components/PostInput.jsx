import React, { useState, useRef, useEffect } from 'react';
import styles from './PostInput.module.css';
import { FaHashtag, FaPaperclip, FaLock, FaTag, FaChevronDown } from 'react-icons/fa';

export default function PostInput({ onSave }) {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [tags, setTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);
  const [privacy, setPrivacy] = useState('everyone');
  const tagInputRef = useRef(null);
  const textareaRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };
  const handleSave = () => {
    if (!input.trim()) return;
    onSave(input, tags);
    setInput('');
    setTags([]);
    setIsExpanded(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = '';
    }
  };
  const handleTagIconClick = (e) => {
    e.stopPropagation();
    setShowTagInput(true);
    setTimeout(() => tagInputRef.current && tagInputRef.current.focus(), 0);
  };
  const handleTagInputChange = (e) => setTagInput(e.target.value);
  const handleTagInputKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
      setShowTagInput(false);
    } else if (e.key === 'Escape') {
      setShowTagInput(false);
      setTagInput('');
    }
  };
  const handleTagInputBlur = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
    }
    setShowTagInput(false);
    setTagInput('');
  };
  const handleRemoveTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  useEffect(() => {
    if (!isExpanded && !input && textareaRef.current) {
      textareaRef.current.style.height = '';
    }
  }, [isExpanded, input]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPrivacyDropdown(false);
      }
      if (!input.trim() && !event.target.closest(`.${styles.inputBarExpanded}`)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [input]);

  const handlePrivacyChange = (newPrivacy) => {
    setPrivacy(newPrivacy);
    setShowPrivacyDropdown(false);
  };

  return (
    <div
      className={isExpanded ? styles.inputBarExpanded : styles.inputBar}
      style={{ marginBottom: '1.5rem' }}
      onClick={() => setIsExpanded(true)}
    >
      {isExpanded && (
        <div className={styles.replySettings}>
          <div className={styles.privacyDropdown} ref={dropdownRef}>
            <button 
              className={styles.replyButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowPrivacyDropdown(!showPrivacyDropdown);
              }}
            >
              {privacy === 'everyone' ? 'Everyone' : 'Private'}
              <FaChevronDown className={styles.dropdownIcon} />
            </button>
            {showPrivacyDropdown && (
              <div className={styles.dropdownMenu}>
                <button 
                  className={`${styles.dropdownItem} ${privacy === 'everyone' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrivacyChange('everyone');
                  }}
                >
                  Everyone
                </button>
                <button 
                  className={`${styles.dropdownItem} ${privacy === 'private' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrivacyChange('private');
                  }}
                >
                  Private
                </button>
              </div>
            )}
          </div>
          
        </div>
      )}
      <div className={styles.inputRow}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          placeholder="What's happening?"
          value={input}
          onChange={handleInputChange}
          onFocus={() => setIsExpanded(true)}
          rows={1}
          style={{overflow: 'hidden'}}
        />
        <div className={styles.tagsArea}>
          {tags.map(tag => (
            <span className={styles.tagChip} key={tag}>
              #{tag}
              <button className={styles.removeTag} onClick={e => { e.stopPropagation(); handleRemoveTag(tag); }}>&times;</button>
            </span>
          ))}
          {showTagInput && (
            <input
              ref={tagInputRef}
              className={styles.tagInput}
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              onBlur={handleTagInputBlur}
              placeholder="Add tag"
              maxLength={20}
            />
          )}
        </div>
      </div>
      <div className={styles.inputActions}>
        <FaTag className={styles.inputIcon} title="Add tag" onClick={handleTagIconClick} tabIndex={0} />
        {/* <FaPaperclip className={styles.inputIcon} title="Attach file" /> */}
        {/* <FaLock className={styles.inputIcon} title="Private" /> */}
        <button className={styles.saveButton} onClick={handleSave} disabled={!input.trim()}>
          Post
        </button>
      </div>
    </div>
  );
} 