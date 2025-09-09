"use client";

import Image from "next/image";

export default function FeatureSection() {
  return (
    <section className="w-full bg-white dark:bg-black">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          <Image
            src="/feature-demo.svg"
            alt="Task board preview"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 md:text-4xl dark:text-slate-100">
            Stay organized with boards, lists, and timelines
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600 md:text-lg dark:text-neutral-400">
            Visualize your work the way it suits your team. Create tasks, assign
            owners, set priorities, and track progress in real-time. Our clean,
            intuitive interface keeps everyone aligned and focused on outcomes.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700 md:text-base dark:text-neutral-300">
            <li className="flex items-start gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-emerald-500" />
              Real-time updates across devices
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-blue-500" />
              Drag-and-drop prioritization
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-purple-500" />
              Timeline and workload views
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
