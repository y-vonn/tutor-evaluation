/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { AppState, User, Tutor, Review } from '../types';
import { mockTutors } from '../data/mockData';

// 初始状态
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  tutors: mockTutors,
  selectedTutor: null,
  searchResults: [],
  loading: false,
};

// Action类型
type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_TUTOR'; payload: Tutor | null }
  | { type: 'SET_SEARCH_RESULTS'; payload: Tutor[] }
  | { type: 'ADD_REVIEW'; payload: { tutorId: string; review: Review } }
  | { type: 'UPDATE_USER_TOKENS'; payload: number }
  | { type: 'LIKE_REVIEW'; payload: { reviewId: string; isLike: boolean } }
  | { type: 'ADD_TO_HISTORY'; payload: string }
  | { type: 'ADD_TUTOR'; payload: Tutor };

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_SELECTED_TUTOR':
      return {
        ...state,
        selectedTutor: action.payload,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
      };
    case 'ADD_REVIEW': {
      const updatedTutors = state.tutors.map(tutor =>
        tutor.id === action.payload.tutorId
          ? {
              ...tutor,
              reviews: [...tutor.reviews, action.payload.review],
              reviewCount: tutor.reviewCount + 1,
              overallRating: (tutor.overallRating * tutor.reviewCount + action.payload.review.overallRating) / (tutor.reviewCount + 1),
              personalityRating: (tutor.personalityRating * tutor.reviewCount + action.payload.review.personalityRating) / (tutor.reviewCount + 1),
              academicRating: (tutor.academicRating * tutor.reviewCount + action.payload.review.academicRating) / (tutor.reviewCount + 1),
              internshipRating: (tutor.internshipRating * tutor.reviewCount + action.payload.review.internshipRating) / (tutor.reviewCount + 1),
            }
          : tutor
      );
      return {
        ...state,
        tutors: updatedTutors,
        selectedTutor: state.selectedTutor?.id === action.payload.tutorId
          ? updatedTutors.find(t => t.id === action.payload.tutorId) || null
          : state.selectedTutor,
      };
    }
    case 'UPDATE_USER_TOKENS':
      return {
        ...state,
        user: state.user ? { ...state.user, tokens: action.payload } : null,
      };
    case 'LIKE_REVIEW': {
      const updatedTutorsWithLike = state.tutors.map(tutor => ({
        ...tutor,
        reviews: tutor.reviews.map(review =>
          review.id === action.payload.reviewId
            ? {
                ...review,
                likes: action.payload.isLike ? review.likes + 1 : review.likes,
                dislikes: !action.payload.isLike ? review.dislikes + 1 : review.dislikes,
                score: action.payload.isLike ? review.score + 1 : review.score - 1,
              }
            : review
        ),
      }));
      return {
        ...state,
        tutors: updatedTutorsWithLike,
      };
    }
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              browsingHistory: [...state.user.browsingHistory, action.payload],
            }
          : null,
      };
    case 'ADD_TUTOR':
      return {
        ...state,
        tutors: [...state.tutors, action.payload],
      };
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
