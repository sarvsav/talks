# Let's explore Git and Gerrit

Learn them in a fun way

---

## About me

Aspiring Green Developer 🌲

On the web: (I would be happy to connect)

|     Website     |   Username     |
|:------------:|:------------:|
| GitHub    |  [https://github.com/sarvsav](https://github.com/sarvsav)     |
| Medium   |  [https://sarvsav.medium.com/](https://sarvsav.medium.com/)  |
| LinkedIn |  [https://in.linkedin.com/in/sarvsav](https://in.linkedin.com/in/sarvsav)      |
| X | [https://twitter.com/sarvsav](https://twitter.com/sarvsav) |

---

## What is Git?

Very simple tool for version control. Think of it like as playing a video game and you have checkpoints. You can go back to any checkpoint and start from there.

## What is Gerrit?

Gerrit is a code review tool. For collaboration and code review. Saving your game progress on the cloud.

## Jenkins and Zuul

CI CD tools, for check, gate, and delivery.

---

## Stage 01: Configuring git and gerrit

1. Add a username and email to your git configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

If this is not set, you will get an error when you try to commit. The error will look like this:

```bash
*** Please tell me who you are.
Run
  git config --global user.email ""
  git config --global user.name ""
to set your account's default identity.
Omit --global to set the identity only in this repository.
```

2. Create an account on Gerrit.

Got the gerrit url and click on button `New Account` under section **Register**.

3. Generate an SSH key.

```bash
ssh-keygen -t rsa
```

4. Add the SSH key to your Gerrit account.

```bash
cat ~/.ssh/id_rsa.pub
```

Copy the output and paste it in the `SSH Public Key` field in the Gerrit account.

How does private and public key work?

Public key is like a locker box and private key is key to unlock the box.
You share your locker box with others and keep the key to yourself.
The person with locker add a secret message, and close the box.
Now, this box will only be opened by the person with the key.

How in gerrit works?

Imagine your phone number is public key and your phone is private key. You share your phone number with others and keep your phone to yourself.
Now, when someone wants to send you the bill, only you can see the bill and pay it using Swish. And, to secure your phone more, you add a password to it or use a fingerprint.

5. Verify your email address in Gerrit.

---

## Stage 02: Understanding gerrit interface

1. Dashboard - Shows the list of changes that are pending review, changes that are merged, and changes that are abandoned.
2. Browse -> Repositories - Shows the list of repositories.
3. Search - Search for changes, projects, groups, etc.
4. Settings - Change your settings, add SSH keys, etc.
   1. SSH Keys - Add SSH keys.
   2. HTTP Password - Generate a password for HTTP access.
   3. Verify - Verify your email address.

Difference between `Repository` and `Project` in Gerrit?

Repository is a git repository, and Project is a Gerrit entity managing the repository and workflows. The workflow happens at the project level.

---

## Stage 03: Cloning a repository

1. Clone a repository from Gerrit.

```bash
git clone ssh://<username>@<gerrit-url>:29418/<project-name>
```

For the demo, we will use test1 for cloning.

---

## Stage 04: Committing and pushing changes

Let's try to make a change and send it for review.

1. Create a new file named `message.md` and add a mesaaage to it.

```bash
echo "Today is Monday." > message.md
```

Check the status of the repository.

```bash
git status
```

2. Add the file to the staging area. Now, git will track the changes in this file.

```bash
git add -p message.md
```

3. Commit the changes. This will save the changes in the local repository.

```bash
git commit -m "Add a message"
```

Examples of a bad commit message:

1. some fix.
2. updated the config file.
3. I like donuts.

What is a good commit message?

1. fix(README): update the README file.
2. feat(notify): add email notification.
3. chore(healthy): I eat donuts every morning.

Good prefix:

1. feat - new feature
2. fix - bug fix
3. chore - maintenance
4. docs - documentation
5. style - formatting
6. refactor - refactoring code
7. test - adding tests
8. perf - performance improvement
9. ci - continuous integration
10. build - build system
11. revert - reverting changes
12. security - security fix
13. breaking - breaking changes
14. upgrade - upgrading dependencies
15. downgrade - downgrading dependencies
16. release - release version
17. deploy - deployment changes
18. config - configuration changes
19. healthy - health changes
20. notify - notification changes

4. Push the changes to Gerrit. This will send the changes for review.

```bash
git push origin HEAD:refs/for/master
```

ref/for/master represents there is a change for review on the master branch. ref stands for reference.

---

## Stage 05: Reviewing changes

1. Automatic reviews or check.
   1. As soon as you push the changes, Jenkins will run the tests. It does checks like linting, unit tests, etc.
   2. If the checks pass, the verified +1 label will be added to the change.
   3. If the checks fail, the verified -1 label will be added to the change.
2. Manual reviews.
   1. Need a manual review from a team member.
3. Gate reviews.
   1. On code review, if the change is approved, it will be sent to the gate.
   2. The gate will run the tests again, like the compilation, integration tests, etc.
   3. If the gate passes, the vote will be +2.
   4. If the gate fails, the vote will be -2.
4. Submit the changes.

What is a good review message?

The review message should be clear and concise. It should only valid for the changes made in the commit.
Checklist for a good review:

[] Check the code style.
[] Check the code logic.
[] Check the code documentation.
[] Check the code tests.

---

## Stage 06: Understanding patch sets

Pushed something wrong? Need to fix it? Let's learn about patch sets.

Whenever we commit, there is a script that runs and adds a change-id to the commit message. This change-id is unique for **each commit**.
When we push the changes, Gerrit will check the change-id and if it is the same, it will add a new patch set to the change.

Patch set is a new version of the change. It can be a new commit, or it can be the same commit with some changes.

How this refs/changes/x/y/z number is generated?
x - Last two digits of the change number.
y - Change number.
z - Patch set number.

change number is generated by Gerrit.

And, each patchset has a unique hash.

---

## Stage 06: Reverting the change

Mistakes happen, and we may need to either fix them or revert them.

- Fixing the change, if it is not urgent, we can fix the change and send it for review again.
- Reverting the change, if it is urgent, we can revert the change.
  - Sometimes, we may need to revert multiple change, as they are dependent on each other.

Understand the log history of the repository.

```bash
git log --graph --oneline
```

Revert the change.

```bash
git revert <commit-hash>
```

If there are multiple commits to revert, we can use the `revert` command multiple times.

```bash
git revert <commit-hash-1> <commit-hash-2>
```

And, if there are multiple parents, we can use the `-m` flag to specify the parent.

```bash
git revert -m 1 <commit-hash>
```

And, if we want to revert the revert, we can use the `revert` command again.

```bash
git revert <revert-commit-hash>
```

And, if there are merge conflicts, we can resolve them manually, then complete the revert.

```bash
git add <file>
git revert --continue
```

And, finally publish the revert.

```bash
git push origin HEAD:refs/for/master
```

Revert does not delete the commit, it adds a new commit that reverts the changes. It will maintain the branch history.
If you want to go back to the old state, just go back to the `origin/master` branch.

```bash
git checkout origin/master
```

And, start your work again.

---

## Stage 07: Introducing release branch

Imagine every 2 weeks, we need to release a software to the customers. We can use a release branch for this.

1. Create a release branch.

```bash
git checkout -b release-1.0
```

or

```bash
git branch release-1.0
git checkout release-1.0
```

Now, this branch can be used for the release. And, to add a bug fix, we can use this branch.

---

## Stage 08: Cherry-picking the changes

Sometimes, we may need to add a major fix to the release branch as well as the master branch.
We can use cherry-pick for this. Developers add the fix to the master branch, and then cherry-pick the fix to the release branch.

1. Find the commit hash of the fix.

```bash
git log --oneline
```

2. Cherry-pick the fix to the release branch.

```bash
git cherry-pick <commit-hash>
```

If there are merge conflicts, we can resolve them manually, then complete the cherry-pick.

```bash
git add <file>
git cherry-pick --continue
```

And, finally publish the cherry-pick.

```bash
git push origin HEAD:refs/for/release-1.0
```

---

## Stage 09: Rebasing the changes

If you have to bring the changes that are in the master branch and add them to current change that you are working on.
You can use rebase for this.

1. Rebase the changes.

```bash
git fetch --all
git rebase origin/master
```

First, fetch all the changes from the remote repository, then rebase the changes from the master branch.

Handling merge conflicts.

If there are merge conflicts, we can resolve them manually, then continue the rebase.

```bash
git add <file>
git rebase --continue
```

---

## Stage 10: Squashing the changes

Imagine you have made multiple commits and you want to combine them into a single commit.

Look at the log history of the repository.

```bash
git log --oneline
```

Example commits:

```txt
abc1234 - fix: update the README file
def5678 - feat: add email notification
ghi9101 - chore: I eat donuts every morning
```

Squash the commits.

```bash
git reset --soft HEAD~3
```

git reset will reset the changes to the previous commit, and --soft will keep the changes in the staging area.

```bash
git commit -m "feat: added notification whenever the shop opens"
```

---

## Stage 11: Game time 🎮

Clone the repository `game-center` from Gerrit. Follow the instructions in `README.md` to complete the challenges.

---

Tips:

1. git stash - save the changes temporarily.
2. git stash pop - apply the changes from the stash.

---

## QnA ❔

At 12:30 PM during the walk.

---

## Thank you ❤️

### Credits
