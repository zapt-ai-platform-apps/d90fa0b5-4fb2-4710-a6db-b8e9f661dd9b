import React, { useState } from 'react';
import { createEvent } from '../supabaseClient';

export default function AIPDFInterpret(){
    const [pdfFile, setPdfFile] = useState(null);
    const [interpretation, setInterpretation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    }

    const handleInterpret = async (e) => {
        e.preventDefault();
        if(!pdfFile) return;
        setLoading(true);
        const reader = new FileReader();
        reader.onload = async () => {
            const text = reader.result;
            try {
                const result = await createEvent('chatgpt_request', {
                    prompt: `Interpret the following PDF content in detail:\n\n${text}`,
                    response_type: 'text'
                });
                setInterpretation(result.data);
                console.log('AI PDF Interpretation:', result);
            } catch (error) {
                console.error('Error interpreting PDF:', error);
            } finally {
                setLoading(false);
            }
        }
        reader.readAsText(pdfFile);
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-2 text-gray-700">PDF Interpretation</h2>
            <form onSubmit={handleInterpret} className="space-y-4">
                <input
                    type="file"
                    accept="application/pdf"
                    className="w-full"
                    onChange={handleFileChange}
                />
                <button
                    type="submit"
                    className={`w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'}`}
                    disabled={loading}
                >
                    {loading ? 'Interpreting...' : 'Interpret PDF'}
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