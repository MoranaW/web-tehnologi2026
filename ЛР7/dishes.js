
let dishes = [];

async function loadDishes() {
    try {
        const url = 'https://api.github.com/repos/MoranaW/web-tehnologi2026/contents/%D0%9B%D0%A07/dishes.json?ref=main';

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github+json'
            }
        });

        if (!response.ok) {
            throw new Error(
                `Ошибка GitHub API: ${response.status}`
            );
        }

        const fileData = await response.json();

        const binary = atob(fileData.content.replace(/\s/g, ''));

        const bytes = Uint8Array.from(
            binary,
            char => char.charCodeAt(0)
        );

        const jsonText = new TextDecoder().decode(bytes);

        dishes = JSON.parse(jsonText);

        console.log('Блюда загружены:', dishes);

        return dishes;

    } catch (error) {
        console.error('Ошибка загрузки блюд:', error);
        throw error;
    }
}
