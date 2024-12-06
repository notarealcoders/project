import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full text-center py-8">
      <div className="text-red-500 bg-red-100 p-4 rounded-lg">
        Error: {message}
      </div>
    </div>
  );
}