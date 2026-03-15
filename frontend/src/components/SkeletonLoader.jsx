import React from 'react';

const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '0.5rem', marginBottom = '1rem' }) => {
    return (
        <div
            className="skeleton"
            style={{
                width,
                height,
                borderRadius,
                marginBottom
            }}
        />
    );
};

export default SkeletonLoader;
