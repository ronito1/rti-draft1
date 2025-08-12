import { faker } from '@faker-js/faker';

export const generateMockNewsData = () => {
  const sources = ['The Hindu', 'Times of India'];
  const rtiCategories = [
    'Government Exams',
    'Public Services',
    'Infrastructure',
    'Healthcare',
    'Education',
    'Transportation',
    'Civic Issues',
    'Government Contracts',
    'Public Records',
    'Administrative Delays'
  ];

  const sampleTitles = [
    'SSC CGL Exam Faces Technical Glitches Across Multiple Centers',
    'Municipal Corporation Delays Road Repair Project for Six Months',
    'Government Hospital Shortage of Essential Medicines Reported',
    'UPSC Exam Results Delayed Due to Administrative Issues',
    'Public Transport Services Disrupted in Major Cities',
    'School Building Construction Project Behind Schedule',
    'Water Supply Issues Plague Residential Areas',
    'Government Employee Pension Disbursement Delayed',
    'Public Park Maintenance Contract Under Review',
    'Railway Station Renovation Project Faces Cost Overruns',
    'Health Department Audit Reveals Equipment Shortages',
    'Educational Board Exam Paper Leak Investigation Ongoing',
    'Municipal Waste Management System Faces Challenges',
    'Government Housing Scheme Applications Processing Delays',
    'Public Library Digitization Project Timeline Extended'
  ];

  return Array.from({ length: 25 }, (_, index) => {
    const title = sampleTitles[index % sampleTitles.length];
    const rtiRelevance = Math.random();
    const publishedAt = faker.date.recent({ days: 7 });
    
    return {
      id: index + 1,
      title: title,
      source: sources[Math.floor(Math.random() * sources.length)],
      summary: faker.lorem.sentences(2),
      content: faker.lorem.paragraphs(3),
      publishedAt: publishedAt.toISOString(),
      rtiRelevance: rtiRelevance,
      rtiCategories: rtiRelevance > 0.6 ? 
        faker.helpers.arrayElements(rtiCategories, { min: 1, max: 3 }) : 
        [],
      status: faker.helpers.arrayElement(['pending', 'processed', 'exported']),
      rtiQueries: rtiRelevance > 0.6 ? 
        Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => 
          faker.lorem.sentence()
        ) : 
        []
    };
  });
};
