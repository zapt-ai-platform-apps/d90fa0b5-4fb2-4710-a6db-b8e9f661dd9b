import React from 'react';
import AIQuestion from './components/AIQuestion';
import AIDraw from './components/AIDraw';
import AIPDFInterpret from './components/AIPDFInterpret';
import AIDreamInterpret from './components/AIDreamInterpret';
import AIVoiceResponse from './components/AIVoiceResponse';
import MadeOnZAPTBadge from './components/MadeOnZAPTBadge';

export default function App(){
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">AI Assistance App</h1>
            <div className="w-full max-w-lg space-y-6">
                <AIQuestion />
                <AIDraw />
                <AIPDFInterpret />
                <AIDreamInterpret />
                <AIVoiceResponse />
            </div>
            <MadeOnZAPTBadge />
        </div>
    )
}