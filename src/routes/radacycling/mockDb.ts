import toast from "svelte-french-toast";
import { activeSNavMenu, baseRoute, type CartItem, cartItems, dictionary } from "./stores"
import { get } from 'svelte/store';

let storedDictionary = get(dictionary)

// Categories
export type Category = {
    id: number

    imageSrc: string;
    smallImageSrc?: string;
    imageAlt: string;

    name: string;
    description?: string;
    href: string;

    genderSpecific?: boolean;
    sizeAgnostic?: boolean;
};

type CatalogSection = {
    name: string;
    categoryIds: number[];
    categories?: Category[]; // Optional, will be filled by denormalize function
};


export type CatalogCategory = {
    name: string;
    featuredCategoryId: number;
    featuredCategory?: Category; // Optional, will be filled by the denormalize function
    sections: CatalogSection[];
}


export let featuredCategories: number[] = [7, 15]

export let categories: Category[] = [
    {
        id: 0,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cyclist wearing a short sleeve jersey",
        name: "Short Sleeve Jerseys",
        description: "Experience unparalleled comfort and aerodynamic performance with our short sleeve jerseys. Designed for the heat of competition and the freedom of the open road.",
        href: "short-sleeve-jerseys",
        genderSpecific: true,
    },
    {
        id: 1,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cyclist wearing a long sleeve jersey",
        name: "Long Sleeve Jerseys",
        description: "Gear up for cooler rides with our long sleeve jerseys. Offering extra protection without sacrificing breathability or comfort.",
        href: "long-sleeve-jerseys",
        genderSpecific: true,
    },
    {
        id: 2,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cyclist with cycling bib shorts",
        name: "Bibs",
        description: "Elevate your ride with our cycling bibs. Engineered for long-lasting comfort and support, ensuring you stay focused on the ride ahead.",
        href: "bibs",
        genderSpecific: true,
    },
    {
        id: 3,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Casual shirt for cyclists",
        name: "Shirts",
        description: "Discover our range of casual cycling shirts, blending style and functionality. Perfect for the café stop or the commute.",
        href: "shirts",
        genderSpecific: true,
    },
    {
        id: 4,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cyclist wearing cycling shorts",
        name: "Shorts",
        description: "Find your perfect fit with our cycling shorts, designed for ultimate comfort and durability, mile after mile.",
        href: "shorts",
        genderSpecific: true,
    },
    {
        id: 5,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cyclist wearing a jacket",
        name: "Jackets & Vests",
        description: "Brave the elements with our jackets and vests. From windproof to waterproof, layer up in style without compromising on performance.",
        href: "jackets-vests",
        genderSpecific: true,
    },
    {
        id: 6,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cycling accessories",
        name: "Accessories",
        description: "Complete your kit with our cycling accessories. Everything you need from gloves to caps, ensuring every ride is a great one.",
        href: "accessories",
        genderSpecific: true,
    },
    {
        id: 7,
        imageSrc: "demo/category_man.webp",
        smallImageSrc: "demo/man-small.webp",
        imageAlt: "Complete collection of men's cycling wear",
        name: "Men",
        description: "Discover our comprehensive collection of men's cycling wear. Tailored for performance, comfort, and style.",
        href: "men",
        genderSpecific: false,
    },
    {
        id: 8,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cycling wear for hot conditions",
        name: "Hot",
        description: "Embrace summer with garments designed to keep you cool and comfortable when it’s scorching. Crafted with breathable fabrics for optimal ventilation, and that wick sweat away.",
        href: "hot-conditions",
        genderSpecific: true,
    },
    {
        id: 9,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cycling wear for cold conditions",
        name: "Cold",
        description: "Conquer the cold with our cycling wear designed for chilly rides. Stay warm without the bulk, thanks to innovative thermal technologies and layering solutions.",
        href: "cold-conditions",
        genderSpecific: true,
    },
    {
        id: 10,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Cycling wear for wet conditions",
        name: "Wet",
        description: "Don’t let rain stop your ride. Our wet conditions gear is waterproof and breathable, keeping you dry and comfortable in any downpour.",
        href: "wet-conditions",
        genderSpecific: true,
    },
    {
        id: 11,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Featured basics of cycling wear",
        name: "Basics",
        description: "Get started with our essentials. Quality basics that every cyclist needs, from reliable jerseys to versatile shorts.",
        href: "basics",
        genderSpecific: true,
    },
    {
        id: 12,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Featured 360-degree range of cycling wear",
        name: "360",
        description: "Experience our 360-degree range, where innovation meets the open road. Cutting-edge materials and designs that move with you.",
        href: "360-range",
        genderSpecific: true,
    },
    {
        id: 13,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Featured pinnacle series of cycling wear",
        name: "Pinnacle",
        description: "Reach the summit with Pinnacle. Our premium line features the best in performance, comfort, and style, for serious cyclists who demand the best.",
        href: "pinnacle-series",
        genderSpecific: true,
    },
    {
        id: 14,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "Gift cards for cycling wear",
        name: "Gift Cards",
        description: "The perfect gift for the cyclist in your life. Give them the choice with our gift cards, redeemable across our entire range.",
        href: "gift-cards",
        genderSpecific: false,
        sizeAgnostic: true,
    },
    {
        id: 15,
        imageSrc: "demo/category_woman.webp",
        smallImageSrc: "demo/woman-small.webp",
        imageAlt: "Complete collection of women's cycling wear",
        name: "Women",
        description: "Explore our full range of women's cycling wear, designed by women for women. Where comfort meets style, empowering your ride.",
        href: "women",
        genderSpecific: false,
    },
    {
        id: 16,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "XS Size Cycling Gear",
        name: "XS",
        description: "Discover our selection of XS size cycling gear, perfectly tailored for those who prefer a snug fit. Ideal for maximizing performance and comfort.",
        href: "size-xs",
        genderSpecific: false,
    },
    {
        id: 17,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "S Size Cycling Gear",
        name: "S",
        description: "Explore our range of S size cycling wear, designed for optimal movement and aerodynamics. Perfect for cyclists who value precision and fit.",
        href: "size-s",
        genderSpecific: false,
    },
    {
        id: 18,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "M Size Cycling Gear",
        name: "M",
        description: "Browse our collection of M size cycling apparel, offering a balance of comfort and performance for the enthusiastic cyclist.",
        href: "size-m",
        genderSpecific: false,
    },
    {
        id: 19,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "L Size Cycling Gear",
        name: "L",
        description: "Check out our selection of L size cycling clothing, engineered for durability and freedom of movement. Gear up for any challenge.",
        href: "size-l",
        genderSpecific: false,
    },
    {
        id: 20,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "XL Size Cycling Gear",
        name: "XL",
        description: "Find your perfect fit with our XL size cycling gear, designed for extra comfort without compromising on performance.",
        href: "size-xl",
        genderSpecific: false,
    },
    {
        id: 21,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: "XXL Size Cycling Gear",
        name: "XXL",
        description: "Explore our XXL size cycling wear for superior comfort and style. Ideal for those who seek extra room and ease.",
        href: "size-xxl",
        genderSpecific: false,
    },
]

