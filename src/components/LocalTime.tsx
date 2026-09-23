'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/lib/data';

export default function LocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', hour12: true });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time || '--:--'}</span>;
}
