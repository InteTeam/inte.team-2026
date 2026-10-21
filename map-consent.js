/* Click-to-load Google Maps: no request goes to Google (and no Google cookies are set)
   until the visitor presses "Show map". Markup: a .map-consent box holding a
   [data-map-src] button; the button's box is swapped for the map frame. */
document.querySelectorAll('[data-map-src]').forEach(btn => {
    btn.addEventListener('click', () => {
        const frame = document.createElement('iframe');
        frame.src = btn.dataset.mapSrc;
        frame.title = btn.dataset.mapTitle || 'Map';
        frame.className = 'map-frame';
        frame.setAttribute('allowfullscreen', '');
        frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        btn.closest('.map-consent').replaceWith(frame);
        frame.focus();
    });
});
