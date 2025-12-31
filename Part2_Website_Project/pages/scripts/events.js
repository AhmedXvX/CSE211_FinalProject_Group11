class EventManager {
    constructor() {
        this.events = [];
        this.tableBody = document.getElementById('eventsTableBody');
        this.cardsContainer = document.getElementById('featuredEventsContainer');
        this.searchInput = document.getElementById('eventSearch');
        this.categorySelect = document.getElementById('eventCategory');

        // Homepage specific element
        this.homeCategorySelect = document.getElementById('category');

        if (this.tableBody || this.cardsContainer || this.homeCategorySelect) {
            this.init();
        }
    }

    async init() {
        this.setupEventListeners();
        await this.fetchEvents();

        // After fetching events, apply URL params if we are on the events page
        if (this.tableBody) {
            this.applyUrlParams();
        }
    }

    setupEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.filterEvents());
        }
        if (this.categorySelect) {
            this.categorySelect.addEventListener('change', () => this.filterEvents());
        }
    }

    async fetchEvents() {
        try {
            // Determine correct path based on current location
            const isPagesDir = window.location.pathname.includes('/pages/');
            const apiPath = isPagesDir ? 'scripts/get_events.php' : 'pages/scripts/get_events.php';

            const response = await fetch(apiPath);
            if (response.ok) {
                console.log("Successfully fetched events from API");
                console.log(response.body);
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    this.events = data;
                } else {
                    console.log("No events from API, using dummy data");
                    this.loadDummyData();
                }
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.warn('Error fetching events (likely no server context), using dummy data:', error);
            this.loadDummyData();
        }

        // Populate Categories dynamic content
        this.populateCategoryDropdowns();

        if (this.tableBody) {
            this.renderEventsTable(this.events);
        }
        if (this.cardsContainer) {
            this.renderEventsCards(this.events);
        }
    }

    loadDummyData() {
        this.events = [
            { id: 1, name: "Tech Conference 2025", date: "2025-03-15", location: "New York, NY", category: "Conference", cost: 299 },
            { id: 2, name: "Summer Music Festival", date: "2025-07-20", location: "Austin, TX", category: "Music", cost: 150 },
            { id: 3, name: "Web Dev Workshop", date: "2025-05-10", location: "Online", category: "Workshop", cost: 50 },
            { id: 4, name: "Startup Summit", date: "2025-09-05", location: "San Francisco, CA", category: "Business", cost: 400 },
        ];
    }

    populateCategoryDropdowns() {
        // Extract unique categories
        const categories = [...new Set(this.events.map(event => event.category))].sort();

        // Helper function to populate a select element
        const populate = (selectElement) => {
            if (!selectElement) return;

            // Keep the first option (e.g. "All Categories")
            const firstOption = selectElement.options[0];
            selectElement.innerHTML = '';
            selectElement.appendChild(firstOption);

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                selectElement.appendChild(option);
            });
        };

        populate(this.categorySelect);
        populate(this.homeCategorySelect);
    }

    applyUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const categoryParam = urlParams.get('category');
        let needsFilter = false;

        if (searchParam && this.searchInput) {
            this.searchInput.value = searchParam;
            needsFilter = true;
        }

        if (categoryParam && this.categorySelect) {
            // We need to wait for populateCategoryDropdowns to finish (it is sync called in fetchEvents await, so we are good)
            // But we match case-insensitive or exact? categoryParam from sidebar might be lowercase 'tech' vs DB 'Technology'.
            // The sidebar options in index.html had values 'tech'. 
            // My new populateCategories uses exact DB values.
            // If the user submitted from the OLD index.html hardcoded list, the param might be 'tech'.
            // If they submit from the NEW dynamic list, it will be 'Technology'.
            // I should probably try to match somewhat loosely or rely on the fact I'm updating the index.html dropdown too.
            // Since I am updating index.html dropdown to use DB values, the submission will match DB values.
            this.categorySelect.value = categoryParam;
            needsFilter = true;
        }

        if (needsFilter) {
            this.filterEvents();
        }
    }

    renderEventsTable(eventsToRender) {
        this.tableBody.innerHTML = '';

        if (eventsToRender.length === 0) {
            this.tableBody.innerHTML = '<tr><td colspan="6" style="padding: 2rem; text-align: center;">No events found matching your criteria.</td></tr>';
            return;
        }

        eventsToRender.forEach(event => {
            const row = document.createElement('tr');
            row.style.borderBottom = '1px solid #e2e8f0';
            row.innerHTML = `
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td>${event.location}</td>
                <td><span style="background: #e0e7ff; color: var(--primary-color); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;">${event.category}</span></td>
                <td>$${event.cost}</td>
                <td><a href="registration.html?event_id=${event.id}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">Register</a></td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    renderEventsCards(eventsToRender) {
        this.cardsContainer.innerHTML = '';

        // Limit to 2 for homepage.
        const eventsToShow = eventsToRender.slice(0, 2);

        // Available images
        const images = ['gu.webp', 'gu_administration.webp', 'gu_campus.webp', 'gu_orientation.avif'];
        const shuffledImages = [...images].sort(() => 0.5 - Math.random());

        const isPagesDir = window.location.pathname.includes('/pages/');
        const imgPathPrefix = isPagesDir ? 'images/' : 'pages/images/';

        eventsToShow.forEach((event, index) => {
            const card = document.createElement('article');
            card.className = 'event-card';

            // Map category to class for styling tag (simplified)
            const tagClass = event.category.toLowerCase().includes('music') ? 'tag-music' : 'tag-tech';

            // Select image from shuffled list (cycling if we have more events than images)
            const randomImage = shuffledImages[index % shuffledImages.length];

            // Override default event-card styles for a vertical card layout with image
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.padding = '0';
            card.style.overflow = 'hidden';
            card.style.alignItems = 'stretch';

            card.innerHTML = `
                <figure class="event-img-container" style="margin: 0; height: 200px; position: relative;">
                    <img src="${imgPathPrefix}${randomImage}" alt="${event.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </figure>
                <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <header>
                            <h3 class="mb-1 text-color text-xl font-bold">${event.name}</h3>
                        </header>
                        <div class="text-muted mb-2 font-medium">
                            <time datetime="${event.date}">${event.date}</time> • <span>${event.location}</span>
                        </div>
                    </div>
                    <div style="margin-top: auto;">
                        <span class="tag ${tagClass}">${event.category}</span>
                    </div>
                </div>
            `;
            this.cardsContainer.appendChild(card);
        });
    }

    filterEvents() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const category = this.categorySelect.value;
        // Handle "All Categories" value which might be empty string or 'all'

        const filteredEvents = this.events.filter(event => {
            const matchesSearch = event.name.toLowerCase().includes(searchTerm) || event.location.toLowerCase().includes(searchTerm);
            const matchesCategory = category === '' || category === 'all' || event.category === category;
            return matchesSearch && matchesCategory;
        });

        if (this.tableBody) {
            this.renderEventsTable(filteredEvents);
        }
        // Homepage usually doesn't have live filter, but if it did it would call renderEventsCards
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new EventManager();
});
