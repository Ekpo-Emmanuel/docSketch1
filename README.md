  ## Docsketch.io
  <p align="left">
    Docsketch is an all-in-one AI document editor and collaborative canvas designed for students and teams. It offers diagramming tools, integrations with popular platforms, AI note-taking features, and supports team collaboration with real-time comments and annotations.
    <br/>
  </p>

<!-- ![Downloads](https://img.shields.io/github/downloads/Ekpo-Emmanuel/Cloud-File-Share/total) ![Contributors](https://img.shields.io/github/contributors/Ekpo-Emmanuel/Cloud-File-Share?color=dark-green) ![Issues](https://img.shields.io/github/issues/Ekpo-Emmanuel/Cloud-File-Share) ![License](https://img.shields.io/github/license/Ekpo-Emmanuel/Cloud-File-Share)  -->

## Table Of Contents

* [About the Project](#about-the-project)
* [Key Featues](#key-features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)


## About The Project

![Screen Shot](public/images/screenshots/scr1.png)

## Technologies Used

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* Next.js - Typescript
* Tailwind CSS
* Shadcn UI, Flowbite, Aceternity UI, Magic UI
* Convex

## Key features

1. **Diagramming Tools**: A variety of shapes and connectors for creating detailed diagrams.

2. **Integrations**: Connects with platforms like LMS, WhatsApp, Slack, and more for seamless workflow.

3. **Prioritizing Features**: Set and manage priorities for projects to focus on what’s important.

4. **AI Note Taker**: Advanced text formatting with features like headings, lists, and quotes.

5. **Team Projects**: Real-time collaboration on projects with simultaneous work by team members.

6. **Comments and Annotations**: Directly add comments and annotations to documents for easy feedback and discussion.

7. **Automation Builder**: Tools for creating automated workflows and processes.

8. **Collaborative Canvas**: An interactive space for document creation and team collaboration.

## Getting Started

### Prerequisites

1. **Node JS**

### Installation

1. API Keys
* Kinde Auth API Key at [kinde.com](kinde.com), 
* Convex Dev API Key at [https://www.convex.dev/](https://www.convex.dev/)

2. Clone the repo

```sh
git clone https://github.com/Ekpo-Emmanuel/docSketch1
```

3. Run the development server:

```sh
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Create an `.env.local` file in the root of the project
```JS
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL= 
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```
5. open the terminal and run `npx convex dev`. follow the steps. It will add some .env keys to your `.env.local` file
```
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=
```

6. Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/Ekpo-Emmanuel/Cloud-File-Share/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Author

* **Emmanuel Ekpo** 
