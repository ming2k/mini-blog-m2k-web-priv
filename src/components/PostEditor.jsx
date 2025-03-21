import React, { useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { getPostById } from '../api';
import styles from './PostEditor.module.css';

export default function PostEditor({ post, onSave, onCancel }) {
  const [currentPost, setCurrentPost] = React.useState({ title: '', content: '' });

  useEffect(() => {
    if (post) {
      const fetchFullPost = async () => {
        try {
          const fullPost = await getPostById(post.id);
          setCurrentPost({
            id: fullPost.id,
            title: fullPost.title,
            content: fullPost.content
          });
        } catch (error) {
          console.error('Error fetching full post:', error);
        }
      };

      fetchFullPost();
    } else {
      setCurrentPost({ title: '', content: '' });
    }
  }, [post]);

  const handleSave = () => {
    if (!currentPost.title || !currentPost.content) {
      alert('Please fill in both title and content');
      return;
    }
    onSave(currentPost);
  };

  return (
    <div className={styles.editorContainer} data-color-mode="light">
      <div className={styles.editorHeader}>
        <h1>{post ? 'Edit Post' : 'New Post'}</h1>
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>

      <div className={styles.editor}>
        <input
          type="text"
          placeholder="Post Title"
          value={currentPost.title}
          onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
          className={styles.titleInput}
        />
        
        <div className={styles.contentEditor}>
          <MDEditor
            value={currentPost.content}
            onChange={(content) => setCurrentPost({ ...currentPost, content: content || '' })}
            height="100%"
            preview="edit"
            hideToolbar={false}
            enableScroll={true}
            textareaProps={{
              placeholder: 'Write your post content here...'
            }}
          />
        </div>
      </div>
    </div>
  );
} 