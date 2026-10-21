/* Section dock: builds a half-circle "on this page" menu on the left edge.
   To use on a page: include section-dock.css + this file, then mark each section
   with  id="..." data-dock="Label" data-dock-icon="emoji". Nothing else to wire up. */
(function () {
    'use strict';

    const sections = Array.from(document.querySelectorAll('[data-dock][id]'));
    if (sections.length < 2) return;

    const ARC_STEP = 26;   // degrees between items
    const ARC_MAX = 160;   // never spread wider than this (180 = full half-circle)
    const CLOSE_DELAY = 280;

    const dock = document.createElement('nav');
    dock.className = 'sdock';
    dock.setAttribute('aria-label', 'Sections on this page');
    dock.innerHTML =
        '<div class="sdock-disc" aria-hidden="true"></div>' +
        '<button type="button" class="sdock-handle" aria-expanded="false" aria-controls="sdock-list" aria-label="Show sections on this page" title="Sections on this page">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>' +
        '</button>' +
        '<ul class="sdock-list" id="sdock-list"></ul>';

    const handle = dock.querySelector('.sdock-handle');
    const list = dock.querySelector('.sdock-list');
    const radius = () => parseFloat(getComputedStyle(dock).getPropertyValue('--sdock-r')) || 150;

    const n = sections.length;
    const spread = Math.min(ARC_MAX, (n - 1) * ARC_STEP);
    const items = sections.map(function (section, i) {
        const li = document.createElement('li');
        li.style.setProperty('--i', i);
        li.dataset.angle = String(n === 1 ? 0 : -spread / 2 + (spread / (n - 1)) * i);

        const a = document.createElement('a');
        a.className = 'sdock-item';
        a.href = '#' + section.id;
        const icon = document.createElement('span');
        icon.className = 'sdock-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = section.dataset.dockIcon || '•';
        const label = document.createElement('span');
        label.className = 'sdock-label';
        label.textContent = section.dataset.dock;
        a.append(icon, label);
        li.appendChild(a);
        list.appendChild(li);
        return { li: li, link: a, section: section };
    });

    function layout() {
        const r = radius();
        items.forEach(function (item) {
            const rad = parseFloat(item.li.dataset.angle) * Math.PI / 180;
            item.li.style.setProperty('--x', (r * Math.cos(rad)).toFixed(1) + 'px');
            item.li.style.setProperty('--y', (r * Math.sin(rad)).toFixed(1) + 'px');
        });
    }

    // Open / close. Hover opens on mouse only; a click pins it open until closed.
    let open = false, pinned = false, closeTimer = null;
    function setOpen(state, pin) {
        clearTimeout(closeTimer);
        open = state;
        pinned = state && !!pin;
        dock.classList.toggle('is-open', open);
        handle.setAttribute('aria-expanded', String(open));
        handle.setAttribute('aria-label', open ? 'Hide sections on this page' : 'Show sections on this page');
        if (!open) items.forEach(function (it) { it.li.style.removeProperty('--mag'); });
    }

    handle.addEventListener('click', function () {
        if (open && pinned) setOpen(false);
        else setOpen(true, true);
    });
    dock.addEventListener('pointerenter', function (e) {
        if (e.pointerType === 'mouse' && !open) setOpen(true, false);
        clearTimeout(closeTimer);
    });
    dock.addEventListener('pointerleave', function (e) {
        if (e.pointerType !== 'mouse' || pinned) return;
        closeTimer = setTimeout(function () { setOpen(false); }, CLOSE_DELAY);
    });
    document.addEventListener('pointerdown', function (e) {
        if (open && !dock.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && open) { setOpen(false); handle.focus(); }
    });
    list.addEventListener('click', function (e) {
        if (e.target.closest('.sdock-item')) setOpen(false);
    });

    // macOS-dock style magnification: the hovered item grows, its neighbours a little
    items.forEach(function (item, i) {
        item.link.addEventListener('pointerenter', function (e) {
            if (e.pointerType !== 'mouse') return;
            items.forEach(function (other, j) {
                const d = Math.abs(i - j);
                other.li.style.setProperty('--mag', d === 0 ? 1.22 : d === 1 ? 1.08 : 1);
            });
        });
    });
    list.addEventListener('pointerleave', function () {
        items.forEach(function (it) { it.li.style.removeProperty('--mag'); });
    });

    // Highlight the section currently in the middle of the viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                items.forEach(function (it) {
                    const current = it.section === entry.target;
                    it.link.classList.toggle('is-current', current);
                    if (current) it.link.setAttribute('aria-current', 'location');
                    else it.link.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (s) { observer.observe(s); });
    }

    document.body.appendChild(dock);
    layout();
    window.addEventListener('resize', layout);
})();
