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
    level: {
      findAllLevels: `${baseURL}/api/v1/admin/administration/get-all-levels`,
    },
  },
}
// /get-all-levels
