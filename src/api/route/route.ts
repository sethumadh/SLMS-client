const baseURL = import.meta.env.VITE_BASE_URL
export const route = {
  application: {
    getCurrentTerm: `${baseURL}/api/v1/application/find-current-term`,
  },
  admin: {
    changeCurrentTermName: `${baseURL}/api/v1/admin/administration/update/term-name`,
    extendCurrentTerm: `${baseURL}/api/v1/admin/administration/update/extend-term`,
    makeCurrentTerm: `${baseURL}/api/v1/admin/administration/update/make-current-term`,
    createTermWithSubjectsSetup: `${baseURL}/api/v1/admin/administration/create-new-term-setup`,
    findAllTerms: `${baseURL}/api/v1/admin/administration/find-all-terms`,
    findUniqueTerm: `${baseURL}/api/v1/admin/administration/find/term-detail`,
    deleteTerm: `${baseURL}/api/v1/admin/administration/delete-term`,
    // /find-all-terms
    subject: {
      findAllSubjects: `${baseURL}/api/v1/admin/administration/get-all-subjects`,
    },
    level: {
      findAllLevels: `${baseURL}/api/v1/admin/administration/get-all-levels`,
    },
    applicant: {
      createApplicant: `${baseURL}/api/v1/application/create-applicant`,
    },
    student: {
      getAllStudents: `${baseURL}/api/v1/admin/administration/get-all-students`,
    },
    enrollment: {
      getAllApplicants: `${baseURL}/api/v1/admin/applicant/get-all-applicants`,
      searchApplicants: `${baseURL}/api/v1/admin/applicant/search-applicants`,
    },
  },
}
// /get-all-levels
