# Contributing


**Working on your first Pull Request?** You can learn how from this _free_ series
[How to Contribute to an Open Source Project on GitHub][egghead]

# Setting Up

## Things you need

The Poverty Stoplight project has multiple repositories that are interelated. This is the Webapp Frontend Repo, and it needs a running backend to be functional and testable. You can check the [FP-PSP-Server](https://github.com/funda...) repository and its [Setup Guide](https://github.com/funda...) to get the backend up and running on your machine.

### Using our development backend
If you do not want to run your own backend and just want to do the fun frontend work, you can use our dev backend hosted on Heroku at this [link](https://povstop-backend-dev.herokuapp.com/) :)

Just note that this runs our current `master` branch and and the data mimics the demo.povertystoplight.org server. However, this means that it might not have all the endpoints that are in development branches at the moment.


## Setting up your Frontend Dev environment

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

# With our Heroku hosted dev server
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



----

Thanks for being willing to contribute!


**Working on your first Pull Request?** You can learn how from this _free_ series
[How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1. Fork and clone the repo
2. `$ mvn install` to install dependencies
3. `$ mvn test` to make sure everything is working fine
4. Create a branch for your PR

> ```
> git remote add upstream https://github.com/FundacionParaguaya/FP-PSP-SERVER
> git fetch upstream
> git checkout -b my_pr_branch
> ```

## Committing and Pushing changes

Please make sure to run the tests before you commit your changes. You can run
`mvn test` which will run the tests and will also run the maven code analyzers plugins:

* [PMD](https://pmd.github.io/), checks some common potential source of bugs and good practices
* [CheckStyle](http://checkstyle.sourceforge.net/), checks code style conventions
* [FindBugs](http://findbugs.sourceforge.net/), also checks some common potential source of bugs

If any of those plugins throws any errors you will have to fix them manually and push those fixes to your PR branch.

## Coding Conventions

* Line length no longer than 120 chars
* 4 spaces tabs
* No empty line at the end of files

We use checkstyle to include standard Java coding conventions

> Checkstyle configuration checks the sun coding conventions from:
>
> * the Java Language Specification at
>   http://java.sun.com/docs/books/jls/second_edition/html/index.html
> * the Sun Code Conventions at http://java.sun.com/docs/codeconv/
> * the Javadoc guidelines at
>   http://java.sun.com/j2se/javadoc/writingdoccomments/index.html
> * the JDK Api documentation http://java.sun.com/j2se/docs/api/index.html

We highly advice to configure a checkstyle plugin in your IDE and use the `checkstyle.xml` file we provide with the project.

For Eclipse users you can check how to configure the formatter [here](docs/IDE.md).

## Some good practices we try to follow

We try to follow some good practices listed in this section.

Overall, we invite contributors to read the existing code and follow the conventions that are already in place :).

* No more than 4 parameters in the Services public constructors. Create new services if needed
* No more than 4 parameters in public methods. Create new DTOs if needed, to use them as parameters
* No more than 15 lines per method
* No more than one if statement per method
* Avoid switch statements if possible, use Java 8 lambdas instead. You can check [this blog post](http://marcels-javanotes.blogspot.com/2016/09/replace-switch-statements-using-lamda.html) for some inspiration.
* No nested loops if possible
* Use [Builder pattern](https://github.com/HugoMatilla/Effective-JAVA-Summary#2-use-builders-when-faced-with-many-constructors) when faced with classes that require more than one non-empty constructor. Usually this is the case for DTOs used in automated tests
* [Enums instead of int constants](https://github.com/HugoMatilla/Effective-JAVA-Summary#6-enums-and-annotations)
* Use static final properties for String constants, don't hardcode them in methods
* If a POJO does not need getters, don't create them. [Minimize mutability](https://github.com/HugoMatilla/Effective-JAVA-Summary#15-minimize-mutability)
* Don't modify method parameters, create instead new objects and return them. Again, _minimize mutability everywhere_
* Return early from methods as soon as some condition for the execution of the method is not met.
* Don't return `null` values, prefer empty default objects or Java 8 Optionals. For lists return `Collections.empty()`
* If you need a helper method or class search an existing either in [Apache Commons Lang](https://commons.apache.org/proper/commons-lang/javadocs/api-release/index.html) or in [Google Guava](https://github.com/google/guava)

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
