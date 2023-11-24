import { currentTerm } from "./application/application"
import { term, levels, subjects } from "./admin/admin"

export const api = {
  application: {
    currentTerm,
  },
  admin: {
    term,
    subjects,
    levels,
  },
}
