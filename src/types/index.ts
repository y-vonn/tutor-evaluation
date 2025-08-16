// 用户类型
export interface User {
  id: string;
  email: string;
  tokens: number;
  browsingHistory: string[];
  reviews: Review[];
}

// 导师类型
export interface Tutor {
  id: string;
  name: string;
  school: string;
  department: string;
  overallRating: number;
  personalityRating: number;
  academicRating: number;
  internshipRating: number;
  reviewCount: number;
  reviews: Review[];
}

// 评价类型
export interface Review {
  id: string;
  tutorId: string;
  userId: string;
  userEmail: string;
  overallRating: number;
  personalityRating: number;
  academicRating: number;
  internshipRating: number;
  content: string;
  timestamp: number;
  likes: number;
  dislikes: number;
  score: number;
  cost: number;
}

// 应用状态类型
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  tutors: Tutor[];
  selectedTutor: Tutor | null;
  searchResults: Tutor[];
  loading: boolean;
}

// 搜索过滤器类型
export interface SearchFilters {
  name?: string;
  school?: string;
  department?: string;
}

// 评价表单类型
export interface ReviewForm {
  overallRating: number;
  personalityRating: number;
  academicRating: number;
  internshipRating: number;
  content: string;
}
