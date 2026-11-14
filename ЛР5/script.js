document.addEventListener('DOMContentLoaded', () => {
    const selectedDish = {
        soup: null,
        main: null,
        salad: null,
        drink: null,
        dessert: null
    };

    const activeFilters = {
        soup: null,
        main: null,
        salad: null,
        drink: null,
        dessert: null
    };

    const hiddenInputs = {
        soup: document.getElementById('selected-soup-input'),
        main: document.getElementById('selected-main-input'),
        salad: document.getElementById('selected-salad-input'),
        drink: document.getElementById('selected-drink-input'),
        dessert: document.getElementById('selected-dessert-input')
    };

    const orderDisplay = {
        soup: document.getElementById('order-soup'),
        main: document.getElementById('order-main'),
        salad: document.getElementById('order-salad'),
        drink: document.getElementById('order-drink'),
        dessert: document.getElementById('order-dessert')
    };

    const totalCostContainer = document.getElementById('order-total-container');
    const totalPriceElement = document.getElementById('order-total-price');

    function renderMenu() {
        const categories = {
            soup: document.querySelector('#soup-grid'),
            main: document.querySelector('#main-grid'),
            salad: document.querySelector('#salad-grid'),
            drink: document.querySelector('#drink-grid'),
            dessert: document.querySelector('#dessert-grid')
        };

        Object.keys(categories).forEach(cat => {
            const container = categories[cat];
            if (!container) return;
            container.innerHTML = '';

            let filteredDishes = dishes.filter(dish => dish.category === cat);

            if (activeFilters[cat]) {
                filteredDishes = filteredDishes.filter(dish => dish.kind === activeFilters[cat]);
            }

            const sortedDishes = [...filteredDishes].sort((a, b) => a.name.localeCompare(b.name));

            sortedDishes.forEach(dish => {
                const card = document.createElement('div');
                card.className = 'dish-card';
                card.setAttribute('data-dish', dish.keyword);

                if (selectedDish[cat] && selectedDish[cat].keyword === dish.keyword) {
                    card.classList.add('selected');
                }

                card.innerHTML = `
                    <img src="${dish.image}" alt="${dish.name}">
                    <p class="price">${dish.price} ₽</p>
                    <p class="name">${dish.name}</p>
                    <p class="weight">${dish.count}</p>
                    <button type="button" data-keyword="${dish.keyword}">Добавить</button>
                `;

                container.appendChild(card);
            });
        });

        document.querySelectorAll('.dish-card button').forEach(button => {
            button.addEventListener('click', (e) => {
                const keyword = e.target.getAttribute('data-keyword');
                handleDishSelection(keyword);
            });
        });
    }

    function handleDishSelection(keyword) {
        const dish = dishes.find(d => d.keyword === keyword);
        if (!dish) return;

        selectedDish[dish.category] = dish;

        if (hiddenInputs[dish.category]) {
            hiddenInputs[dish.category].value = dish.keyword;
        }

        renderMenu();
        updateOrderSummary();
    }

    function updateOrderSummary() {
        let totalCost = 0;
        let hasAnySelection = false;

        ['soup', 'main', 'salad', 'drink', 'dessert'].forEach(cat => {
            const dish = selectedDish[cat];
            const displayEl = orderDisplay[cat];
            const dishInfoEl = displayEl ? displayEl.querySelector('.dish-info') : null;

            if (displayEl) {
                displayEl.style.display = 'block';
            }

            if (dish) {
                hasAnySelection = true;
                totalCost += dish.price;
                if (dishInfoEl) {
                    dishInfoEl.textContent = `${dish.name} — ${dish.price} ₽`;
                }
            } else {
                if (dishInfoEl) {
                    if (cat === 'drink') {
                        dishInfoEl.textContent = 'Напиток не выбран';
                    } else if (cat === 'dessert') {
                        dishInfoEl.textContent = 'Десерт не выбран';
                    } else if (cat === 'salad') {
                        dishInfoEl.textContent = 'Салат не выбран';
                    } else {
                        dishInfoEl.textContent = 'Блюдо не выбрано';
                    }
                }
            }
        });

        if (!hasAnySelection) {
            if (totalCostContainer) totalCostContainer.style.display = 'none';
        } else {
            if (totalCostContainer) totalCostContainer.style.display = 'block';
            if (totalPriceElement) totalPriceElement.textContent = `${totalCost} ₽`;
        }
    }

    document.querySelectorAll('.menu-section').forEach(section => {
        const category = section.getAttribute('data-category');
        const filterButtons = section.querySelectorAll('.filter-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const kind = btn.getAttribute('data-kind');

                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                    activeFilters[category] = null;
                } else {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeFilters[category] = kind;
                }

                renderMenu();
            });
        });
    });

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .dish-card.selected {
            border: 2px solid #4361ee;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
        }
    `;
    document.head.appendChild(styleSheet);

    renderMenu();
    updateOrderSummary();
});