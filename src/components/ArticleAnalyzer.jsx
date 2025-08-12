import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, AlertCircle, CheckCircle, FileSearch } from 'lucide-react';
import { analyzeArticleForRTI } from '../utils/rtiAnalyzer';

const ArticleAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeArticleForRTI(inputText);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const getRelevanceColor = (score) => {
    if (score >= 0.8) return 'text-red-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          RTI Article Analyzer
        </h1>
        <p className="text-gray-600">
          Analyze news articles for RTI relevance and generate actionable insights
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <FileSearch className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Input Article</h2>
        </div>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste the news article content here for RTI relevance analysis..."
          className="w-full h-40 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {inputText.length} characters
          </span>
          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                <span>Analyze RTI Relevance</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Relevance Score */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">RTI Relevance Analysis</h3>
              <div className="flex items-center space-x-2">
                {analysis.rtiRelevance >= 0.6 ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getRelevanceColor(analysis.rtiRelevance)}`}>
                  {(analysis.rtiRelevance * 100).toFixed(0)}%
                </div>
                <div className="text-gray-600">RTI Relevance Score</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {analysis.categories.length}
                </div>
                <div className="text-gray-600">RTI Categories</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {analysis.suggestedQueries.length}
                </div>
                <div className="text-gray-600">Suggested Queries</div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">RTI Categories Detected</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Suggested RTI Queries */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested RTI Queries</h3>
            <div className="space-y-3">
              {analysis.suggestedQueries.map((query, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-800">{query}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Public Authority */}
          {analysis.publicAuthority && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Public Authority</h3>
              <div className="p-4 bg-green-50 rounded-md border border-green-200">
                <p className="text-green-800 font-medium">{analysis.publicAuthority}</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ArticleAnalyzer;
