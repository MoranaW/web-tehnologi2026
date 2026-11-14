document.addEventListener('DOMContentLoaded', () => {
    const selectedDish = {
        soup: null,
        main: null,
        drink: null
    };

    const hiddenInputs = {
        soup: document.getElementById('selected-soup-input'),
        main: document.getElementById('selected-main-input'),
        drink: document.getElementById('selected-drink-input')
    };

    const orderDisplay = {
        soup: document.getElementById('order-soup'),
        main: document.getElementById('order-main'),
        drink: document.getElementById('order-drink')
    };

    const totalCostContainer = document.getElementById('order-total-container');
    const totalPriceElement = document.getElementById('order-total-price');

    function renderMenu() {
        const categories = {
            soup: document.querySelector('#soup-grid'),
            main: document.querySelector('#main-grid'),
            drink: document.querySelector('#drink-grid')
        };

        Object.values(categories).forEach(container => {
            if (container) container.innerHTML = '';
        });

        const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));

        sortedDishes.forEach(dish => {
            const container = categories[dish.category];
            if (!container) return;

            const card = document.createElement('div');
            card.className = 'dish-card';
            card.setAttribute('data-dish', dish.keyword);

            if (selectedDish[dish.category] && selectedDish[dish.category].keyword === dish.keyword) {
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

        ['soup', 'main', 'drink'].forEach(cat => {
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