import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="w-full text-center py-8">
      <div className="animate-pulse text-lg">Loading movies...</div>
    </div>
  );
}