export let categoryMenus: CatalogCategory[] = [
    {
        name: "men",
        featuredCategoryId: 7,
        sections: [
            {
                name: "apparel",
                categoryIds: [
                    1, 2, 3, 4, 5, 6
                ]
            },
            {
                name: "conditions",
                categoryIds: [
                    8, 9, 10
                ]
            },
            {
                name: "featured",
                categoryIds: [
                    11, 12, 13, 14
                ]
            }
        ]
    },
    {
        name: "women",
        featuredCategoryId: 15,
        sections: [
            {
                name: "apparel",
                categoryIds: [
                    1, 2, 3, 4, 5, 6
                ]
            },
            {
                name: "conditions",
                categoryIds: [
                    8, 9, 10
                ]
            },
            {
                name: "featured",
                categoryIds: [
                    11, 12, 13, 14
                ]
            }
        ]
    }
];

export function denormalizeCatalogCategory(catalogCategory: CatalogCategory): CatalogCategory {
    // Denormalize each section by mapping the category IDs to their full data
    const denormalizedSections: CatalogSection[] = catalogCategory.sections.map(section => {
        const denormalizedCategoryIds = section.categoryIds.map(categoryId => {
            // Find the full category data by its ID
            const categoryData = categories.find(category => category.id === categoryId);
            // If the category isn't found (which shouldn't happen), throw an error
            if (!categoryData) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }
            return categoryData;
        });

        // Return the section with the denormalized categories included
        return {
            ...section,
            categories: denormalizedCategoryIds
        };
    });

    // Find the full category data for the featuredCategoryId
    const featuredCategory = categories.find(category => category.id === catalogCategory.featuredCategoryId);
    if (!featuredCategory) {
        throw new Error(`Featured category with ID ${catalogCategory.featuredCategoryId} not found`);
    }

    // Construct and return the full denormalized catalog category object
    return {
        ...catalogCategory,
        featuredCategory, // Add the full featuredCategory object
        sections: denormalizedSections
    };
}

