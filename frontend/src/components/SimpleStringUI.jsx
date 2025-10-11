import axios from 'axios';
import React, { useState } from 'react';
import { createShortUrl } from '../apis/urlEnc';

function SimpleStringUI() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input)
    if (!input) {
      setResult("Please enter a valid string.");
    }
    else {
      console.log(`${import.meta.env.VITE_API_URL}/api/create`)
      const data = await createShortUrl(input);
      setResult(data.short_url);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gray-800 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8 drop-shadow-lg">URL Shortner</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter your string..."
            className="w-full px-4 py-3 mb-6 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold text-lg shadow-md transition cursor-pointer"
          >
            Submit
          </button>
        </form>
          {result && (
            <div className="mt-8 p-4 rounded-lg bg-gray-900 border border-cyan-700 text-cyan-300 text-center text-lg shadow-inner animate-fade-in flex flex-col items-center">
              <div className="flex items-center gap-2">
                <span className="break-all">{result}</span>
                <button
                  className="ml-2 px-2 py-1 rounded bg-cyan-700 hover:bg-cyan-500 text-white text-sm transition cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  title="Copy to clipboard"
                  disabled={copied}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default SimpleStringUI;
