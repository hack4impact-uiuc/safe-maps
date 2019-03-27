# Contributing

Welcome to our contribution guide!

## Getting Started

Follow the README instructions in both the `backend/` and `frontend/` folders to run this application.

## Issue Guidelines

Issues are how we keep track of our work and the progress of our development. Use Issues to define features, Epics, submitting bugs, etc. They are also where general discussions are made.

Remember to:

- Write a clear title and description
- Link other relevant issues with `#<ticket number>`. Ex: Blocks #13
- Label each issue a priority
- Add other relevant labels
- Add it to the relevant Project Board
- Bug Reports must have clear instructions on reproducing it

Obvious Fixes that do not introduce any new functionality or creative thinking don't require creating Issues! Some examples are:

- Spelling / grammar fixes
- Typo correction, white space, and formatting changes
- Comment clean up
- Adding logging messages or debugging output

Just make a PR that follows the guidelines in the next section.

## Pull Request Guidelines

Pull Requests are the way concrete changes are made to the code, dependencies, documentation, and tools in `hack4impact-uiuc/childs-play-tool`.

### Process of Making Changes

As a rule of thumb, try to keep your Pull Requests small instead of huge PRs with changes in 20 files. It is much easier to review smaller incremental changes.

#### Step 1: Clone & Branch

As a best practice, create local branches to work within. They should be created off of the `master` branch.

#### Step 2: Code

Please make sure to run `yarn format` in both `frontend/` and `pipenv run black .` in `backend/` folders before commiting to ensure that changes follow our code style. Our code style is [standard](https://github.com/standard/standard). Our frontend also uses Flow for prop typing, so remember to add those in if you are modifying props in components.

### Step 3: Commit

Commits are how we keep track of code changes and thus should be explicit.

Unless your changes are trivial (when it doesn't require an issue), our commits must include a reference to an issue. Use the `Fixes` prefix, `Resolves`, or `Refs` depending on the type of your changes. Then, include a description of your changes.

Ex:

- `Resolves #14 List Page now filters games by lead character`
- `Fixes #15 HomePage no longer shows a blank page when the passcode is incorrect`

You may reference multiple issues if needed.

Once your PR is approved, you must squash your commits. Instructions are provided below. It is recommended to not squash your commits during the review process for easier review.

### Step 4: Rebase

It is recommended that you rebase your branch with master frequently to synchronize your work to ensure you have the latest changes and that you will pass tests when it's merged in.

```bash
git pull origin master
```

If your branch was already pushed to github, do this as well:

```bash
git push --force-with-lease origin my-branch
```

### Step 5: Test

A test suite will be coming soon :) You must always write tests for your features and changes.

### Step 6: Opening your PR

Push your branch to github and open a PR! From there, reference the issues related to your PR just like you did in your commits in the description section. Add the collaborators as reviewers, especially including the owner of the issue (unless it's yourself). Please fill out as many details and include Screenshots if your work is on the frontend. Then, add a `In Review` Label and add in into the relevant Projects Board.

### Step 7: Review

Your reviewers will get then provide feedback or requests for changes to your Pull Reuqest. Make those changes, add a new commit, and push them to your remote branch in Github! Remember to still rebase your branch with `master`! Feel free to put a comment down when your ready for re-reviews.

Whenever you're making changes, please label your PR as "WIP"

Each PR requires at least two approvals from a collaborator and pass the CI run.

### Step 8: Approval!

Once your PR is approved, please squash your commits. To do this:

- Use the Github squash and merge option in your PR.
  Or you can do this from terminal:
- `git rebase -i <the git commit hash of the commit before your first commit in your PR>`
- An editor will pop out and you must delete `pick` and add `squash` in front of the PRs that you want to squash. Save.
- Another editor will open and delete the commit messages you don't want to keep. Save. Remember your final commit message must oblige to the commits guidelines.

Each logical change should only have one commit.

Merge!
