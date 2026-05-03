# DontTrustTitles

Quick POC after seeing a post about games detecting Discord group chat names.

This isn’t new, I just spun this up for my own testing and figured I’d share it.

I wanted to see if browser tab titles get checked too and turns out they do!

Some games (like Fortnite) will immediately kick you just for having a tab open in the background with certain titles.

---

## What this does

This page just repeatedly changes `document.title` to common debugger / reverse engineering tool names like:

* x64dbg
* Cheat Engine
* IDA
* Ghidra

You can also put in your own values if you want to test other tools.

---

## How this actually works

Games like Fortnite run anti-cheat checks looking for known tools (debuggers, cheat engines, etc.) on your system.

At a basic level they seem to:

* Enumerate open windows / processes
* Read window titles
* Match against flagged keywords

Browsers include the tab title in the window title:

```
<tab title> - Mozilla Firefox
<tab title> - Google Chrome
```

So when this page runs:

```
document.title = "x64dbg"
```

Your system ends up with a window title like:

```
x64dbg - Mozilla Firefox
```

From the game’s point of view, that looks like a debugger.

So:

* It sees a flagged string
* Assumes something is running
* Kicks you (or worse, depending on the game)

Even if:

* The tab is in the background
* You never touched it
* The tool isn’t installed

---

## Demo

Try it here:
[https://research.elliott.diy/fea9d209](https://research.elliott.diy/fea9d209)

Open it, hit start, then launch a game.

---

## Affected games

| Game     | Kick | Ban | App    |
| -------- | ---- | --- | ------ |
| Fortnite | Yes  | No  | x64dbg |
|          |      |     |        |

Send a PR if you find more games that hate browser tabs.

