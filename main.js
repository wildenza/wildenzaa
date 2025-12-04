// --- Tailwind CSS Configuration ---
// Kept here to keep HTML focused on structure & styles
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Culori ajustate pentru a se potrivi imaginii de referință
                'neo-bg': '#f0f0f0', // Folosit pentru fundalul elementelor albe, poate fi ajustat
                'neo-black': '#1a1a1a', // Negru pentru borduri și text
                'neo-blue-main': '#2176ff', // Culoarea de fundal principală din imagine
                'neo-lightblue': '#7cd6fd', // Albastru deschis pentru accente
                'neo-green': '#a3ffae',
                'neo-yellow': '#fdfd96',
                'neo-pink': '#ff90b3',
                'neo-blue': '#95b8d1',
                'neo-orange': '#ffc785', // Portocaliu deschis pentru accente
            },
            fontFamily: {
                mono: ['"Space Mono"', 'monospace'],
                display: ['"Archivo Black"', 'sans-serif'],
            },
            boxShadow: {
                'neo': '6px 6px 0px 0px #000000',
                'neo-hover': '2px 2px 0px 0px #000000',
                'neo-deep': '10px 10px 0px 0px #000000',
            },
            cursor: {
                'crosshair': 'crosshair',
            }
        }
    }
};

// --- Globals used by inline HTML handlers (onclick, etc.) ---
let modal, modalContent, modalTitle, modalDesc, modalImg, modalLink, modalTechList;

// Modal gallery state
let modalImages = [];
let modalImageIndex = 0;

// --- Portfolio / Pagination state ---
let allProjects = [];
let currentFilter = 'all';
let currentPage = 1;
const pageSize = 6; // number of projects per page

// --- DOM Ready Initialisation ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    // Smooth Scroll for Anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Allow links like href="#" to behave normally
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- SPLINE LOADING HANDLER ---
    const splineViewer = document.getElementById('main-spline-viewer');
    const loadingOverlay = document.getElementById('spline-loading-overlay');

    if (splineViewer && loadingOverlay) {
        // Listen for the spline:load event
        splineViewer.addEventListener('spline:load', () => {
            // Start fade out animation
            loadingOverlay.classList.add('hidden-fade');

            // Hide completely after transition
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500); // Must match transition duration in CSS
        });
    }

    // --- SCROLL ANIMATION OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el) => {
        observer.observe(el);
    });

    // --- MODAL ELEMENT REFERENCES & LISTENERS ---
    modal = document.getElementById('project-modal');
    modalContent = document.getElementById('modal-content');
    modalTitle = document.getElementById('modal-title');
    modalDesc = document.getElementById('modal-desc');
    modalImg = document.getElementById('modal-img');
    modalLink = document.getElementById('modal-link');
    modalTechList = document.getElementById('modal-tech-list');

    if (modal) {
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // --- LOAD PROJECTS FROM EXTERNAL FILE ---
    loadProjects();
});

// --- Function to load projects from external file ---
async function loadProjects() {
    try {
        const response = await fetch('projects-partial.html');
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        const html = await response.text();
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = html;
            
            // Re-initialize icons after content is loaded
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
            
            // Initialize projects after they're loaded
            allProjects = Array.from(document.querySelectorAll('.project-item'));
            
            // Set initial filter to 'all' and apply pagination
            applyFilterAndPagination();
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = '<p class="text-center text-red-500">Error loading projects. Please refresh the page.</p>';
        }
    }
}

// --- Helper: does a project match the current filter? ---
function projectMatchesFilter(project, category) {
    const projectCategory = project.dataset.category;
    const projectStyle = project.dataset.style;

    const isAll = category === 'all';
    const isTopLevelCategory = ['3d', 'coding', 'printing'].includes(category);
    const isStyleCategory = ['lowpoly', 'other', 'psx'].includes(category);

    if (isAll) return true;
    if (isTopLevelCategory) return projectCategory === category;
    if (isStyleCategory) return projectStyle === category;

    return false;
}

