export default function TimelineItem({ item, last }: { item: any, last: boolean }) {
    return (
        <div className={`relative pl-8 pb-12 ${last ? '' : 'border-l border-gray-200 dark:border-gray-800'}`}>
            <span className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-white dark:ring-gray-900" />

            <div className="glass-card p-6 rounded-2xl transition hover:shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-primary">{item.institution}</h3>
                        <p className="text-lg font-medium text-foreground">{item.degree}</p>
                    </div>
                    {item.dates && <span className="inline-block mt-2 md:mt-0 px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-secondary">{item.dates}</span>}
                </div>

                {item.grades && <p className="text-sm text-secondary font-medium mb-3">{item.grades}</p>}

                <p className="text-sm text-secondary leading-relaxed mb-4">{item.longDescription}</p>

                {item.awards && item.awards.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Awards & Recognition</h4>
                        <ul className="space-y-1">
                            {item.awards.map((award: string, idx: number) => (
                                <li key={idx} className="text-sm text-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-accent"></span>
                                    {award}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {item.keyModules && item.keyModules.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Key Modules</h4>
                        <div className="flex flex-wrap gap-2">
                            {item.keyModules.map((mod: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 text-xs rounded-md bg-gray-50 border border-gray-100 text-secondary">
                                    {mod}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
