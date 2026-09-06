document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());

document.querySelectorAll('.nav-burger').forEach(btn => {
    btn.addEventListener('click', () => {
        const links = btn.closest('nav').querySelector('.nav-links');
        const isOpen = links.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen);
        btn.textContent = isOpen ? '✕' : '☰';
        document.body.classList.toggle('nav-menu-open', isOpen);
    });
});

const motionToggle = document.getElementById('motionToggle');

if (localStorage.getItem('no-motion') === 'true') {
    document.body.classList.add('no-motion');
    if (motionToggle) motionToggle.checked = true;
}

if (motionToggle) {
    motionToggle.addEventListener('change', () => {
        if (motionToggle.checked) {
            document.body.classList.add('no-motion');
            localStorage.setItem('no-motion', 'true');
        } else {
            document.body.classList.remove('no-motion');
            localStorage.setItem('no-motion', 'false');
        }
    });
}
