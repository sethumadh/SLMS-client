import { Link } from "react-router-dom"
// import axios from "axios"

// create a new term
const actionPanels = [
  {
    id: 1,
    title: "Manage Terms",
    href: "manage-term",
    buttonLabel: "Manage Terms",
    description:
      "Create a new term with subject and level details or manage and update term information",
  },
  {
    id: 2,
    title: "Manage Subjects",
    href: "#",
    buttonLabel: "Manage Subjects",
    description:
      "Manage subjects and level details and fee details in the current term",
  },
  {
    id: 3,
    title: "Manage Teacher Information",
    href: "#",
    buttonLabel: "Manage Teacher info",
    description:
      "Create a new teacher inforation or manage an existing teacher",
  },
  {
    id: 4,
    title: "Manage Levels",
    href: "#",
    buttonLabel: "Manage levels",
    description: "Create a new Level inforation or manage an existing level",
  },
  {
    id: 5,
    title: "Manage Fee",
    href: "#",
    buttonLabel: "Manage Fee",
    description: "Create a new Fee inforation or manage an existing fee",
  },
  // More actionPanels...
]
function Administration() {
  return (
    <div className="mt-2">
      <div className="bg-white">
        <div className="">
          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6  border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
                      <p>{actionPanel.description}</p>
                    </div>
                    <div className="mt-5">
                      <Link
                        to={actionPanel.href}
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        {actionPanel.buttonLabel}
                      </Link>
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
