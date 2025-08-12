import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Share2, Calendar, Filter } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { generateMockNewsData } from '../utils/mockData';

const ExportManager = () => {
  const [dateRange, setDateRange] = useState('7');
  const [relevanceFilter, setRelevanceFilter] = useState('all');
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const mockData = generateMockNewsData();
  
  const filteredData = mockData.filter(article => {
    // Date filter
    const articleDate = new Date(article.publishedAt);
    const cutoffDate = subDays(new Date(), parseInt(dateRange));
    if (articleDate < cutoffDate) return false;
    
    // Relevance filter
    if (relevanceFilter === 'high' && article.rtiRelevance < 0.8) return false;
    if (relevanceFilter === 'medium' && (article.rtiRelevance < 0.6 || article.rtiRelevance >= 0.8)) return false;
    if (relevanceFilter === 'low' && article.rtiRelevance >= 0.6) return false;
    
    return true;
  });

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (exportFormat === 'csv') {
      exportToCSV();
    } else if (exportFormat === 'json') {
      exportToJSON();
    } else if (exportFormat === 'markdown') {
      exportToMarkdown();
    }
    
    setIsExporting(false);
  };

  const exportToCSV = () => {
    const headers = ['Title', 'Source', 'Published Date', 'RTI Relevance', 'Categories', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(article => [
        `"${article.title.replace(/"/g, '""')}"`,
        article.source,
        format(new Date(article.publishedAt), 'yyyy-MM-dd HH:mm'),
        (article.rtiRelevance * 100).toFixed(1) + '%',
        `"${article.rtiCategories?.join('; ') || ''}"`,
        article.status
      ].join(','))
    ].join('\n');
    
    downloadFile(csvContent, 'rti-articles.csv', 'text/csv');
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredData, null, 2);
    downloadFile(jsonContent, 'rti-articles.json', 'application/json');
  };

  const exportToMarkdown = () => {
    const markdownContent = [
      '# RTI Articles Export',
      `\nExported on: ${format(new Date(), 'MMMM dd, yyyy')}`,
      `\nTotal articles: ${filteredData.length}`,
      '\n---\n',
      ...filteredData.map(article => [
        `## ${article.title}`,
        `**Source:** ${article.source}`,
        `**Published:** ${format(new Date(article.publishedAt), 'MMMM dd, yyyy HH:mm')}`,
        `**RTI Relevance:** ${(article.rtiRelevance * 100).toFixed(1)}%`,
        `**Categories:** ${article.rtiCategories?.join(', ') || 'None'}`,
        `**Status:** ${article.status}`,
        '',
        article.summary,
        '\n---\n'
      ].join('\n'))
    ].join('\n');
    
    downloadFile(markdownContent, 'rti-articles.md', 'text/markdown');
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Export Manager
        </h1>
        <p className="text-gray-600">
          Export RTI-relevant articles and generated content in various formats
        </p>
      </motion.div>

      {/* Export Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Export Configuration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
            </select>
          </div>

          {/* Relevance Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RTI Relevance
            </label>
            <select
              value={relevanceFilter}
              onChange={(e) => setRelevanceFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All articles</option>
              <option value="high">High relevance (80%+)</option>
              <option value="medium">Medium relevance (60-79%)</option>
              <option value="low">Low relevance (&lt;60%)</option>
            </select>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="csv">CSV (Spreadsheet)</option>
              <option value="json">JSON (Data)</option>
              <option value="markdown">Markdown (Documentation)</option>
            </select>
          </div>
        </div>

        {/* Export Summary */}
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 font-medium">
                Ready to export {filteredData.length} articles
              </p>
              <p className="text-blue-600 text-sm">
                From {format(subDays(new Date(), parseInt(dateRange)), 'MMM dd')} to {format(new Date(), 'MMM dd, yyyy')}
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting || filteredData.length === 0}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Export History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Recent Exports</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {[
            { date: new Date(), type: 'CSV', articles: 45, size: '2.3 MB' },
            { date: subDays(new Date(), 1), type: 'JSON', articles: 38, size: '1.8 MB' },
            { date: subDays(new Date(), 2), type: 'Markdown', articles: 52, size: '3.1 MB' },
          ].map((export_, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      RTI Articles Export ({export_.type})
                    </p>
                    <p className="text-sm text-gray-600">
                      {export_.articles} articles • {export_.size}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {format(export_.date, 'MMM dd, HH:mm')}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Download Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Export Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Export Templates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-300 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Daily RTI Report</p>
                <p className="text-sm text-gray-600">High relevance articles from today</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Share2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Social Media Content</p>
                <p className="text-sm text-gray-600">Generated posts for all platforms</p>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExportManager;
