import React from 'react';

export const SkeletonLoader = () => {
    return (
        <div className="w-full max-w-[210mm] mx-auto bg-white p-8 shadow-sm min-h-[297mm] h-full flex flex-col space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-6">
                <div className="space-y-3 w-2/3">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            </div>

            {/* Profile Skeleton */}
            <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            {/* Experience Skeleton */}
            <div className="space-y-6 pt-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="space-y-1 pl-4 pt-2">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-11/12"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skills Skeleton */}
            <div className="space-y-3 pt-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-8 w-20 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
