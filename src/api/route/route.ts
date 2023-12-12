const baseURL = import.meta.env.VITE_BASE_URL
export const route = {
  application: {
    getCurrentTerm: `${baseURL}/api/v1/application/find-current-term`,
    getPublishedTerm: `${baseURL}/api/v1/application/find-published-term`,
    createApplicant: `${baseURL}/api/v1/application/create-applicant`,
  },
  admin: {
    changeCurrentTermName: `${baseURL}/api/v1/admin/administration/update/term-name`,
    extendCurrentTerm: `${baseURL}/api/v1/admin/administration/update/extend-term`,
    makeCurrentTerm: `${baseURL}/api/v1/admin/administration/update/make-current-term`,
    makePublishTerm: `${baseURL}/api/v1/admin/administration/update/make-publish-term`,
    createTermWithSubjectsSetup: `${baseURL}/api/v1/admin/administration/create-new-term-setup`,
    findAllTerms: `${baseURL}/api/v1/admin/administration/find-all-terms`,
    findUniqueTerm: `${baseURL}/api/v1/admin/administration/find/term-detail`,
    deleteTerm: `${baseURL}/api/v1/admin/administration/delete-term`,
    groups: {
      findAllGroups: `${baseURL}/api/v1/admin/administration/get-all-groups`,
    },
    subject: {
      findAllSubjects: `${baseURL}/api/v1/admin/administration/get-all-subjects`,
    },
    level: {
      findAllLevels: `${baseURL}/api/v1/admin/administration/get-all-levels`,
    },
    class: {
      findCurrentTermForManageClass: `${baseURL}/api/v1/admin/administration/class/find-current-term-manage-class`,
      findPublishTermForManageClass: `${baseURL}/api/v1/admin/administration/class/find-publish-term-manage-class`,
      findSectionsForManageClass: `${baseURL}/api/v1/admin/administration/class/find-sections-manage-class`,
      createClass: `${baseURL}/api/v1/admin/administration/class/create-class`,
    },
  },
  enrollment: {
    getAllApplicants: `${baseURL}/api/v1/admin/applicant/get-all-applicants`,
    searchApplicants: `${baseURL}/api/v1/admin/applicant/search-applicants`,
    findApplicantById: `${baseURL}/api/v1/admin/applicant/applicant-detail`,
    findTermToEnroll: `${baseURL}/api/v1/admin/applicant/term-to-enroll`,
    enrollApplicant: `${baseURL}/api/v1/admin/applicant/enroll-applicant`,
    findApplicantEnrolledSubjects: `${baseURL}/api/v1/admin/applicant/find-enrolled-subjects-applicant`,
    enrollApplicantToStudent: `${baseURL}/api/v1/admin/applicant/enroll-applicant-to-student`,
  },
  students: {
    getAllEnrolledStudents: `${baseURL}/api/v1/admin/student/get-all-enrolled-students`,
    searchEnrolledStudents: `${baseURL}/api/v1/admin/student/search-enrolled-students`,
    findEnrolledStudentById: `${baseURL}/api/v1/admin/student/enrolled-student-detail`,
    findTermToEnrollEnrolledStudent: `${baseURL}/api/v1/admin/student/term-to-enroll-student-enrolled`,
    findEnrolledStudentEnrolledSubjects: `${baseURL}/api/v1/admin/student/find-enrolled-subjects-for-enrolled-student`,
    enrollEnrolledStudent: `${baseURL}/api/v1/admin/student/enroll-enrolled-student`,
  },
}
