---
name: new-post
description: Write a new bilingual Knowledge article for iank.nl with the owner. Asks for a topic, drafts in chat only, and publishes to main only after an explicit GO.
disable-model-invocation: true
---

# New Knowledge post

The site owner is Ian. Follow these steps in order. Do not write any article file before GO.

## 1. Check the repo (read-only)

Run `git status -sb` and `git fetch origin`. In a cloud session the checkout may be on a `claude/` branch: if nothing has changed, switch to `main` and fast-forward it.

- Stop and tell Ian if the branch is not `main`, if it is behind `origin/main`, or if anything outside `.claude/` has uncommitted changes. Do not stash, reset or discard anything.
- Read the frontmatter of every file in `src/content/knowledge/en/`, so you know the existing topics and which dates are taken.
- Read two existing articles in full, one in each language, to match the voice: plain language, short paragraphs, concrete advice.

## 2. Ask for the topic, then wait

Your first message to Ian is a short question, then stop and wait for the reply:

> Time for a new post. What should it be about, and is there real experience I should build it around (a project, a problem you hit, an opinion)?

Offer three topic ideas that do not repeat existing articles, weighted towards software, server management and cyber security. AI topics are secondary.

If the details are too thin to write something true and useful, ask one or two follow-up questions before drafting.

## 3. Draft in chat only

Do not create or edit any file in this step. Post in the chat:

- **Metadata:** title, one-sentence description, date, track, slug.
- **The full English article.**
- **The full Dutch article.** Natural Dutch, not a literal translation.
- **Things to check:** every first-person or factual claim that Ian should confirm.

End with: **GO to publish, NOGO to cancel, or tell me what to change.** Then stop and wait.

Rules for the content:

- First-person experience, clients, numbers and stories may only come from what Ian said in this session or from facts already on the site. Never invent them. If there are no real details, write general advice without first-person stories.
- Link primary sources for outside facts (RFCs, OWASP, vendor documentation), and check each link returns 200 with `curl -sL -o /dev/null -w "%{http_code}"`. If the network blocks a check, list that link under "Things to check" and do not claim it was verified.
- Do not use em dashes, hype, or filler introductions.

Metadata rules:

- **Date:** compute with a command, never from memory. Use the most recent first Monday on or before today. If an existing article already has that date, propose the next first Monday and ask Ian to confirm.
- **Track:** `software` for software, servers or security. `product` for AI inside software. `workflow` for building with AI. `foundations` for how AI works.
- **Slug:** short English kebab-case, the same for both languages, not already in use.

## 4. Revise until GO

- If Ian asks for changes, make them in the chat and show the changed parts, or the full text if much changed. Ask again for GO, NOGO or changes.
- Only an explicit GO for the latest version continues to step 5. Approving part of it, or saying it looks good, is not GO; ask.
- On NOGO, stop. Nothing has been written, so there is nothing to clean up.

## 5. Publish after GO

A cloud session may have been idle and restarted on a fresh machine by now. The approved text is in this conversation, so that is safe. First confirm the checkout is on an up-to-date `main` as in step 1, and run `npm ci` if `node_modules` is missing.

1. Write `src/content/knowledge/en/<slug>.mdx` and `src/content/knowledge/nl/<slug>.mdx`, in UTF-8 without BOM, with exactly the approved text. Frontmatter fields: `title`, `description`, `date`, `track`. Do not add `draft`. Quote YAML values containing a colon. In MDX body text, escape `{` and `<` outside code.
2. Run `npm run build`. If it fails, fix it and tell Ian what changed. Do not push a failing build. Then run `git checkout -- docs/og.png`, because a machine without the Georgia font redraws the social preview image differently.
3. Run `git status --short`. Only the two new article files and files under `docs/` may have changed, apart from an untracked `.claude/`. Confirm `git diff HEAD --quiet -- docs/app-ads.txt docs/apps public/app-ads.txt public/apps` exits 0. If either check fails, stop and ask.
4. Stage only `src/content/knowledge` and `docs`, never `git add -A`. Commit as `Add article: <title>`, ending the message with any attribution lines this session's instructions require.
5. Run `git push origin main`.
6. Cloudflare Pages deploys `docs/` in under a minute. Poll `https://iank.nl/knowledge/<slug>/` for up to five minutes until it returns 200, without using sleep in a way the shell blocks. If the network blocks `iank.nl`, say the push succeeded but the live site could not be checked, and give Ian the links to check himself.
7. Confirm on the live site that the English URL, the Dutch URL (`/nl/knowledge/<slug>/`) and the article's entry in `/rss.xml` are present, and that `https://iank.nl/app-ads.txt` and `https://iank.nl/apps/privacy-policy/relic-sweeper.txt` still return 200.
8. Give Ian both live links, and remind him he can use URL Inspection in Search Console to request indexing.

Report honestly if any step failed, and do not retry a rejected push by force.
