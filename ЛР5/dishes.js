const dishes = [
    {
        keyword: "borsch",
        name: "Наваристый борщ со сметаной и зеленью",
        price: 250,
        category: "soup",
        kind: "meat",
        count: "350 г",
        image: "https://avatars.mds.yandex.net/i?id=558f17ae6cb41583a533935ca01ed9ddffd3d1fd-4554806-images-thumbs&n=13"
    },
    {
        keyword: "cream_soup",
        name: "Крем-суп из шампиньонов",
        price: 280,
        category: "soup",
        kind: "veg",
        count: "300 г",
        image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        keyword: "solyanka",
        name: "Солянка мясная сборная",
        price: 290,
        category: "soup",
        kind: "meat",
        count: "350 г",
        image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "fish_soup",
        name: "Уха рыбацкая из лосося и судака",
        price: 320,
        category: "soup",
        kind: "fish",
        count: "350 г",
        image: "https://avatars.mds.yandex.net/i?id=9a0d778413d0b50f7464458f9ca6ad1ffcd98dbd-4592885-images-thumbs&n=13"
    },
    {
        keyword: "gazpacho",
        name: "Холодный суп Гаспачо",
        price: 260,
        category: "soup",
        kind: "veg",
        count: "300 г",
        image: "https://avatars.mds.yandex.net/i?id=6b3f12e92dd55a308e9a08fc5462542e3196d48f-4328551-images-thumbs&n=13"
    },
    {
        keyword: "miso_soup",
        name: "Японский суп Мисо с лососем",
        price: 300,
        category: "soup",
        kind: "fish",
        count: "300 г",
        image: "https://avatars.mds.yandex.net/i?id=37cb96dc3d08229a5fd9c77e1ba7d246fe97e9a7-5171547-images-thumbs&n=13"
    },
    {
        keyword: "steak",
        name: "Стейк из лосося с травами",
        price: 650,
        category: "main",
        kind: "fish",
        count: "300 г",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "pasta",
        name: "Итальянская паста Карбонара в сливочном соусе",
        price: 400,
        category: "main",
        kind: "meat",
        count: "350 г",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "cutlet",
        name: "Котлета по-киевски с пюре",
        price: 450,
        category: "main",
        kind: "meat",
        count: "400 г",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "dorada",
        name: "Дорадо на гриле с лимоном",
        price: 590,
        category: "main",
        kind: "fish",
        count: "350 г",
        image: "https://avatars.mds.yandex.net/i?id=06a0f577441a67d9f993f2b5fbbfe7b9a8b7c8a0-12422009-images-thumbs&n=13"
    },
    {
        keyword: "veg_risotto",
        name: "Ризотто с овощами и грибами",
        price: 380,
        category: "main",
        kind: "veg",
        count: "350 г",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "veg_lasagna",
        name: "Овощная лазанья",
        price: 390,
        category: "main",
        kind: "veg",
        count: "350 г",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "caesar_fish",
        name: "Цезарь с креветками",
        price: 420,
        category: "salad",
        kind: "fish",
        count: "250 г",
        image: "https://avatars.mds.yandex.net/i?id=158d8bd542121002f342cbbf8d2c9d583055fc73-4338366-images-thumbs&n=13"
    },
    {
        keyword: "caesar_meat",
        name: "Цезарь с курицей",
        price: 380,
        category: "salad",
        kind: "meat",
        count: "250 г",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "greek",
        name: "Греческий салат с сыром фета",
        price: 320,
        category: "salad",
        kind: "veg",
        count: "250 г",
        image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        keyword: "veg_bruschetta",
        name: "Брускетта с томатами и базиликом",
        price: 270,
        category: "salad",
        kind: "veg",
        count: "180 г",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "fresh_salad",
        name: "Салат из свежих овощей с оливковым маслом",
        price: 250,
        category: "salad",
        kind: "veg",
        count: "200 г",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "caprese",
        name: "Салат Капрезе с моцареллой и томатами",
        price: 350,
        category: "salad",
        kind: "veg",
        count: "220 г",
        image: "https://avatars.mds.yandex.net/i?id=6ad7d00ccbfc93b100e16fb9c71a8e9c90314e30-5707862-images-thumbs&n=13"
    },
    {
        keyword: "mors",
        name: "Морс клюквенный домашний",
        price: 120,
        category: "drink",
        kind: "cold",
        count: "500 мл",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "lemonade",
        name: "Лимонад цитрусовый",
        price: 150,
        category: "drink",
        kind: "cold",
        count: "500 мл",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "iced_tea",
        name: "Холодный чай с персиком",
        price: 140,
        category: "drink",
        kind: "cold",
        count: "500 мл",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "tea",
        name: "Чай зеленый с жасмином",
        price: 100,
        category: "drink",
        kind: "hot",
        count: "400 мл",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "black_tea",
        name: "Черный чай с бергамотом",
        price: 100,
        category: "drink",
        kind: "hot",
        count: "400 мл",
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "cappuccino",
        name: "Кофе Капучино",
        price: 180,
        category: "drink",
        kind: "hot",
        count: "300 мл",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "macaron",
        name: "Набор макарун (3 шт.)",
        price: 220,
        category: "dessert",
        kind: "small",
        count: "100 г",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "cupcake",
        name: "Кекс с шоколадом",
        price: 160,
        category: "dessert",
        kind: "small",
        count: "80 г",
        image: "https://images.pexels.com/photos/3650438/pexels-photo-3650438.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        keyword: "cookie",
        name: "Печенье с шоколадной крошкой",
        price: 130,
        category: "dessert",
        kind: "small",
        count: "90 г",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк Нью-Йорк",
        price: 320,
        category: "dessert",
        kind: "medium",
        count: "150 г",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "tiramisu",
        name: "Классический тирамису",
        price: 340,
        category: "dessert",
        kind: "medium",
        count: "160 г",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
    },
    {
        keyword: "blin",
        name: "Блины с кремом чиз",
        price: 380,
        category: "dessert",
        kind: "large",
        count: "200 г",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80"
    }
];