'use client';

import { useEffect, useState } from 'react';

interface NowCardProps {
    location: string;
    timezone: string;
    activity?: string;
}

/** Small live status line: location, ticking local time, current activity. */
export default function NowCard({ location, timezone, activity }: NowCardProps) {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const update = () => {
            try {
                setTime(
                    new Intl.DateTimeFormat('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: timezone,
                    }).format(new Date())
                );
            } catch {
                setTime('');
            }
        };
        update();
        const id = setInterval(update, 10000);
        return () => clearInterval(id);
    }, [timezone]);

    return (
        <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-5 py-2 mb-6 rounded-full border border-zinc-200/70 bg-white/70 backdrop-blur-sm text-xs text-zinc-500 shadow-sm">
            <span aria-hidden>📍</span>
            <span className="font-medium text-zinc-700">{location}</span>
            {time && (
                <>
                    <span className="text-zinc-300">·</span>
                    <span className="tabular-nums">{time} local</span>
                </>
            )}
            {activity && (
                <>
                    <span className="text-zinc-300">·</span>
                    <span>{activity}</span>
                </>
            )}
        </div>
    );
}
