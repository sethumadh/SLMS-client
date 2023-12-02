 <div className="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Subjects Details
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex-grow">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {!isLoading ? (
                        currentTerm?.termSubjectGroup.map((term, i) => (
                          <div
                            key={i}
                            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="focus:outline-none ">
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <div className="flex gap-1">
                                  <p className="text-sm  text-gray-900 w-1/3">
                                    Name
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 w-full">
                                    {term.termSubject.subject.name &&
                                      capitalizeFirstCharacter(
                                        term.subject.name
                                      )}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  <p className="text-sm  text-gray-900 w-1/3">
                                    Fee
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 w-full">
                                    {term.fee.amount}
                                  </p>
                                </div>

                                <div className="flex gap-1">
                                  <p className="text-sm text-gray-900 w-1/3">
                                    Fee Interval
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 w-full">
                                    {capitalizeFirstCharacter(
                                      term.fee.paymentType.toLowerCase()
                                    )}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  <p className="text-sm text-gray-900 w-1/3">
                                    Levels
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 w-full">
                                    {term.level
                                      .map((l) =>
                                        capitalizeFirstCharacter(l.name)
                                      )
                                      .join(", ")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          {/* {currentTerm?.termSubject.length > 0 ?"":""} */}
                          <div>There are no subjects to show</div>
                        </>
                      )}
                    </div>
                  </div>
                </dd>
              </div>