export default function ContactLink({ href, label, value, description, icon: Icon }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-gray-200 bg-white/60 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary-500/50 hover:shadow-md dark:border-gray-700 dark:bg-zinc-900/30"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition group-hover:bg-primary-500/10 group-hover:text-primary-600 dark:bg-zinc-800 dark:text-gray-200 dark:group-hover:bg-primary-500/10 dark:group-hover:text-primary-400">
            {Icon ? <Icon className="h-5 w-5" /> : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</p>
              <span className="text-xs text-gray-400 transition group-hover:text-primary-500 dark:text-gray-500 dark:group-hover:text-primary-400">
                ↗
              </span>
            </div>
            <p className="mt-1 truncate font-mono text-sm text-gray-600 dark:text-gray-300">
              {value}
            </p>
            {description ? (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            ) : null}
          </div>
        </div>
      </a>
    </li>
  )
}
