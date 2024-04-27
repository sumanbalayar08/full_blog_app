import React, { useState } from 'react';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault(); // Prevent the default behavior of the Enter key
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className='border-slate-500 p-2'>
      <input
        type="text"
        placeholder="Add tags"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className='border-[1.5px] border-slate-500 w-full'
      />
      <div>
        {tags.map((tag, index) => (
          <span key={index} className="tag" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '2px 4px', marginRight: '4px' }}>
            {tag}
            <button onClick={() => removeTag(tag)}>&times;</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
