import { useEffect, useState } from "react"
// import axios from "axios"

// create a new term
const actionPanels = [
  {
    id: 1,
    title: "Manage Terms",
    href: "#",
    buttonLabel: 'Manage Terms',
    description: "Create a new term with subject and level details or manage and update term information",
  },
  {
    id: 2,
    title: "Manage Subjects",
    href: "#",
    buttonLabel: 'Manage Subjects',
    description: "Manage subjects and level details and fee details in the current term",
  },
  {
    id: 3,
    title: "Manage Teacher Information",
    href: "#",
    buttonLabel: 'Manage Teacher info',
    description: "Create a new teacher inforation or manage an existing teacher",
  },
  {
    id: 4,
    title: "Manage Levels",
    href: "#",
    buttonLabel: 'Manage levels',
    description: "Create a new Level inforation or manage an existing level",
  },
  {
    id: 4,
    title: "Manage Fee",
    href: "#",
    buttonLabel: 'Manage Fee',
    description: "Create a new Fee inforation or manage an existing fee",
  },
  // More actionPanels...
]
function Administration() {
  const [isMounted, setIsMounted] = useState(false)
  const controller = new AbortController()
  useEffect(() => {
    setIsMounted(true)
    const fetchStudents = async () => {
      if (isMounted) {
        console.log(isMounted)
      }
    }
    fetchStudents()
    return () => {
      setIsMounted(false)
      controller.abort()
    }
  }, [isMounted])
  return (
    <div className="max-w-7xl mx-auto mt-2 h-screen">
      <div className="bg-white container">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Administration
            </h2>
            <p className="mt-2 text-sm sm:text-lg sm:leading-8 text-gray-600">
              Manage and create terms , subjects, levels and teacher information
            </p>
          </div>
          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {actionPanels.map((actionPanel) => (
              <article
                key={actionPanel.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      {actionPanel.title}
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>
                        {actionPanel.description}
                      </p>
                    </div>
                    <div className="mt-5">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                       {actionPanel.buttonLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Administration
