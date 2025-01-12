import React, { useState } from 'react';
import { createEvent } from '../supabaseClient';

export default function AIDreamInterpret(){
    const [dream, setDream] = useState('');
    const [interpretation, setInterpretation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInterpret = async (e) => {
        e.preventDefault();
        if(!dream) return;
        setLoading(true);
        try {
            const result = await createEvent('chatgpt_request', {
                prompt: `Interpret the following dream in detail:\n\n${dream}`,
                response_type: 'text'
            });
            setInterpretation(result.data);
            console.log('AI Dream Interpretation:', result);
        } catch (error) {
            console.error('Error interpreting dream:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-2 text-gray-700">Dream Interpretation</h2>
            <form onSubmit={handleInterpret} className="space-y-4">
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 box-border"
                    rows="4"
                    placeholder="Describe your dream..."
                    value={dream}
                    onChange={(e) => setDream(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className={`w-full bg-yellow-500 text-white py-2 rounded-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600'}`}
                    disabled={loading}
                >
                    {loading ? 'Interpreting...' : 'Interpret'}
                </button>
            </form>
            {interpretation && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Interpretation:</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{interpretation}</p>
                </div>
            )}
        </div>
    )
}