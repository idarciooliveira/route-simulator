import Head from 'next/head';

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./map'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
}
