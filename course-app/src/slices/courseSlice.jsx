// src/slices/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch courses from an API
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch('http://localhost:3000/courses');
  return response.json();
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    comments: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      state.courses[index] = action.payload;
    },
    addComment: (state, action) => {
      const { courseId, comment } = action.payload;
      if (!state.comments[courseId]) state.comments[courseId] = [];
      state.comments[courseId].push(comment);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addCourse, deleteCourse, updateCourse, addComment } = courseSlice.actions;

export default courseSlice.reducer;
