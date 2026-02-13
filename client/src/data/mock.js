export const brands = [
    { id: 1, name: "Patanjali Aastha", slug: "patanjali-aastha", image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=200", description: "Premium Pooja Materials" },
    { id: 2, name: "Sri Sri Tattva", slug: "sri-sri-tattva", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=200", description: "Ayurvedic Medicine & Grocery" },
    { id: 3, name: "Keya", slug: "keya", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200", description: "Gourmet Spices & Seasonings" },
    { id: 4, name: "Himgold Masale", slug: "himgold-masale", image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=200", description: "Authentic Himalayan Spices" },
    { id: 5, name: "Sifi Prakash Namkeen", slug: "sifi-prakash", image: "https://images.unsplash.com/photo-1612185287702-8f192945d447?auto=format&fit=crop&q=80&w=200", description: "Traditional Indian Snacks" },
    { id: 6, name: "Basic Ayurveda", slug: "basic-ayurveda", image: "https://images.unsplash.com/photo-1632054636923-d3cb8539e089?auto=format&fit=crop&q=80&w=200", description: "Pure Ayurvedic Juices" },
];

export const categories = [
    { id: 1, name: "Pooja Items", slug: "pooja-items", image: "https://images.unsplash.com/photo-1602752250186-b4850d9994d5?auto=format&fit=crop&q=80&w=500", count: "150+" },
    { id: 2, name: "Ayurveda", slug: "ayurveda", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500", count: "80+" },
    { id: 3, name: "Spices", slug: "spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500", count: "200+" },
    { id: 4, name: "Snacks", slug: "snacks", image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=500", count: "50+" },
    { id: 5, name: "Grocery", slug: "grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=500", count: "500+" },
];

export const products = [
    {
        id: 101,
        name: "Patanjali Aastha Agarbatti - Rose",
        category: "Pooja Items",
        brand: "Patanjali Aastha",
        retailPrice: 15,
        bulkPrice: 12,
        moq: 120,
        stock: 5000,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1627483262769-04d0a140141f?auto=format&fit=crop&q=80&w=500",
        images: [
            "https://images.unsplash.com/photo-1627483262769-04d0a140141f?auto=format&fit=crop&q=80&w=500",
            "https://images.unsplash.com/photo-1602752250186-b4850d9994d5?auto=format&fit=crop&q=80&w=500"
        ],
        description: "Premium quality rose fragrance incense sticks for daily pooja. Long lasting aroma that purifies the environment."
    },
    {
        id: 102,
        name: "Sri Sri Tattva Pure Honey",
        category: "Ayurveda",
        brand: "Sri Sri Tattva",
        retailPrice: 180,
        bulkPrice: 155,
        moq: 24,
        stock: 1200,
        rating: 4.8,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500",
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500"
        ],
        description: "100% pure natural honey processed with high quality standards. Rich in antioxidants and immunity boosting properties."
    },
    {
        id: 103,
        name: "Himgold Turmeric Powder",
        category: "Spices",
        brand: "Himgold Masale",
        retailPrice: 90,
        bulkPrice: 75,
        moq: 50,
        stock: 2000,
        rating: 4.3,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=500",
        images: [
            "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=500"
        ],
        description: "Rich in curcumin, authentic color and aroma for your dishes. Sourced from the finest turmeric roots."
    },
    {
        id: 104,
        name: "Sifi Prakash Namkeen Mix",
        category: "Snacks",
        brand: "Sifi Prakash Namkeen",
        retailPrice: 45,
        bulkPrice: 38,
        moq: 60,
        stock: 800,
        rating: 4.0,
        reviews: 56,
        image: "https://images.unsplash.com/photo-1612185287702-8f192945d447?auto=format&fit=crop&q=80&w=500",
        images: [
            "https://images.unsplash.com/photo-1612185287702-8f192945d447?auto=format&fit=crop&q=80&w=500"
        ],
        description: "Spicy and crunchy namkeen mix perfect for tea time. Made with traditional spices and high quality oil."
    },
    {
        id: 105,
        name: "Keya Chaat Masala",
        category: "Spices",
        brand: "Keya",
        retailPrice: 65,
        bulkPrice: 52,
        moq: 36,
        stock: 1500,
        rating: 4.6,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500",
        images: [
            "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500"
        ],
        description: "Authentic blend of spices to add zing to your fruits and salads. No added preservatives."
    },
    {
        id: 106,
        name: "Basic Ayurveda Amla Juice",
        category: "Ayurveda",
        brand: "Basic Ayurveda",
        retailPrice: 220,
        bulkPrice: 180,
        moq: 12,
        stock: 400,
        rating: 4.4,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1632054636923-d3cb8539e089?auto=format&fit=crop&q=80&w=500",
        images: [
            "https://images.unsplash.com/photo-1632054636923-d3cb8539e089?auto=format&fit=crop&q=80&w=500"
        ],
        description: "Pure Amla juice for better immunity and digestion. Cold pressed to retain maximum nutrients."
    },
    {
        id: 107,
        name: "Patanjali Dhoop Cones",
        category: "Pooja Items",
        brand: "Patanjali Aastha",
        retailPrice: 35,
        bulkPrice: 28,
        moq: 100,
        stock: 3000,
        rating: 4.2,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1602752250186-b4850d9994d5?auto=format&fit=crop&q=80&w=500",
        images: [
            "https://images.unsplash.com/photo-1602752250186-b4850d9994d5?auto=format&fit=crop&q=80&w=500"
        ],
        description: "Sandalwood scented dhoop cones for spiritual atmosphere. 100% natural ingredients."
    },
    {
        id: 108,
        name: "Fortune Basmati Rice",
        category: "Grocery",
        brand: "Fortune",
        retailPrice: 550,
        bulkPrice: 480,
        moq: 10,
        stock: 500,
        rating: 4.7,
        reviews: 512,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500",
        images: [
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500"
        ],
        description: "Premium long grain organic basmati rice 5kg pack. Aged for 2 years for fluffiest grains."
    }
];
