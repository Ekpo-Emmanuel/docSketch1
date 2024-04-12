import React from 'react'

export default function Set1() {
  return (
    <section className="overflow-hidden">
        <div className="items-center w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
            <div className="pt-12 mx-auto mt-24 text-left border-t border-black/70">
                <div>
                    <div className="grid grid-cols-1 text-sm gap-x-2 gap-y-14 md:gap-12 md:grid-cols-3">
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
                            <div>
                            <p className="mt-6 text-lg font-medium leading-6 tracking-tighter text-black lg:text-2xl">
                                A simple Markdown-compatible editor for you
                            </p>
                            </div>
                            <div className="mt-2  text-[16px] text-neutral-500">
                            Make it easy to write docs in plain language but still keep them
                            close to code.
                            </div>
                        </div>
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
                            <div>
                            <p className="mt-6 text-lg font-medium leading-6 tracking-tighter text-black lg:text-2xl">
                                Get notified when code changes impact documentation
                            </p>
                            </div>
                            <div className="mt-2 text-base lg:text-lg text-neutral-500">
                            Keep documentation relevant and up-to-date. Get notified when code
                            linked to docs is changed.
                            </div>
                        </div>
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
                            <div>
                            <p className="mt-6 text-lg font-medium leading-6 tracking-tighter text-black lg:text-2xl">
                                Combine docs from multiple repositories and sources
                            </p>
                            </div>
                            <div className="mt-2 text-base lg:text-lg text-neutral-500">
                            Document features that span multiple services, improve onboarding
                            for new developers, and incorporate relevant information.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-12 mx-auto text-left ">
                <div>
                    <div className="grid grid-cols-1 text-sm gap-x-2 gap-y-14 md:gap-12 md:grid-cols-3">
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
                            <div>
                            <p className="mt-6 text-lg font-medium leading-6 tracking-tighter text-black lg:text-2xl">
                                A simple Markdown-compatible editor for you
                            </p>
                            </div>
                            <div className="mt-2  text-[16px] text-neutral-500">
                            Make it easy to write docs in plain language but still keep them
                            close to code.
                            </div>
                        </div>
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
                            <div>
                            <p className="mt-6 text-lg font-medium leading-6 tracking-tighter text-black lg:text-2xl">
                                Get notified when code changes impact documentation
                            </p>
                            </div>
                            <div className="mt-2 text-base lg:text-lg text-neutral-500">
                            Keep documentation relevant and up-to-date. Get notified when code
                            linked to docs is changed.
                            </div>
                        </div>
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
                            <div>
                            <p className="mt-6 text-lg font-medium leading-6 tracking-tighter text-black lg:text-2xl">
                                Combine docs from multiple repositories and sources
                            </p>
                            </div>
                            <div className="mt-2 text-base lg:text-lg text-neutral-500">
                            Document features that span multiple services, improve onboarding
                            for new developers, and incorporate relevant information.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>

  )
}
