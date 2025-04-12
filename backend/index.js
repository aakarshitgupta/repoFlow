const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { pushRepo } = require("./controllers/push");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
  .command("init", "Initialise a new repo", {}, initRepo)
  .command("add <file>", "Add a file to the staging area", (yargs)=>{yargs.positional("file",{
    describe: "File that'll be added to staging area",
    type:"string"
  })}, (argv)=>{
    addRepo(argv.file);
  })
  .command("commit <message>", "Committing the changes", (yargs)=>{yargs.positional("message",{
    describe: "Committing the changes from the staging area",
    type:"string"
  })},(argv)=>{
    commitRepo(argv.message);
  })
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command("revert <commitID>", "Revert to a commit by id", (yargs)=>{yargs.positional("commitID",{
    describe: "Revert changes to a specific commit",
    type:"string"
  })}, revertRepo)
  .demandCommand(1, "you need atleast one command")
  .help().argv;
