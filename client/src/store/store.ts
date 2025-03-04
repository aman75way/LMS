import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import enrollmentReducer from "./slices/enrollmentSlice";
import lectureReducer from "./slices/lectureSlice";
import progressReducer from "./slices/progressSlice";
import purchaseReducer from "./slices/purchaseSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    enrollments: enrollmentReducer,
    lectures: lectureReducer,
    progress: progressReducer,
    purchase : purchaseReducer  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
