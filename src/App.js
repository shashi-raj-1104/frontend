


import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import custom styles

function App() {
    const [url, setUrl] = useState('');
    const [n, setN] = useState(10);
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const analyzeUrl = async () => {
        if (!url) {
            setError('Please enter a URL.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/analyze', { url, n });
            setWords(response.data);
        } catch (error) {
            setError('Failed to fetch or analyze the URL');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Word Frequency Analyzer</h1>
            </header>
            <div className="content">
                <div className="input-container">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter a URL"
                        className="url-input"
                    />
                    <input
                        type="number"
                        value={n}
                        onChange={(e) => setN(e.target.value)}
                        placeholder="Top N words"
                        className="number-input"
                        min="1"
                        max="50"
                    />
                    <button onClick={analyzeUrl} className="analyze-btn" disabled={loading}>
                        {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                {words.length > 0 && !loading && (
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {words.map(({ word, count }, index) => (
                                <tr key={index}>
                                    <td>{word}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default App;
