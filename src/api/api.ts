import { currentTerm, create, publishedTerm } from "./application/application"
import {
  term,
  levels,
  subjects,
  students,
  groups,
  enrollment,
} from "./admin/admin"

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
    enrollment,
  },
}
