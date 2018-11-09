# Contributing


**Working on your first Pull Request?** You can learn how from this _free_ series
[How to Contribute to an Open Source Project on GitHub][egghead]

# Setting Up

## Things you need

The Poverty Stoplight project has multiple repositories that are interrelated. This is the Webapp Frontend Repo, and it needs a running backend to be functional and testable. You can check the [FP-PSP-Server](https://github.com/FundacionParaguaya/FP-PSP-SERVER.) repository and its [Setup Guide](https://github.com/FundacionParaguaya/FP-PSP-SERVER/blob/master/docs/RUN.md) to get the backend up and running on your machine.

### Using our development backend
If you do not want to run your own backend and just want to do the fun frontend work, you can use our demo server as your dev backend [link](https://povstop-backend-dev.herokuapp.com/) :)

Just note that this runs our current `master` branch and and the data mimics the demo.povertystoplight.org server. However, this means that it might not have all the endpoints that are in development branches at the moment.


## Quick Setup

Here is how to quickly get started. the [README](README.md) has more detailed setup instructions

1. Clone the Repo
```
# HTTPS
  git clone https://github.com/FundacionParaguaya/fp-psp-frontend.git
# SSH
  git clone git@github.com:FundacionParaguaya/fp-psp-frontend.git
```
2. cd into the repo and install the npm dependencies
```
cd fp-psp-frontend
npm install
```
3. Make sure you have `gulp` installed globally
```
# you might need sudo to get this to work
npm install -g gulp
```
4. Start the server
```
# With your local dev server
npm start

# With our demo dev server
npm run start:DEV-DEMO
```


# The Contribution Process

It is really important for us that the core team and the community are aligned in the development process. Here is a short overview of the contribution process which will help the community help us in developing the app.

Since we are rebuilding the application, we are still in the stage of setting the foundation of the app. This means that at this point in time, the core team will be defining the issues that the community should work on. We believe that this will also give the community a good onboarding process to our application.

The core team will try to keep issues independent and self contained so that the community can treat/work on each individual issue without concern of it affecting others or other parts of the system. This also gives you the freedom to work on what you want without being too concerned about possible side effects.

This may however not be always possible as some things are just too interdependent. If this is the case, we will inform you about it in the issue itself.

1. We welcome contributions for issues with the `up for grabs` labels. Issues labeld as `good first issue` are those that have minimal context and are well suited for new contributors to get started on the project.

An example of such an issue is Issue #1

2. Fork the repo

3. To ensure consistency and that the dev team has an overview of what the community is working on, if you want to work on an issue please create a new branch with the following format


```
#for enhancement
new branch feature/issue-<#>

# for bug
new branch bug/issue-<#>
```

For example, in the case of issue one above, i will create the following branch:

```
new branch feature/issue-1
```

4. Push to your fork. Write a [good commit message][commit].

  [commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html


5. Submit a Pull Request. The pull request should explain what you did. Please make your pull requests **assuming that it will be merged to master**. This means that we **require** that you create tests for your code.

Others will give constructive feedback.
This is a time for discussion and improvements,
and making the necessary changes will be required before we can
merge the contribution.

## Code of Conduct
We love contributions from everyone.
By participating in this project,
you agree to abide by the Contributor Covenant [code of conduct].

  [code of conduct]: https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

We expect everyone to follow the code of conduct
anywhere in Fundacion Paraguaya's project codebases,
issue trackers, chatrooms, and mailing lists.


**DO MAKE SURE ALL THE TESTS PASS BEFORE YOU MAKE A PR**

*Also, please do not create pull requests that are unreasonably large (huge amount of commits) as we will not merge them (due to the risk of it breaking something).*

# Resources

Here are some resources to get started with Developemnt
