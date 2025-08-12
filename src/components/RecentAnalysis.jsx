import React from 'react';
import { motion } from 'framer-motion';
import { Eye, FileText, Share2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const RecentAnalysis = ({ articles }) => {
  const getRelevanceColor = (score) => {
    if (score >= 0.8) return 'text-red-600 bg-red-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getRelevanceLabel = (score) => {
    if (score >= 0.8) return 'High';
    if (score >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md"
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Recent Analysis</h2>
        <p className="text-gray-600">Latest articles processed for RTI relevance</p>
      </div>

      <div className="divide-y divide-gray-200">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-medium text-blue-600">{article.source}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(article.rtiRelevance)}`}>
                    {getRelevanceLabel(article.rtiRelevance)} RTI Relevance
                  </span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.summary}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(article.publishedAt), 'MMM dd, HH:mm')}</span>
                  </div>
                  
                  {article.rtiQueries && (
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{article.rtiQueries.length} RTI queries suggested</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                
                {article.status === 'processed' && (
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Generate</span>
                  </button>
                )}
              </div>
            </div>

            {article.rtiCategories && article.rtiCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {article.rtiCategories.map((category, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-gray-50 text-center">
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          View All Articles →
        </button>
      </div>
    </motion.div>
  );
};

export default RecentAnalysis;
