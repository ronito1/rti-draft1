import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Share2, Copy, Download, Wand2 } from 'lucide-react';
import { generateBlogContent, generateSocialContent } from '../utils/contentGenerator';

const ContentGenerator = () => {
  const [selectedArticle, setSelectedArticle] = useState('');
  const [blogContent, setBlogContent] = useState(null);
  const [socialContent, setSocialContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const sampleArticles = [
    {
      id: 1,
      title: 'SSC CGL Exam Faces Technical Glitches Across Multiple Centers',
      summary: 'Several examination centers reported server issues and login problems during the SSC CGL examination.',
      rtiRelevance: 0.85
    },
    {
      id: 2,
      title: 'Municipal Corporation Delays Road Repair Project for Six Months',
      summary: 'Citizens complain about deteriorating road conditions as civic body fails to meet promised deadlines.',
      rtiRelevance: 0.75
    },
    {
      id: 3,
      title: 'Government Hospital Shortage of Essential Medicines Reported',
      summary: 'Patients face difficulties due to unavailability of critical medications in public healthcare facilities.',
      rtiRelevance: 0.90
    }
  ];

  const handleGenerate = async () => {
    if (!selectedArticle) return;
    
    setIsGenerating(true);
    
    // Simulate content generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const article = sampleArticles.find(a => a.id.toString() === selectedArticle);
    const blog = generateBlogContent(article);
    const social = generateSocialContent(article);
    
    setBlogContent(blog);
    setSocialContent(social);
    setIsGenerating(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Content Generator
        </h1>
        <p className="text-gray-600">
          Generate RTI-focused blog posts and social media content in FileMyRTI style
        </p>
      </motion.div>

      {/* Article Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Article</h2>
        
        <div className="space-y-3 mb-6">
          {sampleArticles.map((article) => (
            <label key={article.id} className="flex items-start space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="article"
                value={article.id}
                checked={selectedArticle === article.id.toString()}
                onChange={(e) => setSelectedArticle(e.target.value)}
                className="mt-1"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{article.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{article.summary}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {(article.rtiRelevance * 100).toFixed(0)}% RTI Relevance
                </span>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedArticle || isGenerating}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Content...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate Content</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Generated Content */}
      {(blogContent || socialContent) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blog Content */}
          {blogContent && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Blog Post</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(Object.values(blogContent).join('\n\n'))}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Title</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md">{blogContent.title}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Introduction</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md">{blogContent.intro}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">What Happened</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md">{blogContent.whatHappened}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">How RTI Can Help</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md">{blogContent.howRtiHelps}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">RTI Queries</h4>
                  <div className="space-y-2">
                    {blogContent.rtiQueries.map((query, index) => (
                      <p key={index} className="text-gray-700 text-sm bg-gray-50 p-2 rounded-md">
                        {index + 1}. {query}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Public Authority</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md">{blogContent.publicAuthority}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Call to Action</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md">{blogContent.cta}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Content */}
          {socialContent && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Share2 className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Twitter/X */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Twitter/X</h4>
                    <button
                      onClick={() => copyToClipboard(socialContent.twitter)}
                      className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                    {socialContent.twitter}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {socialContent.twitter.length}/280 characters
                  </p>
                </div>

                {/* LinkedIn */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">LinkedIn</h4>
                    <button
                      onClick={() => copyToClipboard(socialContent.linkedin)}
                      className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 whitespace-pre-line">
                    {socialContent.linkedin}
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Instagram</h4>
                    <button
                      onClick={() => copyToClipboard(socialContent.instagram)}
                      className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 whitespace-pre-line">
                    {socialContent.instagram}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
