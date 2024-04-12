import React from 'react'

export default function Features() {
  const features = [
    {
      title: 'AI Powered Text Editor',
      description: 'Level up your writing: AI helps with clarity, style, and grammar.',
    }
  ]
  return (
    <>
    <section>
      <div className="px-8  mx-auto md:px-12 lg:px-32 max-w-7xl"  id='features'>
        <div>
          <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-6xl text-balance">
          Effortless Collaboration, 
            <span className="text-gray-600"> Enhanced Security</span>
          </h1>
          <p className="mt-4 text-base font-medium text-gray-500 text-balance">
          Docsketch goes beyond traditional document editing.  Here's how it empowers your collaborative process:
          </p>
          <div className="grid grid-cols-2 mt-12 gap-x-6 gap-y-12 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 text-balance">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div>
              <div
                className="text-black border-2 border-black justify-center flex h-12 items-center w-12 bg-[#5cffe4]"
                style={{
                    borderBottomLeftRadius: "15px 255px",
                    borderBottomRightRadius: "225px 15px",
                    borderTopLeftRadius: "255px 15px",
                    borderTopRightRadius: "15px 225px",
                    boxShadow: "-5px 5px #5cffe4"
                }}
              >
                <svg
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Diagramming tools</h3>
                <p className="mt-2 text-sm text-gray-500">
                Offers a variety of shapes and connectors
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div>
              <div
                            className="text-black border-2 border-black justify-center flex h-12 items-center w-12 bg-[#c58fff]"
                            style={{
                                borderBottomLeftRadius: "15px 255px",
                                borderBottomRightRadius: "225px 15px",
                                borderTopLeftRadius: "255px 15px",
                                borderTopRightRadius: "15px 225px",
                                boxShadow: "-5px 5px #c58fff"
                            }}
                            >
                            <svg
                                className="size-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                            </svg>
                            </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900"> Integrations</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Learning management systems (LMS) and cloud storage platforms
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div>
                  <div
                    className="text-black border-2 border-black justify-center flex h-12 items-center w-12 bg-[#a9ff03]"
                    style={{
                        borderBottomLeftRadius: "15px 255px",
                        borderBottomRightRadius: "225px 15px",
                        borderTopLeftRadius: "255px 15px",
                        borderTopRightRadius: "15px 225px",
                        boxShadow: "-5px 5px #a9ff03"
                    }}
                  >
                    <svg
                        className="size-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                  </div>
                </div>
                <div>
                <h3 className="font-medium text-gray-900">Prioritizing Features</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Set priorities for projects to ensure you get what you need
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div>
              <div
                className="text-black border-2 border-black justify-center flex h-12 items-center w-12 bg-[#5cffe4]"
                style={{
                    borderBottomLeftRadius: "15px 255px",
                    borderBottomRightRadius: "225px 15px",
                    borderTopLeftRadius: "255px 15px",
                    borderTopRightRadius: "15px 225px",
                    boxShadow: "-5px 5px #5cffe4"
                }}
              >
                <svg
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900"> Rich text editing</h3>
                <p className="mt-2 text-sm text-gray-500">
                Format text with features like headings, lists, and quotes and more.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div>
              <div
                            className="text-black border-2 border-black justify-center flex h-12 items-center w-12 bg-[#c58fff]"
                            style={{
                                borderBottomLeftRadius: "15px 255px",
                                borderBottomRightRadius: "225px 15px",
                                borderTopLeftRadius: "255px 15px",
                                borderTopRightRadius: "15px 225px",
                                boxShadow: "-5px 5px #c58fff"
                            }}
                            >
                            <svg
                                className="size-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                            </svg>
                            </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900"> Collaboration</h3>
                <p className="mt-2 text-sm text-gray-500">
                Enable multiple users on a document simultaneously
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div>
                  <div
                    className="text-black border-2 border-black justify-center flex h-12 items-center w-12 bg-[#a9ff03]"
                    style={{
                        borderBottomLeftRadius: "15px 255px",
                        borderBottomRightRadius: "225px 15px",
                        borderTopLeftRadius: "255px 15px",
                        borderTopRightRadius: "15px 225px",
                        boxShadow: "-5px 5px #a9ff03"
                    }}
                  >
                    <svg
                        className="size-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                  </div>
                </div>
                <div>
                <h3 className="font-medium text-gray-900">Comments and annotations</h3>
                <p className="mt-2 text-sm text-gray-500">
                Leave comments and annotations directly on the document.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>

  )
}
