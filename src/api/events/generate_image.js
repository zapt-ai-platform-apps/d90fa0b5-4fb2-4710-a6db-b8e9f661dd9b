import { authenticateUser } from '../_apiUtils.js';
import { createEvent } from '@zapt/zapt-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const user = await authenticateUser(req);
        const { prompt } = req.body;

        const result = await createEvent('generate_image', {
            app_id: import.meta.env.VITE_PUBLIC_APP_ID,
            prompt: prompt
        });

        res.status(200).json(result);
    } catch (error) {
        Sentry.captureException(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}