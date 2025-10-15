'use client';
import { useState } from 'react';

export default function TagInput({tags, setTags}: {tags: string[], setTags: (tags: string[]) => void}) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
        e.preventDefault();
        const newTag = inputValue.trim();
        if (!tags.includes(newTag)) {
            setTags([...tags, newTag]);
        }
        setInputValue('');
    }
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col space-y-1">
      <h2 className="font-serif font-medium text-lg">Tags</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter tags and press Enter"
        className="text-sm md:text-md lg:text-lg xl:text-lg w-full rounded-sm bg-gray-100 px-2 py-1 dark:bg-black dark:placeholder:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 outline-1"
      />
    </div>
  )
}
