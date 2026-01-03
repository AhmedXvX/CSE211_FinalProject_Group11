document.addEventListener('DOMContentLoaded', async () => {
    const eventSelect = document.getElementById('eventSelect');

    if (!eventSelect) return;

    try {
        // Fetch events from the API
        const response = await fetch('scripts/get_events.php');
        if (!response.ok) throw new Error('Failed to fetch events');

        const events = await response.json();

        // Clear existing options
        while (eventSelect.options.length > 1) {
            eventSelect.remove(1);
        }

        // Populate dropdown
        events.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.name} (${event.date})`;
            eventSelect.appendChild(option);
        });

        // Check for event_id in URL
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('event_id');

        if (eventId) {
            eventSelect.value = eventId;
        }

    } catch (error) {
        console.error('Error initializing registration form:', error);
        // Fallback or user notification could go here
    }
});
