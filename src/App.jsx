import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import ArticleAnalyzer from './components/ArticleAnalyzer';
import ExportManager from './components/ExportManager';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyzer" element={<ArticleAnalyzer />} />
            <Route path="/generator" element={<ContentGenerator />} />
            <Route path="/export" element={<ExportManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
