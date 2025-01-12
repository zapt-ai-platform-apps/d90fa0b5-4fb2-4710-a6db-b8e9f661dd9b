import React, { useState } from 'react';
import { createEvent } from '../supabaseClient';

export default function AIDraw(){
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDraw = async (e) => {
        e.preventDefault();
        if(!prompt) return;
        setLoading(true);
        try {
            const result = await createEvent('generate_image', {
                prompt: prompt
            });
            setImageUrl(result.data);
            console.log('AI Draw Response:', result);
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-2 text-gray-700">AI Draw Picture</h2>
            <form onSubmit={handleDraw} className="space-y-4">
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 box-border"
                    placeholder="Describe the image you want..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type="submit"
                    className={`w-full bg-green-500 text-white py-2 rounded-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Draw'}
                </button>
            </form>
            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="AI Generated" className="w-full h-auto rounded-lg" />
                </div>
            )}
        </div>
    )
}