export function denormalizeCategories(ids: number[]): Category[] {
    const denormalizedCategoryIds = ids.map(categoryId => {
        // Find the full category data by its ID
        const categoryData = categories.find(category => category.id === categoryId);
        // If the category isn't found (which shouldn't happen), throw an error
        if (!categoryData) {
            throw new Error(`Category with ID ${categoryId} not found`);
        }
        return categoryData;
    });

    // Return an object with the denormalized categories.
    return denormalizedCategoryIds;
}


export function findCatalogCategoryByName(name: string): CatalogCategory | undefined {
    return categoryMenus.find(categoryMenu => categoryMenu.name === name);
}

export function findCatalogSectionByName(sectionName: string): CatalogSection | undefined {
    // Flatten the array of sections from all categories
    const allSections: CatalogSection[] = categoryMenus.flatMap(category => category.sections);

    // Find the first section that matches the sectionName
    const matchingSection = allSections.find(section => section.name === sectionName);

    return matchingSection;
}

export function findCategoryByHref(href: string): Category | undefined {
    return categories.find(category => category.href === href);
}

export function findCategoryById(id: number): Category | undefined {
    return categories.find(category => category.id === id);
}

export function getCategoryIdsFromHrefs(hrefs: string[]): number[] {
    return hrefs.map(href => {
        const category = findCategoryByHref(href);
        if (!category) {
            throw new Error(`Category not found for href: ${href}`);
        }
        return category.id;
    });
}

export function getCategoryHrefsFromIds(ids: number[]): string[] {
    return ids.map(id => {
        const category = findCategoryById(id);
        if (!category) {
            throw new Error(`Category not found for id: ${id}`);
        }
        return category.href;
    });
}

export function getCategoryNamesFromIds(ids: number[]): string[] {
    return ids.map(id => {
        const category = findCategoryById(id);
        if (!category) {
            throw new Error(`Category not found for id: ${id}`);
        }
        return category.name;
    });
}

export type MenuItem = {
    name: string;
    href?: string;
    icon?: string;
    classname?: string;
    callback?: () => void;

    iconStyle?: string;
};

export const mainMenu: MenuItem[] = [
    {
        name: storedDictionary.home,
        classname: 'baseButton extraSpaceLink',
        icon: 'home',
        href: baseRoute,
    },
    {
        name: storedDictionary.mens,
        classname: 'baseButton extraSpaceLink',
        icon: 'man',
        iconStyle: 'font-size: 2em; margin-left: -8px;',
        callback: () => generateSectionsMenu('men'),
    },
    {
        name: storedDictionary.womens,
        classname: 'baseButton extraSpaceLink',
        icon: 'woman',
        iconStyle: 'font-size: 2em; margin-left: -8px;',
        callback: () => generateSectionsMenu(`women`),
    },
    {
        name: storedDictionary.custom,
        classname: 'baseButton extraSpaceLink',
        icon: 'mail',
        href: `${baseRoute}/custom`,
    },
    {
        name: storedDictionary.ourWork,
        classname: 'baseButton extraSpaceLink',
        icon: 'people',
        href: `${baseRoute}/our-work`,
    },
    {
        name: storedDictionary.myAccount,
        classname: 'baseButton extraSpaceLink',
        icon: 'person-circle',
        href: `${baseRoute}/my-account`,
    },
];

