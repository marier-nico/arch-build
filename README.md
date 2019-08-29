![docker-build](https://img.shields.io/docker/cloud/automated/mariernico/arch-build)
![docker-build-status](https://img.shields.io/docker/cloud/build/mariernico/arch-build)

What is this?
-------------

Legitimate question! Well, currently the scope of this repo is pretty limited.
The reason for its existence is mainly the [suckless](https://suckless.org) family
of software. The suckless [philosophy](https://suckless.org/philosophy/) is to keep
thing simple and minimal. So, to customize suckless tools and software, users are
required to edit `config.h` and recompile the program. That's fine, in most cases
because one could symlink `config.h` from their dotfiles into wherever the suckless
utility's source is located. That would allow someone to easily keep a consistent
setup across many computers.

The issue I'm personally facing is with patches. Patches are used to extend a given
suckless utility's functionality, and they're really useful! Though, now you're not
just modifying `config.h`, you're also editing say `st.c` or `dwm.c`, and I'm not a
huge fan of maintaining source code in my dotfiles, where *configurations* should be
stored. So, I created a package! I forked the utilities that I want from suckless and
applied my patches and configs there.

**This is where this repo comes in.** This repo will have a simple structure of folders
for each package, each containing a PKGBUILD that can be used to build my versions of
the suckless programs.

Dockerfile
----------

Because I'm lazy (and love some automation), I also added a CI/CD pipeline to my forks,
so every time I push an update to my configurations, the packages are rebuilt and
re-uploaded to my package repository. For this CI/CD thing to work though, I need an
image to build the packages inside of. The Dockerfile is what I use to build my packages
on the CI server.

**Full disclosure:** I didn't come up with the Dockerfile, I found it [here](https://bbs.archlinux.org/viewtopic.php?id=243393).

I'm hooked! How does it work?
-----------------------------

This is the beautiful part, because it's really simple! If you were to want to install
my packages, for some random reason, you would just have to follow these simple steps!

1. Add my server to your `/etc/pacman.conf`
```
[nmarier-aur]
SigLevel = Optional TrustAll
Server = https://aur.nmarier.com/packages/$arch
```

2. Run the following command (to in stall `st`, for example)
```
$ sudo pacman -Sy st
```

3. Profit??

Seriously, **that's it!** The most convenient thing about this is that if I make a
tweak to my configuration, I can push the change, and just run a quick `pacman -Syu`
to get the changes on any of my other machines.
