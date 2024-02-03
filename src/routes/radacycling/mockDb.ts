import { baseImageRoute } from "./stores"

// Categories
type Cat = {
    id: number
    imageSrc: string;
    imageAlt: string;
    name: string;
};

export let categories: Cat[] = [
    {
        id: 0,
        imageSrc: 'demo/category_man.webp',
        imageAlt: 'Products For Men',
        name: 'Men',
    },
    {
        id: 1,
        imageSrc: 'demo/category_woman.webp',
        imageAlt: 'Products For Women',
        name: 'Women',
    },
];


// Products
export type Product = {
    id: number,
    name: string,
    description: string,
    details: TableEntry[],
    imageSrc: string,
    imgHoverSrc: string | undefined,
    imageAlt: string,
    price: string,
    oldPrice: string | undefined,
    versions: Version[] | undefined,
    href: string,
}
type Version = {
    imageSrc: string,
    imgHoverSrc: string | undefined,
    imageAlt: string,
    hrefParam: string,
}
type TableEntry = {
    label: string;
    value: string;
};

export let storage: Record<string, Product> = {
    "jersey2024": {
        id: 0,
        name: "Jersey 2024",
        description: "Unleash your cycling potential with the 'Jersey 2024'! Crafted for supreme comfort and performance, this jersey combines breathable fabric with a sleek design. Its vibrant colors ensure visibility, while the ergonomic fit provides unmatched mobility. Perfect for both casual rides and competitive races. Elevate your ride today!",
        details: [
            { label: 'Material', value: 'High-Quality, Breathable Polyester' },
            { label: 'Color', value: 'Vibrant Blue' },
            { label: 'Size Availability', value: 'XS, S, M, L, XL, XXL' },
            { label: 'Fit Type', value: 'Ergonomic, Race Fit' },
            { label: 'Features', value: 'Quick-Dry, UV Protection, Anti-Sweat' },
            { label: 'Warranty', value: "1 Year Manufacturer's Warranty" },
            { label: 'Care Instructions', value: 'Machine Washable, Do Not Iron' },
        ],
        imageSrc: "Jersey2024Red.webp",
        imgHoverSrc: "Jersey2024RedBig.webp",
        imageAlt: "Red Jersey 2024",
        price: "$89.97",
        oldPrice: "$125.00",
        versions: [
            {
                imageSrc: "Jersey2024Red.webp",
                imgHoverSrc: "Jersey2024RedBig.webp",
                imageAlt: "View Red Jersey 2024",
                hrefParam: "red",
            },
            {
                imageSrc: "Jersey2024Blue.webp",
                imgHoverSrc: "cremalleraJersey.webp",
                imageAlt: "View Blue Jersey 2024",
                hrefParam: "blue",
            },
        ],
        href: "jersey-2024",
    },
    "cyclingBib": {
        id: 1,
        name: "Cycling Bib 2024",
        description: "Experience the pinnacle of comfort with the Cycling Bib 2024. Engineered for endurance, its sleek design offers a second-skin fit, while advanced fabrics provide optimal breathability. Available in red or blue, it's the pro choice for serious cyclists. Elevate your ride for just $99.97.",
        details: [
            { label: 'Material', value: 'Premium Lycra for stretch and comfort' },
            { label: 'Chamois', value: 'Multi-density, contoured foam padding' },
            { label: 'Leg Grippers', value: 'Silicone dots for secure fit' },
            { label: 'Stitching', value: 'Flatlock seams to prevent chafing' },
            { label: 'Straps', value: 'Mesh for breathability and support' },
            { label: 'Aerodynamics', value: 'Wind tunnel tested design' },
            { label: 'Durability', value: 'Reinforced stitching at stress points' },
            { label: 'UV Protection', value: 'UPF 50+ sun protection' },
            { label: 'Care Instructions', value: 'Machine wash cold, hang to dry' },
        ],
        imageSrc: "CyclingBib2024.webp",
        imgHoverSrc: "bibFocus.webp",
        imageAlt: "Cycling Bib 2024",
        price: "$99.97",
        oldPrice: undefined,
        versions: [
            {
                imageSrc: "CyclingBib2024.webp",
                imgHoverSrc: "bibFocus.webp",
                imageAlt: "View Red Cycling Bib 2024",
                hrefParam: "red",
            },
            {
                imageSrc: "CyclingBib2024Blue.webp",
                imgHoverSrc: "bibFocus.webp",
                imageAlt: "View Blue Cycling Bib 2024",
                hrefParam: "blue",
            },
        ],
        href: "cycling-bib-2024",
    },
    "bibPlusJerseys": {
        id: 2,
        name: "Bib + Jersey + Free Socks",
        description: "Score the ultimate cycling trio with 'Bib + Jersey + Free Socks'! At just $219.97, enjoy professional-grade comfort and unbeatable style. This exclusive offer bundles sleek aerodynamics, breathability, and a complimentary touch of coziness for your feet. Upgrade your ride in one go!",
        details: [
            { "label": "Material", "value": "Technical Fabric, Moisture-Wicking" },
            { "label": "Bib Material", "value": "Compression Lycra for Support and Performance" },
            { "label": "Jersey Fit", "value": "Form-Fitting, Aerodynamic Cut" },
            { "label": "Sock Fabric", "value": "Breathable, Anti-Bacterial Yarn" },
            { "label": "Package Includes", "value": "1 Bib, 1 Jersey, 1 Pair of Socks" },
            { "label": "Comfort", "value": "Chamois Padding in Bib, Flat Seams to Prevent Chafing" },
            { "label": "Durability", "value": "Reinforced Stitching for Longevity" },
            { "label": "UV Protection", "value": "UPF 50+ Sun Protection" },
            { "label": "Warranty", "value": "2 Years Manufacturer's Warranty" },
            { "label": "Care Instructions", "value": "Machine Washable, Air Dry Recommended" },
        ],
        imageSrc: "1BibPlus2Jerseys.webp",
        imgHoverSrc: "radimir.jpg",
        imageAlt: "Offer: 1 Bib Plus 1 Jersey Plus Free Socks",
        price: "$219.97",
        oldPrice: "$280.00",
        versions: undefined,
        href: "bib-plus-jerseys",
    },
    "radaSocks": {
        id: 3,
        name: "RADA Socks",
        details: [
            { label: 'Material', value: 'Premium Soft Cotton Blend' },
            { label: 'Size', value: 'One Size Fits Most' },
            { label: 'Height', value: 'Crew Cut Length' },
            { label: 'Thickness', value: 'Medium Cushioning for Comfort' },
            { label: 'Features', value: 'Reinforced Heel & Toe, Arch Support' },
            { label: 'Packaging', value: 'Eco-Friendly, Biodegradable Bag' },
            { label: 'Care Instructions', value: 'Machine Wash Cold, Tumble Dry Low' },
        ],
        description: "Step into comfort with RADA Socks — where coziness meets style. These premium socks hug your feet with softness while offering a snug fit, perfect for any adventure. At just $16.00, they're a steal from their usual $25.00. Upgrade your sock drawer and walk in a cloud of comfort!",
        imageSrc: "RadaSocks.webp",
        imgHoverSrc: undefined,
        imageAlt: "RADA Socks",
        price: "$16.00",
        oldPrice: "$25.00",
        versions: undefined,
        href: "rada-socks",
    },
}


