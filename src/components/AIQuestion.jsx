import React, { useState } from 'react';
import { createEvent } from '../supabaseClient';

export default function AIQuestion(){
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!question) return;
        setLoading(true);
        try {
            const result = await createEvent('chatgpt_request', {
                prompt: question,
                response_type: 'text'
            });
            setAnswer(result.data);
            console.log('AI Question Response:', result);
        } catch (error) {
            console.error('Error fetching AI answer:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-2 text-gray-700">Ask AI Anything</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 box-border"
                    rows="4"
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 rounded-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {answer && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">AI Answer:</h3>
                    <p className="text-gray-700">{answer}</p>
                </div>
            )}
        </div>
    )
}