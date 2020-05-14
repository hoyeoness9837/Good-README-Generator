const { prompt } = require('inquirer');
const axios = require('axios');
const { writeFile } = require('fs');
const { promisify } = require('util');
const writeToFile = promisify(writeFile);

prompt([
  { type: 'input', name: 'username', message: 'Type in your Github username' },
  { type: 'input', name: 'title', message: 'Type in your title of this app' },
  { type: 'input', name: 'description', message: 'Type in your description' },
  {
    type: 'input',
    name: 'tableOfContent',
    message: 'Type in your table of content',
  },
  { type: 'input', name: 'installation', message: 'Type in your installation' },
  { type: 'input', name: 'usage', message: 'Type in your usage' },
  {
    type: 'input',
    name: 'contributors',
    message: 'Type in your contributors for this app',
  },
  { type: 'input', name: 'tests', message: 'Type in your tests for this app' },
  {
    type: 'input',
    name: 'question',
    message: 'Type in your question for this app',
  },
])
  .then((data) => {
    axios
      .get(`http://api.github.com/users/${data.username}`)
      .then((githubinfo) => {
        writeToFile(
          'README.md',
          `# App title: ${data.title}
## Table of concents
*${data.tableOfContent}
## How to install
*${data.installation}
## App usage
*${data.usage}
## Licenses
*${data.licence}
## Contributors
*${data.contributors}
## Tests to be run on app
*${data.tests}
## Questions
*${data.question}
![Profile Picture](${githubinfo.data.avatar_url})
##Email: ${githubinfo.data.email}
`
        );
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
