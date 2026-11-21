import React from 'react';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  desktopSrc: string;
  mobileSrc?: string;
  mobileBreakpoint?: string;
  alt: string;
  className?: string;
  pictureClassName?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  desktopSrc,
  mobileSrc,
  mobileBreakpoint = '(max-width: 768px)',
  alt,
  className = '',
  pictureClassName = '',
  loading = 'lazy',
  ...rest
}) => {
  if (!mobileSrc) {
    return (
      <img
        src={desktopSrc}
        alt={alt}
        className={className}
        loading={loading}
        {...rest}
      />
    );
  }

  return (
    <picture className={pictureClassName}>
      <source media={mobileBreakpoint} srcSet={mobileSrc} />
      <img
        src={desktopSrc}
        alt={alt}
        className={className}
        loading={loading}
        {...rest}
      />
    </picture>
  );
};

export default ResponsiveImage;
