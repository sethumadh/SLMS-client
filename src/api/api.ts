import { currentTerm, create, publishedTerm } from "./application/application"
import { term, levels, subjects, groups, classes } from "./admin/admin"
import { applicantEnrollment } from "./admin/enrollment"
import { enrolledStudent } from "./admin/student"
import { timetable } from "./admin/timetable"

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
    classes,
  },
  enrollment: {
    applicantEnrollment,
  },
  students: {
    enrolledStudent,
  },
  timetable: {
    timetable,
  },
}
