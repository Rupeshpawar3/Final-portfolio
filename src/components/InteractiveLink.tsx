
import React, { useRef } from 'react';

interface InteractiveLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

const InteractiveLink: React.FC<InteractiveLinkProps> = ({ href, children, className, onClick, ...props }) => {
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleTouchStart = () => {
        // Simple JS fallback for touch devices to toggle class briefly
        if (linkRef.current) {
            linkRef.current.classList.add('active');
        }
    };

    const handleTouchEnd = () => {
        // Remove after a short delay
        if (linkRef.current) {
            setTimeout(() => {
                linkRef.current?.classList.remove('active');
            }, 600);
        }
    };

    return (
        <a
            ref={linkRef}
            href={href}
            className={`nav-link-animated font-medium transition-colors ${className || ''}`}
            onClick={onClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            {...props}
        >
            {children}
        </a>
    );
};

export default InteractiveLink;
