import React from 'react';

const HistorySidebar = ({ isOpen, onClose, historyData, clearHistory }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Chat History</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800 text-2xl p-2 transition-colors"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
                    {historyData && historyData.length > 0 && <div className='flex justify-end'>
                        <button className='text-sm text-red-400 font-semibold rounded-md' onClick={() => clearHistory()}>Clear History</button>
                    </div>}
                    {historyData && historyData.length > 0 ? (
                        historyData.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 border-b border-gray-200 last:border-b-0"
                            >
                                {Object.entries(item).map(([key, value], idx) => (
                                    <div key={idx} className="mb-3">
                                        <div className="font-semibold text-gray-800 mb-1">
                                            Q: {key}
                                        </div>
                                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                            A: {value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            No chat history available
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HistorySidebar;
