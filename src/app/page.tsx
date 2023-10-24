'use client';

import React from 'react';
import data from './data.json';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between px-72 py-12">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
