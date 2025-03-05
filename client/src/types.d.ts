declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// ---------------- User Interfaces ----------------

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: UpdateUser | null;
  isLoading : boolean;
}

interface UpdateUser {
  id: string;
  fullName: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  accessToken: string;
  refreshToken: string;
}

// ---------------- Course Interfaces ----------------

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  instructorId: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

// ---------------- Enrollment Interfaces ----------------

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  status: "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
}

// ---------------- Lecture Interfaces ----------------

interface Lecture {
  id: string;
  title: string;
  contentUrl: string;
  duration: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

interface LectureState {
  lectures: Lecture[];
  loading: boolean;
  error: string | null;
}

// ---------------- Progress Interfaces ----------------

interface Progress {
  id: string;
  userId: string;
  courseId: string;
  lectureId: string;
  completed: boolean;
  watchedDuration: number;
  createdAt: string;
}

interface ProgressState {
  progress: Progress[];
  loading: boolean;
  error: string | null;
}

// ---------------- Purchase Interfaces ----------------

interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  createdAt: string;
}

interface PurchaseState {
  purchases: Purchase[];
  loading: boolean;
  error: string | null;
}
