import { currentTerm, create, publishedTerm } from "./application/application"
import { term, levels, subjects, students, groups } from "./admin/admin"
import { enrollment } from "./admin/enrollment"

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
    students,
  },
  enrollment: {
    enrollment,
  },
}
