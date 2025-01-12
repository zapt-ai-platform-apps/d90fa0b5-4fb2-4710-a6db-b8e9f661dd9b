import React, { useState } from 'react';
import { createEvent } from '../supabaseClient';

export default function AIVoiceResponse(){
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTextToSpeech = async (e) => {
        e.preventDefault();
        if(!text) return;
        setLoading(true);
        try {
            const result = await createEvent('text_to_speech', {
                text: text
            });
            setAudioUrl(result.data);
            console.log('AI Text to Speech:', result);
        } catch (error) {
            console.error('Error converting text to speech:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-2 text-gray-700">Text to Speech</h2>
            <form onSubmit={handleTextToSpeech} className="space-y-4">
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 box-border"
                    rows="4"
                    placeholder="Enter text to convert to speech..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className={`w-full bg-indigo-500 text-white py-2 rounded-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
                    disabled={loading}
                >
                    {loading ? 'Converting...' : 'Convert to Speech'}
                </button>
            </form>
            {audioUrl && (
                <div className="mt-4">
                    <audio controls src={audioUrl} className="w-full"></audio>
                </div>
            )}
        </div>
    )
}