//Reviews
export type Review = {
    productId: number,
    date: string,
    text: string,
    name: string,
    imageSrc: string,
    rating: number,
}
export let reviews: Review[] = [
    // Jersey
    {
        productId: 0,
        date: '01-20-2024',
        text:
            'Nice color and good fabric quality. This is the perfect size and the blue version matches my style perfectly.',
        name: 'kylejameson',
        imageSrc: '/images/lawyers/Alejandro_Rodriguez.jpg',
        rating: 5,
    },
    {
        productId: 0,
        date: '01-25-2024',
        text:
            'Absolutely love the new Jersey 2024, the red color is vibrant and it feels very comfortable to wear.',
        name: 'sarahc',
        imageSrc: '/images/lawyers/Sofia_Lindström.jpg',
        rating: 5,
    },
    {
        productId: 0,
        date: '02-01-2024',
        text:
            'The Jersey 2024 is amazing. It fits true to size and is very stylish for any event.',
        name: 'markuslee',
        imageSrc: '/images/lawyers/Brian_Mitchell.jpg',
        rating: 5,
    },
    {
        productId: 0,
        date: '02-05-2024',
        text:
            'Great jersey, the material is high-quality and the blue is just the right shade. Highly recommend!',
        name: 'annak',
        imageSrc: '/images/lawyers/Emily_Davis.jpg',
        rating: 5,
    },
    {
        productId: 0,
        date: '02-10-2024',
        text:
            'Picked up the Jersey 2024 for my workout sessions, and it’s been fantastic. Breathable and flexible!',
        name: 'lucas98',
        imageSrc: '/images/lawyers/Marcus_Turner.jpg',
        rating: 5,
    },

    // Cycling Bib
    {
        productId: 1,
        date: '03-01-2024',
        text:
            'The Cycling Bib 2024 is a game-changer. The fit is exceptional, and it provides the comfort needed on long rides. Top-notch quality!',
        name: 'michaelsmith',
        imageSrc: '/images/lawyers/Brian_Mitchell.jpg',
        rating: 5,
    },
    {
        productId: 1,
        date: '03-04-2024',
        text:
            'Just finished a century ride with the Cycling Bib 2024, and I couldn’t be happier. Supportive, stylish, and the blue color is stunning!',
        name: 'julie_w',
        imageSrc: '/images/lawyers/Sofia_Lindström.jpg',
        rating: 5,
    },
    {
        productId: 1,
        date: '03-07-2024',
        text:
            'The red Cycling Bib 2024 fits like a glove and breathes so well. It\'s my new go-to for all my cycling tours.',
        name: 'daveanderson',
        imageSrc: '/images/lawyers/Rahul_Patel.jpg',
        rating: 4,
    },
    {
        productId: 1,
        date: '03-10-2024',
        text:
            'Incredible comfort and sleek design! The Cycling Bib 2024 has made my rides more enjoyable. Highly recommend it to any cyclist!',
        name: 'lindseyb',
        imageSrc: '/images/lawyers/Ji-Yeon_Kim.jpg',
        rating: 4,
    },

    // Bib + Jersey + Socks Offer
    {
        productId: 2,
        date: '01-30-2024',
        text:
            'The comfort level of the Bib + Jersey combo is unparalleled, and the free socks are a delightful bonus! Worth every penny.',
        name: 'emilywright',
        imageSrc: '/images/lawyers/Emily_Davis.jpg',
        rating: 5,
    },
    {
        productId: 2,
        date: '02-15-2024',
        text:
            'Unbeatable deal! The jersey fits like a second skin, and the bibs are just the right amount of snug. Plus, free socks - amazing!',
        name: 'jordanm',
        imageSrc: '/images/lawyers/Brian_Mitchell.jpg',
        rating: 5,
    },
    {
        productId: 2,
        date: '02-20-2024',
        text:
            'Fantastic set for any cyclist! The materials are top-notch and they look professional. The socks are the cherry on top.',
        name: 'sophiag',
        imageSrc: '/images/lawyers/Ji-Yeon_Kim.jpg',
        rating: 4,
    },
    {
        productId: 2,
        date: '02-28-2024',
        text:
            'Just did a century ride in my new Bib + Jersey, and they performed excellently. The socks kept my feet comfy throughout.',
        name: 'liammurphy',
        imageSrc: '/images/lawyers/Marcus_Turner.jpg',
        rating: 5,
    },


    // Rada Socks
    {
        productId: 3,
        date: '03-01-2024',
        text: 'These RADA Socks are a game-changer! Super comfortable for my daily runs and stylish enough for casual wear.',
        name: 'julianv',
        imageSrc: '/images/lawyers/Marcus_Turner.jpg',
        rating: 5,
    },
    {
        productId: 3,
        date: '03-03-2024',
        text: 'I was skeptical about the price, but these socks are worth every penny. They feel like walking on clouds!',
        name: 'emilyrose',
        imageSrc: '/images/lawyers/Ji-Yeon_Kim.jpg',
        rating: 4,
    },
    {
        productId: 3,
        date: '03-05-2024',
        text: 'Bought these for my hiking trips, and they’ve been fantastic. No blisters, and my feet stay dry!',
        name: 'mikejones',
        imageSrc: '/images/lawyers/Brian_Mitchell.jpg',
        rating: 4,
    },
    {
        productId: 3,
        date: '03-07-2024',
        text: 'The comfort level of RADA Socks is unbeatable. Plus, they look great with all my shoes!',
        name: 'anna_k',
        imageSrc: '/images/lawyers/Emily_Davis.jpg',
        rating: 4,
    },
];


// Cart
export let deliveryFee = 8.18;
export let cartItems = [
    {
        id: 1,
        name: 'Jersey 2024',
        details: 'Red Jersey 2024',
        quantity: 1,
        price: 89.97,
        imageUrl: `${baseImageRoute}/Resources/Jersey2024RedBig.webp`,
    },
    {
        id: 2,
        name: 'Cycling Bib 2024',
        details: 'Cycling Bib 2024',
        quantity: 1,
        price: 99.97,
        imageUrl: `${baseImageRoute}/Resources/bibFocus.webp`,
    },
    {
        id: 3,
        name: 'Bib + Jersey + Free Socks',
        details: 'Offer: 1 Bib Plus 1 Jersey Plus Free Socks',
        quantity: 1,
        price: 219.97,
        imageUrl: `${baseImageRoute}/Resources/1BibPlus2Jerseys.webp`,
    },
    {
        id: 4,
        name: 'RADA Socks',
        details: 'RADA Socks',
        quantity: 1,
        price: 16.00,
        imageUrl: `${baseImageRoute}/Resources/RadaSocks.webp`,
    }
]