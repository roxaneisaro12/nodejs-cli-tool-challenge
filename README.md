\# StudyFlow CLI



StudyFlow is a simple command-line task management application built with Node.js. It helps students manage their tasks by adding, viewing, completing, and deleting them.



\## Features



\- Add new tasks.

\- View all tasks.

\- Mark tasks as completed.

\- Delete tasks.

\- Store tasks in a JSON file.

\- Get an inspirational quote.



\## Technologies Used



\- Node.js

\- JavaScript

\- JSON

\- Chalk

\- CLI Table 3

\- Ora



\## Installation



1\. Clone the repository:



&#x20;  ```bash

&#x20;  git clone https://github.com/roxaneisaro12/nodejs-cli-tool-challenge.git

&#x20;  ```



2\. Navigate into the project:



&#x20;  ```bash

&#x20;  cd nodejs-cli-tool-challenge

&#x20;  ```



3\. Install dependencies:



&#x20;  ```bash

&#x20;  npm install

&#x20;  ```



\## Usage



Run the application using:



```bash

npm start

```



You can also use commands directly:



```bash

node bin/studyflow.js add "Learn Node.js"

node bin/studyflow.js list

node bin/studyflow.js complete TASK\_ID

node bin/studyflow.js delete TASK\_ID

node bin/studyflow.js quote

```



Replace `TASK\_ID` with the actual ID of the task.



\## Data Storage



Tasks are stored in `data/tasks.json`. The application saves task information so that it remains available when the application is run again.



\## Author



Isaro Roxane and kersy merissa imanishimwe



