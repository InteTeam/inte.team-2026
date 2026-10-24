// How We Operate: snake layout for wide screens and the "current flows" scroll effect.
// Without this script the page still works: one straight trace, everything lit.
(function () {
    var trace = document.querySelector('.trace');
    if (!trace) return;
    var steps = Array.prototype.slice.call(trace.querySelectorAll('.step'));

    function columns() {
        if (window.matchMedia('(min-width: 1280px)').matches) return 3;
        if (window.matchMedia('(min-width: 900px)').matches) return 2;
        return 1;
    }

    // Lay the steps out row by row, every second row right to left, and mark which
    // segment each step draws (see the snake section in how-we-operate.css).
    function layout() {
        var cols = columns();
        steps.forEach(function (step) {
            step.classList.remove('link-right', 'turn-right', 'turn-left');
            step.style.gridRow = '';
            step.style.gridColumn = '';
        });
        trace.classList.toggle('is-snake', cols > 1);
        if (cols === 1) return;
        trace.style.setProperty('--cols', cols);

        steps.forEach(function (step, i) {
            var row = Math.floor(i / cols);
            var pos = i % cols;
            var reversed = row % 2 === 1;
            step.style.gridRow = String(row + 1);
            step.style.gridColumn = String(reversed ? cols - pos : pos + 1);

            var next = steps[i + 1];
            if (!next) return;
            if (Math.floor((i + 1) / cols) === row) {
                // Same row: the left one of the pair draws the link.
                (reversed ? next : step).classList.add('link-right');
            } else {
                step.classList.add(reversed ? 'turn-left' : 'turn-right');
            }
        });
    }

    layout();
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(layout, 120);
    });

    // No Animations on, reduced motion, or an old browser: leave everything lit.
    var noMotion = document.body.classList.contains('no-motion') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (noMotion || !('IntersectionObserver' in window)) return;

    trace.classList.add('is-live');

    // Lighting a step lights every step before it, so jumping down the page
    // never leaves a dark gap in the trace.
    function lightUpTo(index) {
        for (var i = 0; i <= index; i++) steps[i].classList.add('is-lit');
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            lightUpTo(steps.indexOf(entry.target));
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -25% 0px', threshold: 0.2 });

    steps.forEach(function (step) { observer.observe(step); });
})();
