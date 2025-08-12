export const analyzeArticleForRTI = (articleText) => {
  // Simulated NLP analysis for RTI relevance
  // In a real implementation, this would use actual NLP/AI services
  
  const governmentKeywords = [
    'government', 'ministry', 'department', 'authority', 'administration',
    'public', 'civic', 'municipal', 'state', 'central', 'bureau', 'commission'
  ];
  
  const issueKeywords = [
    'delay', 'problem', 'issue', 'glitch', 'failure', 'shortage', 'complaint',
    'dispute', 'concern', 'difficulty', 'challenge', 'error', 'fault'
  ];
  
  const serviceKeywords = [
    'exam', 'test', 'application', 'service', 'facility', 'infrastructure',
    'project', 'scheme', 'program', 'contract', 'tender', 'allocation'
  ];
  
  const transparencyKeywords = [
    'audit', 'investigation', 'review', 'inquiry', 'report', 'disclosure',
    'accountability', 'transparency', 'compliance', 'verification'
  ];

  const text = articleText.toLowerCase();
  
  // Calculate relevance score based on keyword presence
  let score = 0;
  let matchedCategories = [];
  
  // Check for government entities (high weight)
  const govMatches = governmentKeywords.filter(keyword => text.includes(keyword));
  if (govMatches.length > 0) {
    score += 0.3;
    matchedCategories.push('Government Entity');
  }
  
  // Check for issues/problems (medium weight)
  const issueMatches = issueKeywords.filter(keyword => text.includes(keyword));
  if (issueMatches.length > 0) {
    score += 0.2;
    matchedCategories.push('Service Issues');
  }
  
  // Check for public services (medium weight)
  const serviceMatches = serviceKeywords.filter(keyword => text.includes(keyword));
  if (serviceMatches.length > 0) {
    score += 0.25;
    matchedCategories.push('Public Services');
  }
  
  // Check for transparency indicators (high weight)
  const transparencyMatches = transparencyKeywords.filter(keyword => text.includes(keyword));
  if (transparencyMatches.length > 0) {
    score += 0.35;
    matchedCategories.push('Transparency');
  }
  
  // Additional scoring based on context
  if (text.includes('rti') || text.includes('right to information')) {
    score += 0.4;
    matchedCategories.push('RTI Mentioned');
  }
  
  if (text.includes('citizen') || text.includes('public interest')) {
    score += 0.1;
    matchedCategories.push('Citizen Interest');
  }

  // Ensure score doesn't exceed 1.0
  score = Math.min(score, 1.0);
  
  // Generate relevant RTI queries based on content analysis
  const queries = generateRTIQueries(text, matchedCategories);
  
  // Suggest appropriate public authority
  const publicAuthority = suggestPublicAuthority(text);
  
  return {
    rtiRelevance: score,
    categories: matchedCategories,
    suggestedQueries: queries,
    publicAuthority: publicAuthority,
    analysis: {
      governmentEntities: govMatches,
      issues: issueMatches,
      services: serviceMatches,
      transparencyIndicators: transparencyMatches
    }
  };
};

const generateRTIQueries = (text, categories) => {
  const queries = [];
  
  if (text.includes('exam') || text.includes('test')) {
    queries.push(
      'Provide details of technical issues reported during the examination',
      'Share the investigation report on examination center glitches',
      'Provide vendor contract details for examination technology services',
      'Share the action taken report regarding examination disruptions'
    );
  }
  
  if (text.includes('delay') || text.includes('project')) {
    queries.push(
      'Provide project timeline and milestone completion status',
      'Share details of reasons for project delays',
      'Provide contractor performance evaluation reports',
      'Share details of cost escalation and budget revisions'
    );
  }
  
  if (text.includes('hospital') || text.includes('medicine')) {
    queries.push(
      'Provide inventory details of essential medicines',
      'Share procurement records for medical supplies',
      'Provide details of supplier contracts and delivery schedules',
      'Share patient complaint records regarding medicine shortage'
    );
  }
  
  if (text.includes('road') || text.includes('infrastructure')) {
    queries.push(
      'Provide details of approved road repair projects',
      'Share contractor selection and tender documents',
      'Provide project execution timeline and completion status',
      'Share quality control and supervision reports'
    );
  }
  
  // Generic queries for government services
  if (categories.includes('Government Entity')) {
    queries.push(
      'Provide details of standard operating procedures for this service',
      'Share performance metrics and service delivery standards'
    );
  }
  
  return queries.slice(0, 6); // Limit to 6 queries
};

const suggestPublicAuthority = (text) => {
  if (text.includes('ssc') || text.includes('staff selection commission')) {
    return 'Staff Selection Commission (SSC)';
  }
  
  if (text.includes('upsc') || text.includes('civil services')) {
    return 'Union Public Service Commission (UPSC)';
  }
  
  if (text.includes('municipal') || text.includes('corporation')) {
    return 'Municipal Corporation';
  }
  
  if (text.includes('hospital') || text.includes('health')) {
    return 'Department of Health and Family Welfare';
  }
  
  if (text.includes('road') || text.includes('transport')) {
    return 'Public Works Department (PWD)';
  }
  
  if (text.includes('school') || text.includes('education')) {
    return 'Department of Education';
  }
  
  if (text.includes('railway') || text.includes('train')) {
    return 'Indian Railways';
  }
  
  return 'Relevant Government Department';
};