export function generateSectionsMenu(catalogCategoryName: string): void {
    const catalogCategory = findCatalogCategoryByName(catalogCategoryName);

    if (!catalogCategory) {
        console.error(`Catalog category ${catalogCategoryName} not found`);
        return;
    }

    const sectionsMenu: MenuItem[] = [
        {
            name: catalogCategoryName,
            classname: "baseButton backButton",
            callback: () => renderMenu(mainMenu),
        },
        ...catalogCategory.sections.map(section => ({
            name: section.name,
            callback: () => generateCategoryMenu(section.name, catalogCategory.name),
        })),
    ];

    renderMenu(sectionsMenu);
}

export function generateCategoryMenu(sectionName: string, catalogCategoryName: string): void {
    // Find the catalog category by name
    const catalogCategory = findCatalogCategoryByName(catalogCategoryName);
    if (!catalogCategory) {
        console.error(`Catalog category ${catalogCategoryName} not found`);
        return;
    }

    // Denormalize the catalog category to include category objects
    const denormalizedCatalogCategory = denormalizeCatalogCategory(catalogCategory);

    // Find the section within the catalog category
    const section = denormalizedCatalogCategory.sections.find(s => s.name === sectionName);
    if (!section || !section.categories) {
        console.error(`Section ${sectionName} not found in catalog category ${catalogCategoryName}`);
        return;
    }

    // Map the categories to MenuItem[]
    const categoryMenu: MenuItem[] = [
        {
            name: sectionName,
            classname: "baseButton backButton",
            callback: () => generateSectionsMenu(catalogCategoryName),
        },
        ...section.categories.map(category => ({
            name: category.name,
            href: `${baseRoute}/catalog/${category.href}/${category.genderSpecific
                ? catalogCategoryName
                : ''}`,
        })),
    ];

    // Render the new menu
    renderMenu(categoryMenu)
}

export function renderMenu(menu: MenuItem[]) {
    activeSNavMenu.set(menu)
}


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
    categoryIds: number[]
}
export type Version = {
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
        categoryIds: [0, 1, 3, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19, 20],
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
        imageSrc: "Resources/Jersey2024Red.webp",
        imgHoverSrc: "Resources/Jersey2024RedBig.webp",
        imageAlt: "Red Jersey 2024",
        price: "$89.97",
        oldPrice: "$125.00",
        versions: [
            {
                imageSrc: "Resources/Jersey2024Red.webp",
                imgHoverSrc: "Resources/Jersey2024RedBig.webp",
                imageAlt: "View Red Jersey 2024",
                hrefParam: "red",
            },
            {
                imageSrc: "Resources/Jersey2024Blue.webp",
                imgHoverSrc: "Resources/cremalleraJersey.webp",
                imageAlt: "View Blue Jersey 2024",
                hrefParam: "blue",
            },
        ],
        href: "jersey-2024",
    },
    "cyclingBib": {
        id: 1,
        name: "Cycling Bib 2024",
        categoryIds: [2, 4, 7, 8, 10, 11, 12, 13, 15, 17, 19, 21],
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
        imageSrc: "Resources/CyclingBib2024.webp",
        imgHoverSrc: "Resources/bibFocus.webp",
        imageAlt: "Cycling Bib 2024",
        price: "$99.97",
        oldPrice: undefined,
        versions: [
            {
                imageSrc: "Resources/CyclingBib2024.webp",
                imgHoverSrc: "Resources/bibFocus.webp",
                imageAlt: "View Red Cycling Bib 2024",
                hrefParam: "red",
            },
            {
                imageSrc: "Resources/CyclingBib2024Blue.webp",
                imgHoverSrc: "Resources/bibFocus.webp",
                imageAlt: "View Blue Cycling Bib 2024",
                hrefParam: "blue",
            },
        ],
        href: "cycling-bib-2024",
    },
    "bibPlusJerseys": {
        id: 2,
        name: "Bib + Jersey + Free Socks",
        categoryIds: [0, 1, 2, 3, 4, 7, 8, 10, 11, 12, 13, 15, 19],
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
        imageSrc: "Resources/1BibPlus2Jerseys.webp",
        imgHoverSrc: "Resources/radimir.jpg",
        imageAlt: "Offer: 1 Bib Plus 1 Jersey Plus Free Socks",
        price: "$219.97",
        oldPrice: "$280.00",
        versions: undefined,
        href: "bib-plus-jerseys",
    },
    "radaSocks": {
        id: 3,
        name: "RADA Socks",
        categoryIds: [6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21],
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
        imageSrc: "Resources/RadaSocks.webp",
        imgHoverSrc: undefined,
        imageAlt: "RADA Socks",
        price: "$16.00",
        oldPrice: "$25.00",
        versions: undefined,
        href: "rada-socks",
    },
}

