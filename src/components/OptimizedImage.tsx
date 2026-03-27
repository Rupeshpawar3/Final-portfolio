
import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, className, alt, ...props }) => {
    // Assuming the optimization script adds .webp and .avif extensions
    // Example: image.jpg -> image.webp, image.avif

    // Note: This logic assumes the file extension is 3 or 4 chars long
    const basePath = src.substring(0, src.lastIndexOf('.'));

    if (!basePath) {
        // If no extension found or special path, return standard img
        return <img src={src} className={className} alt={alt} {...props} />;
    }

    return (
        <picture className={className}>
            <source srcSet={`${basePath}.avif`} type="image/avif" />
            <source srcSet={`${basePath}.webp`} type="image/webp" />
            <img src={src} className={className} alt={alt} {...props} />
        </picture>
    );
};
