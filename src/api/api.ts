import { currentTerm } from "./application/application"
import { term } from "./admin/admin"

export const api = {
  application: {
    currentTerm,
  },
  admin: {
    term,
  },
}
