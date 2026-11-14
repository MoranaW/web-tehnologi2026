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
    const orderForm = document.querySelector('.order-section .order-form');

    function showNotification(message) {
        const existingModal = document.querySelector('.modal-notification');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'modal-notification';

        const content = document.createElement('div');
        content.className = 'modal-content';

        const text = document.createElement('p');
        text.textContent = message;

        const button = document.createElement('button');
        button.className = 'modal-btn';
        button.textContent = 'Окей';

        button.addEventListener('click', () => {
            modal.remove();
        });

        content.appendChild(text);
        content.appendChild(button);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    function validateLunchComposition() {
        const soup = selectedDish.soup;
        const main = selectedDish.main;
        const salad = selectedDish.salad;
        const drink = selectedDish.drink;
        const dessert = selectedDish.dessert;

        const hasSoup = soup !== null;
        const hasMain = main !== null;
        const hasSalad = salad !== null;
        const hasDrink = drink !== null;
        const hasDessert = dessert !== null;

        const totalSelected = [hasSoup, hasMain, hasSalad, hasDrink, hasDessert].filter(Boolean).length;

        if (totalSelected === 0) {
            showNotification('Ничего не выбрано. Выберите блюда для заказа');
            return false;
        }

        const combo1 = hasSoup && hasMain && hasSalad && hasDrink;
        const combo2 = hasSoup && hasMain && hasDrink;
        const combo3 = hasSoup && hasSalad && hasDrink;
        const combo4 = hasMain && hasSalad && hasDrink;
        const combo5 = hasMain && hasDrink;

        if (!(combo1 || combo2 || combo3 || combo4 || combo5)) {
            if ((hasDrink || hasDessert) && !hasSoup && !hasMain && !hasSalad) {
                showNotification('Выберите главное блюдо');
                return false;
            }

            if (hasSalad && !hasSoup && !hasMain) {
                showNotification('Выберите суп или главное блюдо');
                return false;
            }

            if (hasSoup && !hasMain && !hasSalad) {
                showNotification('Выберите главное блюдо/салат/стартер');
                return false;
            }

            if (!hasDrink) {
                showNotification('Выберите напиток');
                return false;
            }

            showNotification('Неполный комплект ланча');
            return false;
        }

        return true;
    }

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            if (!validateLunchComposition()) {
                e.preventDefault();
            }
        });

        orderForm.addEventListener('reset', () => {
            Object.keys(selectedDish).forEach(cat => {
                selectedDish[cat] = null;
                if (hiddenInputs[cat]) hiddenInputs[cat].value = '';
            });
            Object.keys(activeFilters).forEach(cat => {
                activeFilters[cat] = null;
            });
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            renderMenu();
            updateOrderSummary();
        });
    }

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