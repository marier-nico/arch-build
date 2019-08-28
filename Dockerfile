FROM archlinux/base:latest

RUN curl -o /etc/pacman.d/mirrorlist "https://www.archlinux.org/mirrorlist/?country=all&protocol=https&ip_version=4&use_mirror_status=on" \
        && sed -i 's/^#//' /etc/pacman.d/mirrorlist \
        && pacman-key --refresh-keys \
        && pacman -Syu --noconfirm base-devel multilib-devel namcap git

RUN useradd -d /home/builduser builduser \
        && echo "builduser ALL = NOPASSWD: /usr/bin/pacman" > /etc/sudoers.d/builduser-pacman

USER builduser

CMD ["/usr/bin/bash"]
