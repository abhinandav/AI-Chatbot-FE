import React, { useState, useEffect } from 'react';
import SearchBar from '../components/seachBar';
import HistorySidebar from '../components/historySidebar';
import { MdHistory } from "react-icons/md";


const SearchScreen = () => {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [response, setResponse] = useState('')
  const [history, setHistory] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      fetchHistory(storedSessionId);
    } else {
      const newSessionId = generateSessionId();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
      fetchHistory(newSessionId);
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchHistory(sessionId); 
    }
  }, [sessionId]);

  const handleSearch = async () => {
    if (message.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(baseUrl + 'chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
            session_id: sessionId,
          }),
        });
        const data = await response.json();
        setResponse(data.answer)
        console.log(data);
        fetchHistory(sessionId)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please enter a message!');
    }
  };

  const fetchHistory = async (sessionId) => {
    try {
      const response = await fetch(`${baseUrl}session/${sessionId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setHistory(data.history)
      console.log(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  }

  const clearHistory = async () => {
    try {
      const response = await fetch(`${baseUrl}session/${sessionId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }

  const generateSessionId = () => {
    return 'session-' + Math.random().toString(36).substr(2, 9);
  };



  return (
    <div className="h-full w-full  flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full h-full px-4 flex flex-col">

        <div className='flex justify-start '>
          <MdHistory className='text-white text-xl cursor-pointer mt-6 mr-1' onClick={() => setIsOpen(true)}/>
          <p className=' text-md font-semibold text-white cursor-pointer mt-5' onClick={() => setIsOpen(true)}>History</p>
        </div>

        <div className="flex flex-col items-center space-y-6 h-full">
          <h1 className="text-4xl font-bold text-white mb-8 text-center mt-20">
            AI Search Assistant
          </h1>
          <div className="flex w-full justify-center">
            <SearchBar message={message} setMessage={setMessage} handleSearch={handleSearch} />
          </div>
          {isLoading&&<p className='text-white text-lg font-semibold'>Loading...</p>}
          <div className="flex-1 w-[800px] overflow-y-auto">
              {response&& (
                <div className="w-full mt-6 p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl">
                  <p className="text-gray-800 text-lg">{response}</p>
                </div>
              )}
          </div>
        </div>
      </div>
      {isOpen && <HistorySidebar isOpen={isOpen} onClose={() => setIsOpen(false)} historyData={history} clearHistory={clearHistory} />}
    </div>
  );
};

export default SearchScreen;
