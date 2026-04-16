"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("@/components/HomeClient"), {
  ssr: false,
  loading: () => <main id="top" className="flex min-h-screen flex-col" />,
});

export default function HomeNoSSR() {
  return <HomeClient />;
}