// --- Apply filter + pagination ---
function applyFilterAndPagination() {
    if (!allProjects.length) {
        allProjects = Array.from(document.querySelectorAll('.project-item'));
    }

    const filtered = allProjects.filter(project => projectMatchesFilter(project, currentFilter));
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

    // Clamp currentPage
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // Hide all projects first
    allProjects.forEach(project => {
        project.classList.add('hidden');
        project.classList.remove('animate-fade-in');
    });

    // Show only projects for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    filtered.forEach((project, index) => {
        if (index >= startIndex && index < endIndex) {
            project.classList.remove('hidden');
            project.classList.add('animate-fade-in');
        }
    });

    // Update filter button styles
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-neo-black', 'text-white');
        btn.classList.add('bg-white', 'text-black');
    });

    const activeBtnId = 'btn-' + currentFilter;
    const activeBtn = document.getElementById(activeBtnId);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-black');
        activeBtn.classList.add('bg-neo-black', 'text-white');
    }

    // Update pagination controls
    renderPaginationControls(totalPages);
}

// --- Filter Functionality (called from HTML buttons) ---
function filterProjects(category) {
    currentFilter = category;
    currentPage = 1; // reset to first page when filter changes
    applyFilterAndPagination();
}

// --- Pagination Controls ---
function renderPaginationControls(totalPages) {
    const paginationContainer = document.getElementById('projects-pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    if (totalPages <= 1) {
        // nothing to paginate, hide container
        paginationContainer.classList.add('hidden');
        return;
    }

    paginationContainer.classList.remove('hidden');

    // Prev button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.className = 'px-3 py-1 border-2 border-black bg-white font-bold mr-2 hover:bg-neo-yellow transition-colors';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => goToPage(currentPage - 1);
    paginationContainer.appendChild(prevBtn);

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'px-3 py-1 border-2 border-black font-bold mx-1 transition-colors ' +
            (i === currentPage ? 'bg-neo-black text-white' : 'bg-white hover:bg-neo-yellow');
        btn.onclick = () => goToPage(i);
        paginationContainer.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.className = 'px-3 py-1 border-2 border-black bg-white font-bold ml-2 hover:bg-neo-yellow transition-colors';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => goToPage(currentPage + 1);
    paginationContainer.appendChild(nextBtn);
}

function goToPage(page) {
    currentPage = page;
    applyFilterAndPagination();
}

// --- MODAL LOGIC ---
function openModal(title, desc, imgSrc) {
    if (!modal || !modalContent || !modalTitle || !modalDesc || !modalImg) {
        return;
    }

    // Reset modal gallery/link state
    modalImages = [];
    modalImageIndex = 0;

    let primaryImage = imgSrc;
    let externalLink = null;

    // Support multiple images + link encoded as "img1,img2,img3|link"
    if (typeof imgSrc === 'string' && imgSrc.includes('|')) {
        const [imagesPart, linkPart] = imgSrc.split('|');
        externalLink = linkPart || null;

        const parts = imagesPart.split(',').map(p => p.trim()).filter(Boolean);
        if (parts.length > 0) {
            modalImages = parts;
            primaryImage = parts[0];
        }
    }

    // Populate content
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImg.src = primaryImage;

    // Update external link (if provided)
    if (modalLink) {
        if (externalLink) {
            modalLink.href = externalLink;
            modalLink.classList.remove('pointer-events-none', 'opacity-50');
        } else {
            modalLink.href = '#';
            modalLink.classList.add('pointer-events-none', 'opacity-50');
        }
    }

    // Show/hide gallery controls
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    const hasGallery = modalImages.length > 1;

    if (prevBtn && nextBtn) {
        if (hasGallery) {
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }
    }

    // Show modal
    modal.classList.remove('hidden');
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons(); // Re-render icons inside the modal
        }
    }, 10);

    document.body.classList.add('modal-open'); // Prevent background scroll
}

function closeModal() {
    if (!modal || !modalContent) {
        return;
    }

    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }, 300);
}

function nextModalImage() {
    if (!modalImages.length) return;
    modalImageIndex = (modalImageIndex + 1) % modalImages.length;
    modalImg.src = modalImages[modalImageIndex];
}

function prevModalImage() {
    if (!modalImages.length) return;
    modalImageIndex = (modalImageIndex - 1 + modalImages.length) % modalImages.length;
    modalImg.src = modalImages[modalImageIndex];
}


