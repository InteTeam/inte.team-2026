document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());

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
