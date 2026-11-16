# How this website works

Everything you need to run, edit and publish the portfolio site.

## 1. Where everything is

| What | Where |
| --- | --- |
| The whole project (code + content) | `/Users/edmund/Claude/Edmund's Portfolio/mecheng_portfolio` on your Mac |
| Online copy of the project | https://github.com/edmundlew/mechengportfolio |
| The live website | https://mechengportfolio.vercel.app |
| The editor (edit text in the browser) | https://mechengportfolio.vercel.app/admin |
| This guide | `GUIDE.md` in the project folder |

How they connect: your Mac folder is pushed to GitHub. Vercel watches GitHub and rebuilds the live site about two minutes after anything changes there. The editor saves straight to GitHub, so it publishes on its own.

### Inside the project folder

**Content (the words and pictures). This is what the editor changes.**

| File or folder | What it holds |
| --- | --- |
| `public/data/about.json` | About Me text, toolkit chips, the status bar at the bottom of the home page |
| `public/data/site-text.json` | Every page title, heading and one-liner, the hero text, the footer |
| `public/data/education.json` | Education cards |
| `public/data/projects.json` | "Things I've Built" cards |
| `public/data/papers.json` | "Things I've Written" cards |
| `public/data/experience.json` | Experience timeline |
| `public/data/travels.json` | Travel map dots and the year-by-year timeline |
| `content/blog/` | Stories, one `.md` file each |
| `public/interests/photography/` | Photos in the "Through the Lens" gallery |
| `public/interests/blog/` | Pictures used inside stories |
| `public/edmund_resume.pdf` | The résumé the Download button opens |
| `public/assets/` | Profile photo, logos, flags, certificates |
| `public/projects/`, `public/papers/` | Project photos and videos, paper PDFs |

**Design (how it looks and behaves). Ask Claude to change these.**

| File or folder | What it holds |
| --- | --- |
| `app/` | One folder per page: `page.tsx` (home), `education/`, `projects/`, `experience/`, `interests/` |
| `components/` | The building blocks: nav bar, cards, map, carousel, scroll mascots |
| `app/globals.css`, `tailwind.config.ts` | Colours, fonts, the graph-paper background |
| `public/admin/config.yml` | Which fields the editor shows |

## 2. Editing text and pictures (the editor)

Go to **https://mechengportfolio.vercel.app/admin**. It works on your laptop and your phone.

### First time on each device: sign in

1. Click **Sign In with Token**.
2. The box that appears has a link to GitHub. Click it. GitHub opens a "new token" page with the right boxes already ticked.
3. Set the expiration to whatever you like, scroll down, click **Generate token**, and copy the token.
4. Paste it into the box in the editor and confirm.

The browser remembers you after that. The token is a password to your GitHub repo, so don't share it. The admin page is public, but nobody can change anything without a token.

### Making a change

1. In the sidebar pick **Site content**, then the section you want (About Me, Headings, Education, Projects, Experience, Travels).
2. Change the text in the form.
3. Click **Save**.

Saving publishes. There is no draft step, and the live site updates in about two minutes.

### What's where in the editor

- **About Me & status bar**: the About Me paragraph, toolkit chips, and the "Miri, Sarawak · Working in OSSM" bar. To update your status, change Location, Timezone and "What I'm doing".
- **Headings, hero & footer text**: "Hi, I'm Edmund.", the rotating words, every page title and section heading, the Explore cards, the footer.
- **Education / Projects / Experience**: one collapsible card per entry. Add, remove, reorder, edit.
- **Travels**: the timeline (by year) and the map dots. A place in the timeline must also exist under Map dots, spelled the same.
- **Stories**: press **New** to write a blog post. Title, date, optional cover image, then write. Pictures you insert are uploaded for you.
- **Assets**: upload photos here to add them to the photography gallery. The file name becomes the caption: `01 golden gate at dusk.jpg` shows as "Golden gate at dusk", and the number sets the order.

### What the editor can't do

- Add a logo for a new school or company, or a flag for a new school. Add the entry in the editor, then send Claude the logo.
- Replace the résumé PDF or the profile photo (see section 4).
- Add project photos or videos. Send them to Claude: iPhone photos and videos need converting first.
- Change anything about the design.

## 3. Changing the style or layout

Open the Claude chat for this project and say what you want. Claude edits the files in the project folder on your Mac. Then you preview it, and publish it yourself.

**Before any design session, if you have used the editor since your last push, run this first.** It brings the editor's changes down to your Mac:

```bash
cd "/Users/edmund/Claude/Edmund's Portfolio/mecheng_portfolio"
git pull origin main --no-rebase --no-edit
```

### Preview on your Mac (nothing goes live)

```bash
cd "/Users/edmund/Claude/Edmund's Portfolio/mecheng_portfolio"
npm run dev
```

Open http://localhost:3000. Changes appear when you refresh. Press **Ctrl+C** in Terminal to stop it.

## 4. Publishing changes made on your Mac

Use this after a design session with Claude, or after swapping a file like the résumé. Paste one line at a time:

```bash
cd "/Users/edmund/Claude/Edmund's Portfolio/mecheng_portfolio"
git add .
git commit -m "Describe what changed"
git pull origin main --no-rebase --no-edit
git push origin HEAD:main
```

The live site updates about two minutes later. Check progress at vercel.com under your project's Deployments tab.

### Replacing the résumé

Put the new PDF in `public/` and name it exactly `edmund_resume.pdf`, replacing the old one. Then run the five publish commands above.

### Replacing the profile photo

Replace `public/assets/profile.jpg` with a new photo of the same name (portrait, 2:3 works best). Then publish.

## 5. If something goes wrong

- **`git push` is rejected**: you skipped the `git pull` line. Run `git pull origin main --no-rebase --no-edit`, then push again.
- **`git pull` says CONFLICT**: the same text was changed in the editor and on your Mac. Stop there and tell Claude; it's a quick fix.
- **Terminal says "nothing to commit"**: there was nothing new to publish. That's fine.
- **`npm run dev` fails after a pull**: run `npm install` once, then try again.
- **The live site didn't change**: wait two minutes, then hard refresh with Cmd+Shift+R. If it's still old, look for a red "Error" in Vercel's Deployments tab and send Claude the message.
- **The editor shows an error after a save**: your change is not lost if the save went through. Check the live site in two minutes. If the build failed, tell Claude.
- **Terminal asks for a GitHub password**: your normal password won't work. Paste a token instead (GitHub → Settings → Developer settings → Personal access tokens).

## 6. The short version

- **Words and pictures** → the editor at `/admin` → Save → live in two minutes.
- **Look and layout** → ask Claude → preview on localhost → five publish commands.
- **Always pull before you push.**
