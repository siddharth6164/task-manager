export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-4 py-10 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-black dark:text-neutral-400">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
            <span className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
              Task Manager
            </span>
          </div>
          <p className="mt-3 max-w-md">
            A simple, efficient task management system for small teams.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Product
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a className="hover:underline" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/faq">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Contact
          </h3>
          <ul className="mt-3 space-y-2">
            <li>Email: support@example.com</li>
            <li>Phone: +1 (555) 000-0000</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-neutral-200 pt-6 text-xs text-neutral-500 dark:border-neutral-800">
        © {new Date().getFullYear()} Task Manager. All rights reserved.
      </div>
    </footer>
  );
}
