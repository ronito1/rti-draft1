import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle, Clock, Newspaper } from 'lucide-react';
import NewsSourceCard from './NewsSourceCard';
import RecentAnalysis from './RecentAnalysis';
import { generateMockNewsData } from '../utils/mockData';

const Dashboard = () => {
  const [newsData, setNewsData] = useState([]);
  const [stats, setStats] = useState({
    totalArticles: 0,
    rtiRelevant: 0,
    pending: 0,
    processed: 0
  });

  useEffect(() => {
    // Simulate fetching news data
    const mockData = generateMockNewsData();
    setNewsData(mockData);
    
    // Calculate stats
    const totalArticles = mockData.length;
    const rtiRelevant = mockData.filter(article => article.rtiRelevance > 0.6).length;
    const pending = mockData.filter(article => article.status === 'pending').length;
    const processed = mockData.filter(article => article.status === 'processed').length;
    
    setStats({ totalArticles, rtiRelevant, pending, processed });
  }, []);

  const statCards = [
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: Newspaper,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'RTI Relevant',
      value: stats.rtiRelevant,
      icon: AlertCircle,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Pending Analysis',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-5%'
    },
    {
      title: 'Processed',
      value: stats.processed,
      icon: CheckCircle,
      color: 'bg-purple-500',
      change: '+15%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          RTI News Monitoring Dashboard
        </h1>
        <p className="text-gray-600">
          Automated monitoring of The Hindu and Times of India for RTI-relevant stories
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from yesterday
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* News Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewsSourceCard
          source="The Hindu"
          articlesCount={Math.floor(stats.totalArticles * 0.6)}
          rtiRelevant={Math.floor(stats.rtiRelevant * 0.7)}
          lastUpdate="2 minutes ago"
          status="active"
        />
        <NewsSourceCard
          source="Times of India"
          articlesCount={Math.floor(stats.totalArticles * 0.4)}
          rtiRelevant={Math.floor(stats.rtiRelevant * 0.3)}
          lastUpdate="5 minutes ago"
          status="active"
        />
      </div>

      {/* Recent Analysis */}
      <RecentAnalysis articles={newsData.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;
