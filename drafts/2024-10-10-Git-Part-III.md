---

layout: post
title:  "Git Part III - Basic Git commands"
date:   2024-10-10 
categories: jekyll update
excerpt: "In this post, we will continue to learn about git and GitHub. We will learn about branching and merging, pull requests, and how to work with remote repositories."
image: /assets/images/github-logo.png
author: Your Name
author_github: https://github.com/yourusername


---
### Initialize a new git repository

To start tracking your project with git, you need to initialize a git repository. This creates a hidden .git folder

- command:
    - `git init`

- example:
    - `mkdir my-project` 
    - `cd my-project`
    - `git init`



### Clone an existing repository

If you want to work on a project that already exists in GitHub, you need to clone it to your local machine 

- Command:
    - `git clone "repository url"`



### Check status of your files

It is important to check the status of your files once you start making changes to your projects 
This command tells you which files have been modified

- Command:
    - `git status`



### Add changes to staging file

Before committing changes, you need to send them to the staging area

- Command:
    - `git add <filename>`



### Commit Changes

Once changes or staged, you'll need to commit them

- command:
    - `git commit -m "commit message"`


### View command history

Can view the history of all commits made in a repo, including commit messages, author and timestamps

- command:
    - `git log`



### Push changes to a remote repo

If you have a remote repo, like on GitHub, you need to push your commits to that repo so that people can actually see your changes 

- command:
    - `git push origin "branch name"`

[`git push origin main`] -> Pushes the changes from your local repository to the "main" branch of the remote repo



### Pull changes from a remote repo

If someone else made a change to a remote repo, you can pull those changes to update your local repo

- command:
    - `git pull origin "branch-name"`



### Create a new branch

Branches allow you to work on seperate features, bug fixes or experiments without affecting the main codebase

- Command:
    - `git branch <branch-name>`



### Switch between branches

After creating a branch, you can switch to it to start working on it  

Command:
    - `git checkout "branch-name"`



### Merge branches

Once you're done with a branch, you can merge it back in to the main branch or any other branch 

- Command:
    - `git merge <branch-name>`



### Discard unchanged changes

If you've made any changes that you don't want to keep, you can just discard them

- Command:
    - `git checkout -- <filename>`



### Remove files from staging area

If you've staged a file you'd no longer like to commit, you can remove it from the stagihng area without deleting the file


- Command:
    - `git reset "filename"`


From what I can tell, these are the main ones required to manage everyday tasks in git.


___


# Step 4: Understanding Branching and merging

Branching and merging are two of the most powerful features of git..... apparently. They allow you to work on different features, bug fixes or experiments without affecting the main codebase. This will also help give a actual reasons why you'd need the above stuff.


Let's start with the basics.... What is a branch?

A branch in git represents an independant line of development. Like creating a new timeline that has no effect on the main project
- This allows you to:
    - Work on new features without disturbing the main branch
     - Collaborate on the mainbase without conflicting with other peoples work
      - Safely experiment with new ideas and roll back if necessary

each git repository starts with a default branch called "main"


Now I would tell you the command as we go, but if you don't know what code I'm explaining, it means you skipped over that part, and I do not reward bad behaviour....gave that list for a reason.......

To add an additional branch to work outside of main, the above command to add a branch will do that. 

Now that you understand why having multiple branches helps a lot with production, you should probably also switch between each branch, right? 
The code to do that is above as well ;)


Seriously now, we'll go in to branch specific features I never cover yet:

### View all branches

- Self-explainatory
    - `git branch`


### Delete a branch

- Again, self explainatory:
    - `git branch -d <branch name>`




Make changes on a branch:
    - Modify files 
    - Stage changes
    - Commit changes


___

### Step 5: Learning to use git for remote repos

Before pushing your local git project to a GitHub, you'll need to create a repository 

Steps:
    - Log in to GitHub account 
    - Click the '+' icon in the top-right corner and select new repository
    - Enter a name for your repository 
    - Can add a description if you'd like
    - add a readme to your repo
    - Click on create repository

Once you create your repository, GitHub will give you instructions or pushing or cloning your existing repository to your local machine



### Add a remote repository to your local project

If you have an existing local git that want to link it to 

Command:
    - `git remote add origin <repository url>`



### Push local changes to GitHub

Once you've added the remote repository, you can push your local changes to GitHub

command:
    - `git push -u origin <branch name>`

The "-u" makes it so that future pushes only require `git push`



### Clone a repository from GitHub

Cloning is the process of downloading a repository from GitHub to your local machine

Command:
    - `git clone <repository url>`



### Pull changes from GitHub

If other collaborators have pushed changes to the remote repository, you'll want to pull those changes to update your local repo

command:
    - `git pull origin <branch name>`



### Fork a repository on GitHub

This is a feature that allows you to copy someone elses repo to your GitHub account

Steps: 
    - Navigate to the repository that you want to fork
    - Click the fork button on the upper-right corner of the repo
    - A copy will be added to your GitHub account



### Create a pull request

A pull request is a way of proposing changes to a repo. If you're working in a branch or a fork, you can create a pull request to request that your changes be reviewed and merged into the original project.

Steps to create a pull request:
    - Push your branch with the changes to GitHub
    - Navigate to the original repo
    - Click on the pull requests tab
    - click "new pull request"
    - Select the branch that you want to merge from
    - Review the changes 

Thats about all that seemed important, we'll just go over pull requests quick, then you should be sorted

___


# Step 6: Work with pull requests

In collaborative projects, PRs are an important feature for managing contributions and ensuring quality control. They allow developers to propose changes and have them reviewed by others


Cool......What exactly is a pull request tho?

It is a way for devs to notify others about changes they've made to a repo. When opening a request, you're requesting that the changes from your branch be merged in to another branch

- Purpose:
    - Review code before merging it 
    - Allow discussion and collaboration on changes 
    - Ensure code quality by getting teammates 
    - Catch issues or conflict before integrating the code 



### Creating a pull request

Once you've made changes in a branch and pushed these changes to a remote repo, you can create a pull request 

#### Steps to create a pull request:
    - Push your branch with the changes to GitHub
    - Navigate to the original repo
    - Click on the pull requests tab
    - click "new pull request"
    - Select the branch that you want to mrge from
    - Review the changes

(Just copied and pasted incase you missed it)

That is like it. You will inevitably run in to problems and stuff, but you learn best by fixing those, and I can't list every potential issue. I don't think that's possible at all 


Anyways, hope this helped you in someway to not find git or GitHub intimidating and I'll probably go over Obsidian next

___