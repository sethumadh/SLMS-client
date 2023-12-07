import { currentTerm, create, publishedTerm } from "./application/application"
import { term, levels, subjects, groups } from "./admin/admin"
import { enrollment } from "./admin/enrollment"
import { enrolledStudents } from "./admin/student"

export const api = {
  application: {
    currentTerm,
    create,
    publishedTerm,
  },
  admin: {
    term,
    groups,
    subjects,
    levels,
  },
  enrollment: {
    enrollment,
  },
  students: {
    enrolledStudents,
  },
}