export function findProductsByCategoryIds(categoryIds: number[]): Product[] {
    // Convert the storage object to an array of products
    const products = Object.values(storage);

    // Filter products that include all of the specified category IDs
    const matchingProducts = products.filter(product =>
        categoryIds.every(id => product.categoryIds.includes(id))
    );

    return matchingProducts;
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


// Database Interaction Functions

export type DenormalizedCartItem = {
    productId: number,
    quantity: number,
    name: string,
    imageSrc: string,
    description: string,
    price: string,
    totalItemPrice: number,
    href: string,
}

export function denormalizeCartItems(cartItems: CartItem[], storage: Record<string, Product>): DenormalizedCartItem[] {
    return cartItems.map((item) => {
        const product = Object.values(storage).find(product => product.id === item.productId);
        if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
        }
        const itemPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        const totalItemPrice = itemPrice * item.quantity;

        return {
            productId: item.productId,
            quantity: item.quantity,
            name: product.name,
            imageSrc: product.imageSrc,
            description: product.description,
            price: product.price,
            totalItemPrice: totalItemPrice,
            href: product.href
        };
    });
}

// Adds a product to the cart or updates the quantity if the product already exists.
export function addToCart(productId: number, quantity: number, name: string): void {
    cartItems.update(items => {
        const existingItemIndex = items.findIndex(item => item.productId === productId);
        if (existingItemIndex !== -1) {
            // Update quantity of an existing item
            const updatedItems = [...items];
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity,
            };
            toast.success("Item quantity has been updated.",
                {
                    style:
                        "max-width: 60%; text-align: center; box-shadow: 2px 2px 20px var(--content-5)",
                    position: "bottom-center"
                })
            return updatedItems;
        } else {
            // Add new item to the cart
            toast.success(`"${name}" has been added to the cart!`,
                {
                    style:
                        "max-width: 60%; text-align: center; box-shadow: 2px 2px 20px var(--content-5)",
                    position: "bottom-center"
                })
            return [...items, { productId, quantity }];
        }
    });
}

export function removeFromCart(productId: number, name: string): void {
    cartItems.update(items => items.filter(item => item.productId !== productId));

    toast.success(`"${name}" has been removed from the cart.`)
}


// Previous work

export type craftItem = {
    src: string;
    alt: string;
    title: string;
    description: string;
}

export let crafts: craftItem[] = [
    {
        src: `demo/woman-small.webp`,
        alt: 'Cyclist wearing our high-performance jersey',
        title: 'High-Performance Women’s Jersey',
        description:
            'Showcasing our latest in women’s cycling jerseys, this piece combines aerodynamics with unparalleled comfort. Developed in collaboration with professional cyclists, it features breathable, moisture-wicking fabric and a form-fitting design for those who refuse to compromise on performance or style.',
    },
    {
        src: `demo/man-small.webp`,
        alt: 'Cyclist in action wearing our mountain biking gear',
        title: 'All-Terrain Mountain Biking Gear',
        description:
            'Designed for the trails, our all-terrain gear set is built to withstand the most challenging conditions. With reinforced stitching, ample storage for long rides, and integrated protective padding, this gear represents our commitment to combining durability with the freedom of movement.',
    },
    {
        src: `demo/amsterdam-small.webp`,
        alt: 'Urban cyclist apparel by the canals of Amsterdam',
        title: 'Urban Commuter Series',
        description:
            'Inspired by the cycling culture of Amsterdam, our Urban Commuter Series marries functionality with sleek, minimalist design. Waterproof, yet breathable materials and subtle reflective details ensure safety and comfort in urban environments, making every commute a statement.',
    },
    {
        src: `demo/women.webp`,
        alt: 'Eco-friendly cycling wear collection',
        title: 'Eco-Friendly Collection',
        description:
            'Our Eco-Friendly Collection is a testament to our commitment to sustainability. Made from recycled materials without compromising on performance, these pieces offer cyclists a way to support the environment while enjoying their ride. Join us on the journey towards a greener future.',
    },
];