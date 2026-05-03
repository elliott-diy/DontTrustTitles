# DontTrustTitles

Quick POC after seeing a post about games detecting Discord group chat names.

I wanted to see if they also check browser tab titles. Turns out they do!



Some games (like Fortnite) will immediately kick you just for having a tab open in the background with certain titles. 

---

## What this does

This page just repeatedly changes `document.title` to known debugger / reverse engineering tool names like:

* x64dbg
* Cheat Engine
* IDA
* Ghidra

You can also input your own values if you want to test other debuggers or game cheats.

---

## How this actually works

Games like Fortnite run anti-cheat checks that scan for known tools (debuggers, cheat engines, etc.) running on your system.

A simple version of what they appear to be doing:

* Enumerate open windows / processes
* Read window titles
* Match against a list of flagged keywords

Browsers expose tab titles as part of the window title:

```
<tab title> - Mozilla Firefox
<tab title> - Google Chrome
```

So when this page does:

```
document.title = "x64dbg"
```

Your system now has a window title like:

```
x64dbg - Mozilla Firefox
```

From the game’s perspective, this looks like a debugger window.

So:

* The anti-cheat sees a flagged string
* Assumes a tool is running
* Kicks you (or bans you, depending on the game and program)

Even if:

* The tab is in the background
* You never interacted with it
* The tool isn’t installed

What could go wrong!

---

## Demo

If you want to try this out I have put up a demo. This could lead to your accounts getting banned so please try it at your own risk!

Try it here: https://research.elliott.diy/fea9d209

Open it, hit start, then launch a game and see what happens.

---

## Affected games

| Game     | Kick | Ban | App    |
|----------|------|-----|--------|
| Fortnite | Yes  | No  | x64dbg |
|          |      |     |        |

Send a PR if you find a new game that hates browser tabs.

---

