import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Activity, AlertTriangle } from 'lucide-react';

const NewsSourceCard = ({ source, articlesCount, rtiRelevant, lastUpdate, status }) => {
  const relevanceRate = articlesCount > 0 ? ((rtiRelevant / articlesCount) * 100).toFixed(1) : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{source}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-500">{status}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Articles Today</span>
          <span className="font-semibold">{articlesCount}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">RTI Relevant</span>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-green-600">{rtiRelevant}</span>
            <span className="text-sm text-gray-500">({relevanceRate}%)</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Last Update</span>
          <span className="text-sm text-gray-500">{lastUpdate}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">Monitoring Active</span>
          </div>
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
            <span>View Details</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {rtiRelevant > 0 && (
        <div className="mt-3 p-3 bg-yellow-50 rounded-md border border-yellow-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              {rtiRelevant} new RTI opportunities detected
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NewsSourceCard;
