import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      
      {/* Spinner */}
      <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-lg font-medium text-gray-700">
        Loading all rooms...
      </p>

    </div>
  );
};

export default Loading;