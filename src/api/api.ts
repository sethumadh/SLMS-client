import { currentTerm , create } from "./application/application"
import { term, levels, subjects , students,
  enrollment} from "./admin/admin"

export const api = {
  application: {
    currentTerm,
    create
  },
  admin: {
    term,
    subjects,
    levels,
    students,
    enrollment

  },
}
