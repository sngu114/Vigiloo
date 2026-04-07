Vigiloo - Team 4

1. Nathan Soto - nathsoto1 - Scrum Master 
2. Steven Nguyen - sngu114 - UI/UX Designer
3. Andy Tran - atran66 - Software Architect
4. Sergio Nuno Zuniga - snunoz - Senior Developer
5. Caleb Zeringue - Yeleb  - Product Tester
6. Marcus Hudson - mmarcvss - Pipeline Engineer


Description of Project:
Capstone project for CSC 4330 - Software Systems Development (Section 2) with Professor John Luke Denny. Spring 2026.

The purpose of Vigiloo is to create an easy to use cybersecurity educational platform for non-technical users. Many people are victims to online scams, phishing attacks, account takeovers, and identity theft because they do not fully understand how cyber threats operate or how to recognize the signs of potential cyberattacks. Cybersecurity resources that exists are overly techinical, overwhelming, or designed for IT professionals rather than for everday users. Our solution will be an interactive learning application that simplifies cybersecurity concepts and presents them in a clear, engaging, and practical way. The platform will feature gamified learning courses, real world scam simulation, and tools to assist users on recognizing scams. By combining education, interactive practice, and real time assistance tools, our project aims to empower users with the confidence and knowledge needed to stay safe online.


Frontend:
- Next.js 
- React
- TypeScript
- Tailwind CSS
- Next-Themes

Backend:
- Supabase
- RSS-Parser
- Groq


Platforms code is known to work on:
- macOS (Intel + Apple Silicon)
- Windows 10/11 (via PowerShell, CMD, or Git Bash)
- Linux (Ubuntu recommended)
- Google Chrome (Version 110+)
- Firefox (Version 110+)
- Safari (Version 16+)
- Microsoft Edge (Chromium-based)


Kanban board link:
https://github.com/users/sngu114/projects/1


List of dependencies and versions:

- next (16.1.6)
- react (19.2.3)
- react-dom (19.2.3)
- @supabase/supabase-js (^2.98.0)
- next-themes (^0.4.6)
- rss-parser (^3.13.0)


Prerequisites:
- Laptop or desktop at least 8GB of RAM (Recommended)
- Stable Wi-Fi connection
- IDE: Visual Studio Code (Recommended) 
- Node.js: Version 18.17.0 or Higher, verify by running node -v 
- Download link: https://nodejs.org/en
- Git: https://git-scm.com/install/
- Web Browser: Chrome, Firefox, or Edge


How to download dependencies/Commands:

Can clone project using:

git clone https://github.com/sngu114/Vigiloo.git

in the terminal.


After grabbing/cloning the project from the repo, open terminal and type

npm install

This will install all the dependencies from the package.json we have. 

For environment variables:

You would need to create a file in the root called .env.local

Copy this into it:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GROQ_API_KEY=

These are the supabase and groq API keys that you will need to access your own local version of the project. Without these, the project will likely crash or show errors. 

After everything is setup go to the terminal and run:

npm run dev

Then open a browser and enter in " http://localhost:3000 " into the url bar.


