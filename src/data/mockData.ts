import type { Tutor, Review, User } from '../types';

// Mock用户数据
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@edu.university.edu',
    tokens: 10,
    browsingHistory: [],
    reviews: []
  }
];

// Mock导师数据
export const mockTutors: Tutor[] = [
  {
    id: '1',
    name: '张教授',
    school: '北京大学',
    department: '计算机科学系',
    overallRating: 4.5,
    personalityRating: 4.3,
    academicRating: 4.7,
    internshipRating: 4.2,
    reviewCount: 15,
    reviews: []
  },
  {
    id: '2',
    name: '李教授',
    school: '清华大学',
    department: '电子工程系',
    overallRating: 4.2,
    personalityRating: 4.0,
    academicRating: 4.5,
    internshipRating: 4.1,
    reviewCount: 12,
    reviews: []
  },
  {
    id: '3',
    name: 'Dr. Smith',
    school: 'MIT',
    department: 'Computer Science',
    overallRating: 4.8,
    personalityRating: 4.6,
    academicRating: 4.9,
    internshipRating: 4.7,
    reviewCount: 23,
    reviews: []
  },
  {
    id: '4',
    name: 'Prof. Johnson',
    school: 'Stanford University',
    department: 'Artificial Intelligence',
    overallRating: 4.4,
    personalityRating: 4.2,
    academicRating: 4.6,
    internshipRating: 4.3,
    reviewCount: 18,
    reviews: []
  },
  {
    id: '5',
    name: '王教授',
    school: '上海交通大学',
    department: '软件工程系',
    overallRating: 4.1,
    personalityRating: 3.9,
    academicRating: 4.3,
    internshipRating: 4.0,
    reviewCount: 9,
    reviews: []
  },
  {
    id: '6',
    name: '陈教授',
    school: '中科院大学',
    department: '人工智能学院',
    overallRating: 4.6,
    personalityRating: 4.4,
    academicRating: 4.8,
    internshipRating: 4.5,
    reviewCount: 21,
    reviews: []
  },
  {
    id: '7',
    name: 'Dr. Williams',
    school: 'Harvard University',
    department: 'Data Science',
    overallRating: 4.7,
    personalityRating: 4.5,
    academicRating: 4.9,
    internshipRating: 4.6,
    reviewCount: 28,
    reviews: []
  },
  {
    id: '8',
    name: '刘教授',
    school: '复旦大学',
    department: '数学科学学院',
    overallRating: 4.3,
    personalityRating: 4.1,
    academicRating: 4.6,
    internshipRating: 4.0,
    reviewCount: 16,
    reviews: []
  },
  {
    id: '9',
    name: 'Prof. Anderson',
    school: 'University of Cambridge',
    department: 'Machine Learning',
    overallRating: 4.9,
    personalityRating: 4.7,
    academicRating: 5.0,
    internshipRating: 4.8,
    reviewCount: 35,
    reviews: []
  },
  {
    id: '10',
    name: '赵教授',
    school: '浙江大学',
    department: '控制科学与工程学院',
    overallRating: 4.4,
    personalityRating: 4.2,
    academicRating: 4.7,
    internshipRating: 4.1,
    reviewCount: 19,
    reviews: []
  },
  {
    id: '11',
    name: 'Dr. Garcia',
    school: 'University of California, Berkeley',
    department: 'Electrical Engineering',
    overallRating: 4.5,
    personalityRating: 4.3,
    academicRating: 4.8,
    internshipRating: 4.2,
    reviewCount: 24,
    reviews: []
  },
  {
    id: '12',
    name: '孙教授',
    school: '华中科技大学',
    department: '光学与电子信息学院',
    overallRating: 4.2,
    personalityRating: 3.9,
    academicRating: 4.5,
    internshipRating: 4.0,
    reviewCount: 14,
    reviews: []
  },
  {
    id: '13',
    name: 'Prof. Miller',
    school: 'Carnegie Mellon University',
    department: 'Robotics Institute',
    overallRating: 4.6,
    personalityRating: 4.4,
    academicRating: 4.9,
    internshipRating: 4.3,
    reviewCount: 31,
    reviews: []
  },
  {
    id: '14',
    name: '吴教授',
    school: '南京大学',
    department: '物理学院',
    overallRating: 4.3,
    personalityRating: 4.0,
    academicRating: 4.6,
    internshipRating: 4.1,
    reviewCount: 17,
    reviews: []
  },
  {
    id: '15',
    name: 'Dr. Brown',
    school: 'University of Oxford',
    department: 'Computer Science',
    overallRating: 4.8,
    personalityRating: 4.6,
    academicRating: 5.0,
    internshipRating: 4.7,
    reviewCount: 29,
    reviews: []
  },
  {
    id: '16',
    name: '周教授',
    school: '西安交通大学',
    department: '电气工程学院',
    overallRating: 4.1,
    personalityRating: 3.8,
    academicRating: 4.4,
    internshipRating: 3.9,
    reviewCount: 11,
    reviews: []
  },
  {
    id: '17',
    name: 'Prof. Lee',
    school: 'Seoul National University',
    department: 'Mechanical Engineering',
    overallRating: 4.4,
    personalityRating: 4.2,
    academicRating: 4.7,
    internshipRating: 4.1,
    reviewCount: 22,
    reviews: []
  },
  {
    id: '18',
    name: '马教授',
    school: '中南大学',
    department: '材料科学与工程学院',
    overallRating: 4.0,
    personalityRating: 3.7,
    academicRating: 4.3,
    internshipRating: 3.8,
    reviewCount: 8,
    reviews: []
  }
];

// Mock评价数据
export const mockReviews: Review[] = [
  {
    id: '1',
    tutorId: '1',
    userId: '1',
    userEmail: 'student1@edu.university.edu',
    overallRating: 5,
    personalityRating: 4,
    academicRating: 5,
    internshipRating: 4,
    content: '张教授非常专业，学术水平很高，对学生很有耐心。推荐！',
    timestamp: Date.now() - 86400000,
    likes: 5,
    dislikes: 0,
    score: 5,
    cost: 2
  },
  {
    id: '2',
    tutorId: '1',
    userId: '2',
    userEmail: 'student2@edu.university.edu',
    overallRating: 4,
    personalityRating: 4,
    academicRating: 4,
    internshipRating: 4,
    content: '导师很好，但是有时候比较忙，回复会慢一些。',
    timestamp: Date.now() - 172800000,
    likes: 3,
    dislikes: 1,
    score: 2,
    cost: 2
  },
  {
    id: '3',
    tutorId: '2',
    userId: '1',
    userEmail: 'student1@edu.university.edu',
    overallRating: 4,
    personalityRating: 4,
    academicRating: 5,
    internshipRating: 4,
    content: '李教授学术能力强，但性格比较严格，适合自律的学生。',
    timestamp: Date.now() - 259200000,
    likes: 4,
    dislikes: 0,
    score: 4,
    cost: 2
  }
];

// 将评价分配给对应的导师
mockTutors.forEach(tutor => {
  tutor.reviews = mockReviews.filter(review => review.tutorId === tutor.id);
});
