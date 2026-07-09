'use client';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function MathRenderer({ children }: { children: string }) {
    return (
        <span className="font-mono text-base">
            <Latex>{children}</Latex>
        </span>
    );
}
