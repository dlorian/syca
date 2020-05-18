# SYCA - Save Your Cycling Activities

[ ![Codeship Status for dlorian/SYCA](https://www.codeship.io/projects/b624cdc0-f2fc-0131-e5b7-4a729fc31f8d/status)](https://www.codeship.io/projects/27774)


- Run Mongo DB with command mongod
  - to manage mongo db run command mongo in terminal
    to get the mongo prompt
- Node Server stars with node --debug app.js at root dir
  - use debug param for enabling debugging with node inspector
- Run Grunt with grunt watchdev to enalbe watch changed files and concatenation an minification of js files
- Run Node Inspector with node-inspector --web-port=8090. Needs debug parameter when node is executerd
- Run Mocha test with make test at root dir
  - runs all tests in test dir
  - options for make in the makefile
