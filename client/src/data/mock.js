export const brands = [
    { id: 1, name: "Patanjali Aastha", slug: "patanjali-aastha", image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=400", description: "Premium Pooja Materials" },
    { id: 2, name: "Sri Sri Tattva", slug: "sri-sri-tattva", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400", description: "Ayurvedic Medicine & Grocery" },
    { id: 3, name: "Keya Gourmet", slug: "keya", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400", description: "Gourmet Spices & Seasonings" },
    { id: 4, name: "Himgold Masale", slug: "himgold-masale", image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=400", description: "Authentic Himalayan Spices" },
    { id: 5, name: "Sifi Prakash Namkeen", slug: "sifi-prakash", image: "https://images.unsplash.com/photo-1612185287702-8f192945d447?auto=format&fit=crop&q=80&w=400", description: "Traditional Indian Snacks" },
    { id: 6, name: "Basic Ayurveda", slug: "basic-ayurveda", image: "https://images.unsplash.com/photo-1632054636923-d3cb8539e089?auto=format&fit=crop&q=80&w=400", description: "Pure Ayurvedic Juices" },
    { id: 7, name: "Vevida Juices", slug: "vevida", image: "https://images.unsplash.com/photo-1613478223719-2ab80260f423?auto=format&fit=crop&q=80&w=400", description: "Fresh & Natural Fruit Juices" },
];

export const categories = [
    { id: 1, name: "Pooja Items", slug: "pooja-items", image: "https://images.unsplash.com/photo-1602752250186-b4850d9994d5?auto=format&fit=crop&q=80&w=500", count: "150+" },
    { id: 2, name: "Ayurveda", slug: "ayurveda", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500", count: "80+" },
    { id: 3, name: "Spices", slug: "spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500", count: "200+" },
    { id: 4, name: "Snacks", slug: "snacks", image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=500", count: "50+" },
    { id: 5, name: "Beverages", slug: "beverages", image: "https://images.unsplash.com/photo-1613478223719-2ab80260f423?auto=format&fit=crop&q=80&w=500", count: "120+" },
];

export const products = [
    {
        id: 101,
        name: "Patanjali Aastha Agarbatti - Rose Luxury",
        category: "Pooja Items",
        brand: "Patanjali Aastha",
        retail_price: 25,
        bulk_price: 18,
        moq: 120,
        stock: 5000,
        rating: 4.8,
        reviews: 240,
        image_url: "https://images.unsplash.com/photo-1627483262769-04d0a140141f?auto=format&fit=crop&q=80&w=500",
        description: "Premium quality rose fragrance incense sticks for daily pooja. Long lasting aroma that purifies the environment."
    },
    {
        id: 102,
        name: "Sri Sri Tattva Pure Himalayan Honey",
        category: "Ayurveda",
        brand: "Sri Sri Tattva",
        retail_price: 210,
        bulk_price: 175,
        moq: 24,
        stock: 1200,
        rating: 4.9,
        reviews: 512,
        image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500",
        description: "100% pure natural honey processed with high quality standards. Rich in antioxidants."
    },
    {
        id: 103,
        name: "Himgold Kitchen King Masala",
        category: "Spices",
        brand: "Himgold Masale",
        retail_price: 120,
        bulk_price: 95,
        moq: 50,
        stock: 2000,
        rating: 4.6,
        reviews: 128,
        image_url: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=500",
        description: "Authentic blend of Himalayan spices for a rich taste in every dish."
    },
    {
        id: 104,
        name: "Sifi Prakash Special Mix Namkeen",
        category: "Snacks",
        brand: "Sifi Prakash Namkeen",
        retail_price: 65,
        bulk_price: 48,
        moq: 60,
        stock: 800,
        rating: 4.0,
        reviews: 86,
        image_url: "https://images.unsplash.com/photo-1612185287702-8f192945d447?auto=format&fit=crop&q=80&w=500",
        description: "Spicy and crunchy namkeen mix perfect for tea time."
    },
    {
        id: 105,
        name: "Keya Oregano & Chili Flakes Combo",
        category: "Spices",
        brand: "Keya Gourmet",
        retail_price: 145,
        bulk_price: 110,
        moq: 36,
        stock: 1500,
        rating: 4.9,
        reviews: 320,
        image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500",
        description: "Gourmet herbs to elevate your Italian dishes. Premium quality dried herbs."
    },
    {
        id: 106,
        name: "Vevida Fresh Alphonso Mango Juice",
        category: "Beverages",
        brand: "Vevida Juices",
        retail_price: 180,
        bulk_price: 140,
        moq: 12,
        stock: 900,
        rating: 4.7,
        reviews: 156,
        image_url: "https://images.unsplash.com/photo-1613478223719-2ab80260f423?auto=format&fit=crop&q=80&w=500",
        description: "No added sugar, 100% natural fruit juice. Real taste of mangoes."
    },
    {
        id: 107,
        name: "Basic Ayurveda Wheat Grass Juice",
        category: "Ayurveda",
        brand: "Basic Ayurveda",
        retail_price: 250,
        bulk_price: 190,
        moq: 12,
        stock: 450,
        rating: 4.5,
        reviews: 92,
        image_url: "https://images.unsplash.com/photo-1632054636923-d3cb8539e089?auto=format&fit=crop&q=80&w=500",
        description: "High potency wheat grass juice for detoxification and energy."
    }
];
