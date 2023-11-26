import { currentTerm , create } from "./application/application"
import { term, levels, subjects } from "./admin/admin"

export const api = {
  application: {
    currentTerm,
    create
  },
  admin: {
    term,
    subjects,
    levels,
  },
}
