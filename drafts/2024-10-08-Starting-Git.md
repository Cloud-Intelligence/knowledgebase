---

layout: post
title:  "Starting Git"
date:   2024-10-08 
categories: tools
excerpt: "First task I got given at this new internship was to learn git, and seeing as I never knew it, I am sure that there are many other people who never used git before as well, so I will put my study journey in here. I asked ChatGPT steps to learning git. So here is me learning git by following the steps and sharing my journey with you hoping it helps as well."
image: /assets/images/github-logo.png
author: Your Name
author_github: https://github.com/yourusername

---


___

## Learning Git


First task I got given at this new internship was to learn git, and seeing as I never knew it, I am sure that there are many other people who never used git before as well, so I will put my study journey in here. I asked ChatGPT steps to learning git. So here is me learning git by following the steps and sharing my journey with you hoping it helps as well.

___

# Step 1: Understand the basics of version control


>I personally agree with learning at least the fundamentals before doing something and then once you know that, go for a 'learning on the job' approach, so let's go through understanding the fundamentals and 'lingo'


### What is version control?

Basically, it is a system that tracks changes to files over time. It allows you to record changes, revert to previous versions and collaborate with other people without overwriting another persons work. Its purpose is to ensure that every change is documented as well as easily manage different versions of your project. This makes it easier to track, review and merge changes.


### Types of Version control systems?

#### Local version control: 
> Simplest form. Changes are tracked to your local machine. This isn't suitable for collaboration and is prone to error.

#### Centralized version control: 
> All versions are stored in a central server. Users check files to make changes. This relies on a single server, and you lose everything if the server fails.

#### Distributed version control: 
> Each user has a copy of the entire project history on their local machine, making it highly resilient and ideal for collaboration.



*Now....why would we use git?*

- Git allows multiple people to work on different parts of a project simultaneously through what is known as branches. Branches can be merged back in to the main code, this allows parallel development to take place.

- Every developer has a copy of the repository.

- Git maintains a history of changes, so you can easily revert to earlier versions if needed 

- git is designed to be highly efficient, even for larger projects 



#### Important words to know:
- Repository: 
>This is where git stores all of its files, folders and history of changes. Can be local or remote 
- Commit: 
> A commit is like a snapshot of your project at a certain point in time. records changes made to your files and serves as a versioning checkpoint 
- staging area: 
> Before committing changes, you add them to the staging area. This area allows you to prepare changes that you want to include in your next commit 
- Branch: 
> A branch is a separate line of development within a repository. By default, every repository starts with a branch called main or master. You can create new branches to work on features or fixes without affecting the main code.
- Merge: 
> Merging is combining phases from different branches in to one.
- Clone: 
> Duplicating a remote repository on your local machine. This allows you to work on it offline.
- Pull: 
> The `git pull` command fetches and integrates changes from a local repository into your main branch.
- Push: 
> `git push` command uploads your local commits to a remote repository, making your changes available to others.


*See why it is important to know the fundamental stuff before actually diving in?*

Personally, just from learning these definitions I feel like I can use git with a little more confidence.

There's still more to learn here, so let's dive a little more deeper.


*Git workflow:*

1. Initialize a repository: Start a new repository with `git init` or clone one using 'git clone'
2. Make changes: Edit files and make improvements
3. Stage changes: Use `git add <file>` to move your changes to the staging area
4. Commit changes: Use `git commit -m "message"` to save changes to repo
5. Push changes: If working with a remote repo, push commits using `git push`


*Difference between GitHub and git:*
- Git: 
>Open-source vcs that you install on your machine. Tracks changes to files and helps manage project history.
 - GitHub: 
 > A cloud-based platform that hosts git repositories, making it easier to share and collaborate with others. Has features like pull requests, issue tracking, and project management 


Some resources if you feel that you would like to know more:

- Git documentation: [link](https://git-scm.com/doc)
- Pro Git Book: [link](https://git-scm.com/book/en/v2)
- GitHub guides: [link](https://docs.github.com/en)


___
