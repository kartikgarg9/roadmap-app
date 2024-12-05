import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4 sticky top-0">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4">Quiz Categories</h2>
                <div className="overflow-x-auto whitespace-nowrap">
                    <ul className="flex space-x-8">
                        <li><Link to="/quiz/javascript" className="text-lg hover:underline">JavaScript</Link></li>
                        <li><Link to="/quiz/python" className="text-lg hover:underline">Python</Link></li>
                        <li><Link to="/quiz/react" className="text-lg hover:underline">React</Link></li>
                        <li><Link to="/quiz/node" className="text-lg hover:underline">Node</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
