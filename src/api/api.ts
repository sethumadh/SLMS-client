import { currentTerm } from "./application/application"
import { term, levels } from "./admin/admin"

export const api = {
  application: {
    currentTerm,
  },
  admin: {
    term,
    levels,
  },
}
