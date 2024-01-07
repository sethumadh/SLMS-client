import { create, publishedTerm, allSubjects ,createTeacher} from "./application/application"
import { term, levels, subjects, groups, classes } from "./admin/admin"
import { applicantEnrollment } from "./admin/enrollment"
import { enrolledStudent } from "./admin/enrolledStudent"
import { activeStudent } from "./admin/activeStudent"
import { timetable } from "./admin/timetable"
import { lateEnrolledStudent } from "./admin/lateEnrolledStudent"

export const api = {
  application: {
    create,
    publishedTerm,
    teacher: { allSubjects },
    createTeacher
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
    activeStudent,
    lateEnrolledStudent,
  },
  timetable: {
    timetable,
  },
}
