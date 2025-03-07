import toast from "svelte-french-toast";
import { activeSNavMenu, baseRoute, type CartItem, cartItems, dictionary, language } from "./stores"
import { get } from 'svelte/store';

let storedDictionary = get(dictionary)
let storedLanguage = get(language)

export type translatableContent = { en: string; es: string; }

// #region Categories
export type Category = {
    id: number

    imageSrc: string;
    smallImageSrc?: string;
    imageAlt: translatableContent;

    name: translatableContent;
    description?: translatableContent;
    href: string;

    genderSpecific?: boolean;
    sizeAgnostic?: boolean;
};

type CatalogSection = {
    name: translatableContent;
    categoryIds: number[];
    categories?: Category[]; // Optional, will be filled by denormalize function
};

export type CatalogCategory = {
    id: number;
    href: string;
    name: translatableContent;
    featuredCategoryId: number | undefined;
    featuredCategory?: Category; // Optional, will be filled by the denormalize function
    sections: CatalogSection[];
}


export let featuredCategories: number[] = [7, 15]

export let categories: Category[] = [
    {
        id: 0,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cyclist wearing a short sleeve jersey", es: "Ciclista con camiseta de manga corta" },
        name: { en: "Short Sleeve Jerseys", es: "Camisetas de Manga Corta" },
        description: { en: "Experience unparalleled comfort and aerodynamic performance with our short sleeve jerseys. Designed for the heat of competition and the freedom of the open road.", es: "Experimenta un confort y rendimiento aerodinámico incomparables con nuestras camisetas de manga corta. Diseñadas para el calor de la competencia y la libertad de la carretera abierta." },
        href: "short-sleeve-jerseys",
        genderSpecific: true,
    },
    {
        id: 1,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cyclist wearing a long sleeve jersey", es: "Ciclista con camiseta de manga larga" },
        name: { en: "Jerseys", es: "Camisetas" },
        description: { en: "Gear up for cooler rides with our long sleeve jerseys. Offering extra protection without sacrificing breathability or comfort.", es: "Prepárate para rutas más frescas con nuestras camisetas de manga larga. Ofrecen protección adicional sin sacrificar la transpirabilidad o el confort." },
        href: "long-sleeve-jerseys",
        genderSpecific: true,
    },
    {
        id: 2,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cyclist with cycling bib shorts", es: "Ciclista con pantalones de ciclismo" },
        name: { en: "Bibs", es: "Pantalones" },
        description: { en: "Elevate your ride with our cycling bibs. Engineered for long-lasting comfort and support, ensuring you stay focused on the ride ahead.", es: "Eleva tu recorrido con nuestras mallas de ciclismo. Diseñadas para proporcionar confort y soporte duraderos, asegurando que te mantengas concentrado en el camino por delante." },
        href: "bibs",
        genderSpecific: true,
    },
    {
        id: 3,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Casual shirt for cyclists", es: "Camisa casual para ciclistas" },
        name: { en: "Shirts", es: "Camisas" },
        description: { en: "Discover our range of casual cycling shirts, blending style and functionality. Perfect for the café stop or the commute.", es: "Descubre nuestra gama de camisas de ciclismo casual, que combinan estilo y funcionalidad. Perfectas para la parada en el café o el trayecto." },
        href: "shirts",
        genderSpecific: true,
    },
    {
        id: 4,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cyclist wearing cycling shorts", es: "Ciclista con shorts de ciclismo" },
        name: { en: "Shorts", es: "Shorts" },
        description: { en: "Find your perfect fit with our cycling shorts, designed for ultimate comfort and durability, mile after mile.", es: "Encuentra tu ajuste perfecto con nuestros shorts de ciclismo, diseñados para ofrecer la máxima comodidad y durabilidad, kilómetro tras kilómetro." },
        href: "shorts",
        genderSpecific: true,
    },
    {
        id: 5,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cyclist wearing a jacket", es: "Ciclista con chaqueta" },
        name: { en: "Jackets & Vests", es: "Chaquetas y Chalecos" },
        description: { en: "Brave the elements with our jackets and vests. From windproof to waterproof, layer up in style without compromising on performance.", es: "Enfréntate a los elementos con nuestras chaquetas y chalecos. Desde a prueba de viento hasta impermeables, vístete por capas con estilo sin comprometer el rendimiento." },
        href: "jackets-vests",
        genderSpecific: true,
    },
    {
        id: 6,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cycling accessories", es: "Accesorios para ciclismo" },
        name: { en: "Accessories", es: "Accesorios" },
        description: { en: "Complete your kit with our cycling accessories. Everything you need from gloves to caps, ensuring every ride is a great one.", es: "Completa tu equipo con nuestros accesorios para ciclismo. Todo lo que necesitas desde guantes hasta gorras, asegurando que cada salida sea excepcional." },
        href: "accessories",
        genderSpecific: true,
    },
    {
        id: 7,
        imageSrc: "Resources/category_man.webp",
        smallImageSrc: "Resources/category_man.webp",
        imageAlt: { en: "Complete collection of men's cycling wear", es: "Colección completa de ropa de ciclismo para hombres" },
        name: { en: "Men", es: "Hombres" },
        description: { en: "Discover our comprehensive collection of men's cycling wear. Tailored for performance, comfort, and style.", es: "Descubre nuestra colección completa de ropa de ciclismo para hombres. Diseñada para rendimiento, confort y estilo." },
        href: "men",
        genderSpecific: false,
    },
    {
        id: 8,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cycling wear for hot conditions", es: "Ropa de ciclismo para condiciones cálidas" },
        name: { en: "Hot", es: "Calor" },
        description: { en: "Embrace summer with garments designed to keep you cool and comfortable when it’s scorching. Crafted with breathable fabrics for optimal ventilation, and that wick sweat away.", es: "Afronta el verano con prendas diseñadas para mantenerte fresco y cómodo cuando hace mucho calor. Confeccionadas con tejidos transpirables para una ventilación óptima que aleja el sudor." },
        href: "hot-conditions",
        genderSpecific: true,
    },
    {
        id: 9,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cycling wear for cold conditions", es: "Ropa de ciclismo para condiciones frías" },
        name: { en: "Cold", es: "Frío" },
        description: { en: "Conquer the cold with our cycling wear designed for chilly rides. Stay warm without the bulk, thanks to innovative thermal technologies and layering solutions.", es: "Conquista el frío con nuestra ropa de ciclismo diseñada para paseos fríos. Mantente caliente sin volumen gracias a tecnologías térmicas innovadoras y soluciones de capas." },
        href: "cold-conditions",
        genderSpecific: true,
    },
    {
        id: 10,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Cycling wear for wet conditions", es: "Ropa de ciclismo para condiciones húmedas" },
        name: { en: "Wet", es: "Húmedo" },
        description: { en: "Don’t let rain stop your ride. Our wet conditions gear is waterproof and breathable, keeping you dry and comfortable in any downpour.", es: "No dejes que la lluvia detenga tu paseo. Nuestro equipo para condiciones húmedas es impermeable y transpirable, manteniéndote seco y cómodo en cualquier aguacero." },
        href: "wet-conditions",
        genderSpecific: true,
    },
    {
        id: 11,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Featured basics of cycling wear", es: "Básicos destacados de ropa de ciclismo" },
        name: { en: "Basics", es: "Básicos" },
        description: { en: "Get started with our essentials. Quality basics that every cyclist needs, from reliable jerseys to versatile shorts.", es: "Comienza con nuestros esenciales. Básicos de calidad que todo ciclista necesita, desde camisetas confiables hasta shorts versátiles." },
        href: "basics",
        genderSpecific: true,
    },
    {
        id: 12,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Featured 360-degree range of cycling wear", es: "Gama destacada de 360 grados de ropa de ciclismo" },
        name: { en: "360", es: "360" },
        description: { en: "Experience our 360-degree range, where innovation meets the open road. Cutting-edge materials and designs that move with you.", es: "Experimenta nuestra gama de 360 grados, donde la innovación se encuentra con la carretera abierta. Materiales y diseños de vanguardia que se mueven contigo." },
        href: "360-range",
        genderSpecific: true,
    },
    {
        id: 13,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Featured pinnacle series of cycling wear", es: "Serie cumbre destacada de ropa de ciclismo" },
        name: { en: "Pinnacle", es: "Cumbre" },
        description: { en: "Reach the summit with Pinnacle. Our premium line features the best in performance, comfort, and style, for serious cyclists who demand the best.", es: "Alcanza la cima con Cumbre. Nuestra línea premium ofrece lo mejor en rendimiento, confort y estilo, para ciclistas serios que exigen lo mejor." },
        href: "pinnacle-series",
        genderSpecific: true,
    },
    {
        id: 14,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "Gift cards for cycling wear", es: "Tarjetas de regalo para ropa de ciclismo" },
        name: { en: "Gift Cards", es: "Tarjetas de Regalo" },
        description: { en: "The perfect gift for the cyclist in your life. Give them the choice with our gift cards, redeemable across our entire range.", es: "El regalo perfecto para el ciclista en tu vida. Dales la elección con nuestras tarjetas de regalo, canjeables en toda nuestra gama." },
        href: "gift-cards",
        genderSpecific: false,
        sizeAgnostic: true,
    },
    {
        id: 15,
        imageSrc: "Resources/category_woman.webp",
        smallImageSrc: "Resources/category_woman.webp",
        imageAlt: { en: "Complete collection of women's cycling wear", es: "Colección completa de ropa de ciclismo para mujeres" },
        name: { en: "Women", es: "Mujeres" },
        description: { en: "Explore our full range of women's cycling wear, designed by women for women. Where comfort meets style, empowering your ride.", es: "Explora nuestra gama completa de ropa de ciclismo para mujeres, diseñada por mujeres para mujeres. Donde el confort se encuentra con el estilo, empoderando tu paseo." },
        href: "women",
        genderSpecific: false,
    },
    {
        id: 16,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "XS Size Cycling Gear", es: "Equipo de ciclismo talla XS" },
        name: { en: "XS", es: "XS" },
        description: { en: "Discover our selection of XS size cycling gear, perfectly tailored for those who prefer a snug fit. Ideal for maximizing performance and comfort.", es: "Descubre nuestra selección de equipo de ciclismo talla XS, perfectamente adaptado para aquellos que prefieren un ajuste ceñido. Ideal para maximizar rendimiento y comodidad." },
        href: "size-xs",
        genderSpecific: false,
    },
    {
        id: 17,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "S Size Cycling Gear", es: "Equipo de ciclismo talla S" },
        name: { en: "S", es: "S" },
        description: { en: "Explore our range of S size cycling wear, designed for optimal movement and aerodynamics. Perfect for cyclists who value precision and fit.", es: "Explora nuestra gama de ropa de ciclismo talla S, diseñada para un movimiento óptimo y aerodinámica. Perfecto para ciclistas que valoran la precisión y el ajuste." },
        href: "size-s",
        genderSpecific: false,
    },
    {
        id: 18,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "M Size Cycling Gear", es: "Equipo de ciclismo talla M" },
        name: { en: "M", es: "M" },
        description: { en: "Browse our collection of M size cycling apparel, offering a balance of comfort and performance for the enthusiastic cyclist.", es: "Consulta nuestra colección de ropa de ciclismo talla M, que ofrece un equilibrio entre comodidad y rendimiento para el ciclista entusiasta." },
        href: "size-m",
        genderSpecific: false,
    },
    {
        id: 19,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "L Size Cycling Gear", es: "Equipo de ciclismo talla L" },
        name: { en: "L", es: "L" },
        description: { en: "Check out our selection of L size cycling clothing, engineered for durability and freedom of movement. Gear up for any challenge.", es: "Revisa nuestra selección de ropa de ciclismo talla L, diseñada para durabilidad y libertad de movimiento. Prepárate para cualquier desafío." },
        href: "size-l",
        genderSpecific: false,
    },
    {
        id: 20,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "XL Size Cycling Gear", es: "Equipo de ciclismo talla XL" },
        name: { en: "XL", es: "XL" },
        description: { en: "Find your perfect fit with our XL size cycling gear, designed for extra comfort without compromising on performance.", es: "Encuentra tu ajuste perfecto con nuestro equipo de ciclismo talla XL, diseñado para un confort extra sin comprometer el rendimiento." },
        href: "size-xl",
        genderSpecific: false,
    },
    {
        id: 21,
        imageSrc: "demo/amsterdam.webp",
        smallImageSrc: "demo/amsterdam-small.webp",
        imageAlt: { en: "XXL Size Cycling Gear", es: "Equipo de ciclismo talla XXL" },
        name: { en: "XXL", es: "XXL" },
        description: { en: "Explore our XXL size cycling wear for superior comfort and style. Ideal for those who seek extra room and ease.", es: "Explora nuestra ropa de ciclismo talla XXL para un confort y estilo superiores. Ideal para aquellos que buscan espacio extra y facilidad." },
        href: "size-xxl",
        genderSpecific: false,
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

export function findCatalogCategoryByID(id: number): CatalogCategory | undefined {
    return categoryMenus.find(categoryMenu => categoryMenu.id === id);
}

export function findCatalogSectionByName(sectionName: string): CatalogSection | undefined {
    // Flatten the array of sections from all categories
    const allSections: CatalogSection[] = categoryMenus.flatMap(category => category.sections);

    // Find the first section that matches the sectionName
    const matchingSection = allSections.find(section => section.name[storedLanguage] === sectionName);

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
        return category.name[storedLanguage];
    });
}
// #endregion

// #region Menus
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
        name: storedDictionary.men,
        classname: 'baseButton extraSpaceLink',
        icon: 'man',
        iconStyle: 'font-size: 2em; margin-left: -8px;',
        callback: () => generateSectionsMenu(0),
    },
    {
        name: storedDictionary.women,
        classname: 'baseButton extraSpaceLink',
        icon: 'woman',
        iconStyle: 'font-size: 2em; margin-left: -8px;',
        callback: () => generateSectionsMenu(1),
    },
    {
        name: storedDictionary.custom,
        classname: 'baseButton extraSpaceLink',
        icon: 'mail',
        href: `${baseRoute}/custom`,
    },
    // {
    //     name: storedDictionary.ourWork,
    //     classname: 'baseButton extraSpaceLink',
    //     icon: 'people',
    //     href: `${baseRoute}/our-work`,
    // },
    {
        name: storedDictionary.myAccount,
        classname: 'baseButton extraSpaceLink',
        icon: 'person-circle',
        href: `${baseRoute}/my-account`,
    },
];

export let categoryMenus: CatalogCategory[] = [
    {
        id: 0,
        name: { en: "men", es: "hombres" },
        href: "men",
        featuredCategoryId: undefined,
        sections: [
            {
                name: { en: "apparel", es: "ropa" },
                categoryIds: [
                    1, 2, 6
                ]
            },
            // {
            //     name: { en: "conditions", es: "condiciones" },
            //     categoryIds: [
            //         8, 9, 10
            //     ]
            // },
            // {
            //     name: { en: "featured", es: "destacados" },
            //     categoryIds: [
            //         11, 12, 13, 14
            //     ]
            // }
        ]
    },
    {
        id: 1,
        name: { en: "women", es: "mujeres" },
        href: "women",
        featuredCategoryId: undefined,
        sections: [
            {
                name: { en: "apparel", es: "ropa" },
                categoryIds: [
                    1, 2, 6
                ]
            },
            // {
            //     name: { en: "conditions", es: "condiciones" },
            //     categoryIds: [
            //         8, 9, 10
            //     ]
            // },
            // {
            //     name: { en: "featured", es: "destacados" },
            //     categoryIds: [
            //         11, 12, 13, 14
            //     ]
            // }
        ]
    }
];

export function generateSectionsMenu(catalogCategoryID: number): void {
    const catalogCategory = findCatalogCategoryByID(catalogCategoryID);

    if (!catalogCategory) {
        console.error(`Catalog category ${catalogCategoryID} not found`);
        return;
    }

    const sectionsMenu: MenuItem[] = [
        {
            name: catalogCategory.name[storedLanguage],
            classname: "baseButton backButton",
            callback: () => renderMenu(mainMenu),
        },
        ...catalogCategory.sections.map(section => ({
            name: section.name[storedLanguage],
            callback: () => generateCategoryMenu(section.name[storedLanguage], catalogCategoryID),
        })),
    ];

    renderMenu(sectionsMenu);
}

export function generateCategoryMenu(sectionName: string, catalogCategoryID: number): void {
    // Find the catalog category by name
    const catalogCategory = findCatalogCategoryByID(catalogCategoryID);
    if (!catalogCategory) {
        console.error(`Catalog category ${catalogCategoryID} not found`);
        return;
    }

    // Denormalize the catalog category to include category objects
    const denormalizedCatalogCategory = denormalizeCatalogCategory(catalogCategory);

    // Find the section within the catalog category
    const section = denormalizedCatalogCategory.sections.find(s => s.name[storedLanguage] === sectionName);
    if (!section || !section.categories) {
        console.error(`Section ${sectionName} not found in catalog category ${catalogCategoryID}`);
        return;
    }

    // Map the categories to MenuItem[]
    const categoryMenu: MenuItem[] = [
        {
            name: sectionName,
            classname: "baseButton backButton",
            callback: () => generateSectionsMenu(catalogCategoryID),
        },
        ...section.categories.map(category => ({
            name: category.name[storedLanguage],
            href: `${baseRoute}/catalog/${category.href}/${category.genderSpecific
                ? catalogCategory.href
                : ''}`,
        })),
    ];

    // Render the new menu
    renderMenu(categoryMenu)
}

export function renderMenu(menu: MenuItem[]) {
    activeSNavMenu.set(menu)
}
// #endregion

// #region Products
export type Product = {
    id: string,
    name: translatableContent,
    status: boolean,
    description: translatableContent,
    details: TableEntry[],
    imageSources: string[],
    imageHoverSource: string | null,
    imageAlt: translatableContent,
    price: string,
    oldPrice: string | null,
    mainVersion: boolean,
    versionsIds: string[] | null,
    href: string,
    categoryIds: number[]
}

type TableEntry = {
    label: translatableContent;
    value: translatableContent;
};

export let products: Record<string, Product> = {
    "menjersey": {
        id: "menjersey",
        name: { en: "Men's Jersey", es: "Camiseta Para Hombres" },
        status: true,
        categoryIds: [0, 1, 3, 7, 8, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21],
        description: {
            en: `
                Our Jersey is designed to sit close to the skin, made with a lightweight performance fabric that wicks away moisture, provides added sun protection, breathability, and improved comfort and support.
                <ul style="margin-top: 10px; list-style-position: inside;">
                    <li>High compression silicon waist band ensures it stays in place during performance</li>
                    <li>High stretch and high compression silicon arm gripper</li>
                    <li>Gusseted rear pockets that expand to carry snacks and tools</li>
                    <li>Rear water-resistant storage pocket</li>
                    <li>Concealed zipper</li>
                </ul>
            `,
            es: `
                Nuestra camiseta está diseñada para ajustarse cerca de la piel, fabricada con un tejido de rendimiento ligero que absorbe la humedad, proporciona protección solar adicional, transpirabilidad y mayor comodidad y soporte.
                <ul style="margin-top: 10px; list-style-position: inside;">
                    <li>La banda de cintura de silicona de alta compresión asegura que se mantenga en su lugar durante la actividad</li>
                    <li>Agarre de brazo de alta elasticidad y alta compresión</li>
                    <li>Bolsillos traseros con fuelle que se expanden para llevar bocadillos y herramientas</li>
                    <li>Bolsillo trasero impermeable</li>
                    <li>Cremallera oculta</li>
                </ul>
            `
        },
        details: [
            { label: { en: 'Material', es: 'Material' }, value: { en: 'High-Quality, Breathable Polyester', es: 'Poliéster transpirable de alta calidad' } },
            { label: { en: 'Color', es: 'Color' }, value: { en: 'Vibrant Red', es: 'Rojo vibrante' } },
            { label: { en: 'Size Availability', es: 'Disponibilidad de tallas' }, value: { en: 'XS, S, M, L, XL, XXL', es: 'XS, S, M, L, XL, XXL' } },
            { label: { en: 'Fit Type', es: 'Tipo de ajuste' }, value: { en: 'Ergonomic, Race Fit', es: 'Ajuste ergonómico, de competición' } },
            { label: { en: 'Features', es: 'Características' }, value: { en: 'Quick-Dry, UV Protection, Anti-Sweat', es: 'Secado rápido, protección UV, anti-sudor' } },
            { label: { en: 'Warranty', es: 'Garantía' }, value: { en: "1 Year Manufacturer's Warranty", es: "Garantía de 1 año del fabricante" } },
            { label: { en: 'Care Instructions', es: 'Instrucciones de cuidado' }, value: { en: 'Machine Washable, Do Not Iron', es: 'Lavable a máquina, no planchar' } },
        ],
        imageSources: ["Resources/jersey_men_1.jpeg", "Resources/jersey_men_2.jpeg", "Resources/jersey_men_3.jpeg", "Resources/jersey_men_4.jpeg", "Resources/jersey_men_5.jpeg"],
        imageHoverSource: "Resources/jersey_men_2.jpeg",
        imageAlt: { en: "Red Jersey 2024", es: "Camiseta Roja 2024" },
        price: "$89.99",
        oldPrice: null,
        mainVersion: true,
        versionsIds: null,
        href: "men-jersey",
    },
    "womenjersey": {
        id: "womenjersey",
        name: { en: "Women's Jersey", es: "Camiseta Para Mujeres" },
        status: true,
        categoryIds: [0, 1, 3, 8, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21],
        description: {
            en: `
                Our Jersey is designed to sit close to the skin, made with a lightweight performance fabric that wicks away moisture, provides added sun protection, breathability, and improved comfort and support.
                <ul style="margin-top: 10px; list-style-position: inside;">
                    <li>High compression silicon waist band ensures it stays in place during performance</li>
                    <li>High stretch and high compression silicon arm gripper</li>
                    <li>Gusseted rear pockets that expand to carry snacks and tools</li>
                    <li>Rear water-resistant storage pocket</li>
                    <li>Concealed zipper</li>
                </ul>
            `,
            es: `
                Nuestra camiseta está diseñada para ajustarse cerca de la piel, fabricada con un tejido de rendimiento ligero que absorbe la humedad, proporciona protección solar adicional, transpirabilidad y mayor comodidad y soporte.
                <ul style="margin-top: 10px; list-style-position: inside;">
                    <li>La banda de cintura de silicona de alta compresión asegura que se mantenga en su lugar durante la actividad</li>
                    <li>Agarre de brazo de alta elasticidad y alta compresión</li>
                    <li>Bolsillos traseros con fuelle que se expanden para llevar bocadillos y herramientas</li>
                    <li>Bolsillo trasero impermeable</li>
                    <li>Cremallera oculta</li>
                </ul>
            `
        },
        details: [
            { label: { en: 'Material', es: 'Material' }, value: { en: 'High-Quality, Breathable Polyester', es: 'Poliéster transpirable de alta calidad' } },
            { label: { en: 'Color', es: 'Color' }, value: { en: 'Vibrant Blue', es: 'Azul vibrante' } },
            { label: { en: 'Size Availability', es: 'Disponibilidad de tallas' }, value: { en: 'XS, S, M, L, XL, XXL', es: 'XS, S, M, L, XL, XXL' } },
            { label: { en: 'Fit Type', es: 'Tipo de ajuste' }, value: { en: 'Ergonomic, Race Fit', es: 'Ajuste ergonómico, de competición' } },
            { label: { en: 'Features', es: 'Características' }, value: { en: 'Quick-Dry, UV Protection, Anti-Sweat', es: 'Secado rápido, protección UV, anti-sudor' } },
            { label: { en: 'Warranty', es: 'Garantía' }, value: { en: "1 Year Manufacturer's Warranty", es: "Garantía de 1 año del fabricante" } },
            { label: { en: 'Care Instructions', es: 'Instrucciones de cuidado' }, value: { en: 'Machine Washable, Do Not Iron', es: 'Lavable a máquina, no planchar' } },
        ],
        imageSources: ["Resources/jersey_women_1.jpeg", "Resources/jersey_women_2.jpeg", "Resources/jersey_women_3.jpeg", "Resources/jersey_women_4.jpeg"],
        imageHoverSource: "Resources/jersey_women_2.jpeg",
        imageAlt: { en: "View Blue Jersey 2024", es: "Ver Camiseta Azul 2024" },
        price: "$89.99",
        oldPrice: null,
        mainVersion: true,
        versionsIds: null,
        href: "women-jersey",
    },
    "menbib": {
        id: "menbib",
        name: { en: "Men's Bib", es: "Pantalón de Ciclismo Para Hombres" },
        status: true,
        categoryIds: [2, 4, 7, 8, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21],
        description: {
            en: `
                Our bib shorts are designed with Italian pads and fabrics, offering added levels of comfort and compression. The lightweight, breathable construction of the bib and brace straps minimizes unwanted movement, while maintaining airflow through your body and providing a more comfortable fit during longer rides.
                <ul style="margin-top: 10px; list-style-position: inside;">
                    <li style="margin-bottom: 5px;">We use Elastic Interface ultra-high density inserts made perfectly for road and off-road activities.</li>
                    <li style="margin-bottom: 5px;">The perforations on the surface allow for higher air permeability, resulting in lower skin temperature and reduced moisture.</li>
                    <li style="margin-bottom: 5px;">The ECO Carbonium Flash top fabric combines a special channel structure with the natural antistatic and bacteriostatic properties of the Carbonium thread.</li>
                    <li style="margin-bottom: 5px;">The channel structure, made from extremely soft and recycled polyamide, helps collect, canalize, and expel moisture.</li>
                    <li>Rapid-drying and eco-friendly.</li>
                </ul>
            `,
            es: `
                Nuestro pantalón de ciclismo está diseñado con almohadillas y telas italianas, ofreciendo mayores niveles de comodidad y compresión. La construcción ligera y transpirable de los tirantes minimiza el movimiento no deseado, mientras mantiene el flujo de aire a través de tu cuerpo, proporcionando un ajuste más cómodo durante los recorridos más largos.
                <ul style="margin-top: 10px; list-style-position: inside;">
                    <li style="margin-bottom: 5px;">Usamos insertos de Elastic Interface de ultra alta densidad, perfectamente diseñados para actividades en carretera y fuera de carretera.</li>
                    <li style="margin-bottom: 5px;">Las perforaciones en la superficie permiten una mayor permeabilidad al aire, lo que resulta en una temperatura de la piel más baja y una menor humedad.</li>
                    <li style="margin-bottom: 5px;">La tela superior ECO Carbonium Flash combina una estructura especial de canal con las propiedades antistáticas y bacteriostáticas naturales del hilo Carbonium.</li>
                    <li style="margin-bottom: 5px;">La estructura de canales, hecha de poliamida reciclada y extremadamente suave, ayuda a recolectar, canalizar y expulsar la humedad.</li>
                    <li>Secado rápido y ecológico.</li>
                </ul>
            `
        },
        details: [
            { label: { en: 'Material', es: 'Material' }, value: { en: 'Premium Lycra for stretch and comfort', es: 'Licra premium para elasticidad y comodidad' } },
            { label: { en: 'Chamois', es: 'Badana' }, value: { en: 'Multi-density, contoured foam padding', es: 'Acolchado de espuma contorneado de múltiples densidades' } },
            { label: { en: 'Leg Grippers', es: 'Agarres para piernas' }, value: { en: 'Silicone dots for secure fit', es: 'Puntos de silicona para un ajuste seguro' } },
            { label: { en: 'Stitching', es: 'Costuras' }, value: { en: 'Flatlock seams to prevent chafing', es: 'Costuras flatlock para prevenir rozaduras' } },
            { label: { en: 'Straps', es: 'Tirantes' }, value: { en: 'Mesh for breathability and support', es: 'Malla para transpirabilidad y soporte' } },
            { label: { en: 'Aerodynamics', es: 'Aerodinámica' }, value: { en: 'Wind tunnel tested design', es: 'Diseño probado en túnel de viento' } },
            { label: { en: 'Durability', es: 'Durabilidad' }, value: { en: 'Reinforced stitching at stress points', es: 'Costuras reforzadas en puntos de estrés' } },
            { label: { en: 'UV Protection', es: 'Protección UV' }, value: { en: 'UPF 50+ sun protection', es: 'Protección solar UPF 50+' } },
            { label: { en: 'Care Instructions', es: 'Instrucciones de cuidado' }, value: { en: 'Machine wash cold, hang to dry', es: 'Lavar a máquina en frío, colgar para secar' } },
        ],
        imageSources: ["Resources/bib_men_3.jpeg", "Resources/bib_men_4.jpeg", "Resources/bib_men_5.jpeg"],
        imageHoverSource: "Resources/bib_men_4.jpeg",
        imageAlt: { en: "Red Cycling Bib 2024", es: "Pantalón de Ciclismo Rojo 2024" },
        price: "$109.99",
        oldPrice: null,
        mainVersion: true,
        versionsIds: null,
        href: "men-bib",
    },
    "womenbib": {
        id: "womenbib",
        name: { en: "Women's Bib", es: "Pantalón de Ciclismo Para Mujeres" },
        status: true,
        categoryIds: [2, 4, 8, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21],
        description: {
            en: `
                Our bib shorts are designed with Italian pads and fabrics, offering added levels of comfort and compression. The lightweight, breathable construction of the bib and brace straps minimizes unwanted movement, while maintaining airflow through your body and providing a more comfortable fit during longer rides.
                <ul style="margin-top: 10px; list-style-position: inside;">
                    <li style="margin-bottom: 5px;">We use Elastic Interface ultra-high density inserts made perfectly for road and off-road activities.</li>
                    <li style="margin-bottom: 5px;">The perforations on the surface allow for higher air permeability, resulting in lower skin temperature and reduced moisture.</li>
                    <li style="margin-bottom: 5px;">The ECO Carbonium Flash top fabric combines a special channel structure with the natural antistatic and bacteriostatic properties of the Carbonium thread.</li>
                    <li style="margin-bottom: 5px;">The channel structure, made from extremely soft and recycled polyamide, helps collect, canalize, and expel moisture.</li>
                    <li>Rapid-drying and eco-friendly.</li>
                </ul>
            `,
            es: `
                Nuestro pantalón de ciclismo está diseñado con almohadillas y telas italianas, ofreciendo mayores niveles de comodidad y compresión. La construcción ligera y transpirable de los tirantes minimiza el movimiento no deseado, mientras mantiene el flujo de aire a través de tu cuerpo, proporcionando un ajuste más cómodo durante los recorridos más largos.
                <ul style="margin-top: 10px; list-style-position: inside;">
                    <li style="margin-bottom: 5px;">Usamos insertos de Elastic Interface de ultra alta densidad, perfectamente diseñados para actividades en carretera y fuera de carretera.</li>
                    <li style="margin-bottom: 5px;">Las perforaciones en la superficie permiten una mayor permeabilidad al aire, lo que resulta en una temperatura de la piel más baja y una menor humedad.</li>
                    <li style="margin-bottom: 5px;">La tela superior ECO Carbonium Flash combina una estructura especial de canal con las propiedades antistáticas y bacteriostáticas naturales del hilo Carbonium.</li>
                    <li style="margin-bottom: 5px;">La estructura de canales, hecha de poliamida reciclada y extremadamente suave, ayuda a recolectar, canalizar y expulsar la humedad.</li>
                    <li>Secado rápido y ecológico.</li>
                </ul>
            `
        },
        details: [
            { label: { en: 'Material', es: 'Material' }, value: { en: 'Premium Lycra for stretch and comfort', es: 'Licra premium para elasticidad y comodidad' } },
            { label: { en: 'Chamois', es: 'Badana' }, value: { en: 'Multi-density, contoured foam padding', es: 'Acolchado de espuma contorneado de múltiples densidades' } },
            { label: { en: 'Leg Grippers', es: 'Agarres para piernas' }, value: { en: 'Silicone dots for secure fit', es: 'Puntos de silicona para un ajuste seguro' } },
            { label: { en: 'Stitching', es: 'Costuras' }, value: { en: 'Flatlock seams to prevent chafing', es: 'Costuras flatlock para prevenir rozaduras' } },
            { label: { en: 'Straps', es: 'Tirantes' }, value: { en: 'Mesh for breathability and support', es: 'Malla para transpirabilidad y soporte' } },
            { label: { en: 'Aerodynamics', es: 'Aerodinámica' }, value: { en: 'Wind tunnel tested design', es: 'Diseño probado en túnel de viento' } },
            { label: { en: 'Durability', es: 'Durabilidad' }, value: { en: 'Reinforced stitching at stress points', es: 'Costuras reforzadas en puntos de estrés' } },
            { label: { en: 'UV Protection', es: 'Protección UV' }, value: { en: 'UPF 50+ sun protection', es: 'Protección solar UPF 50+' } },
            { label: { en: 'Care Instructions', es: 'Instrucciones de cuidado' }, value: { en: 'Machine wash cold, hang to dry', es: 'Lavar a máquina en frío, colgar para secar' } },
        ],
        imageSources: ["Resources/bib_women_3.jpeg", "Resources/bib_women_4.jpeg", "Resources/bib_women_5.jpeg"],
        imageHoverSource: "Resources/bib_women_4.jpeg",
        imageAlt: { en: "View Blue Cycling Bib 2024", es: "Ver Pantalón Azul de Ciclismo 2024" },
        price: "$109.99",
        oldPrice: null,
        mainVersion: true,
        versionsIds: null,
        href: "women-bib",
    },
    "radaSocks": {
        id: "radaSocks",
        name: { en: "RADA Socks", es: "Calcetines RADA" },
        status: true,
        categoryIds: [6, 7, 8, 9, 10, 11, 12, 13, 15],
        description: {
            en: `
                The lightweight, breathable material of our RADA sock is equipped with potent moisture-wicking properties to keep your feet comfortable and dry throughout your ride.
            `,
            es: `
                El material ligero y transpirable de nuestro calcetín RADA está equipado con potentes propiedades para absorber la humedad, manteniendo tus pies cómodos y secos durante todo el recorrido.
            `
        },
        details: [
            { label: { en: 'Material', es: 'Material' }, value: { en: 'Premium Soft Cotton Blend', es: 'Mezcla de algodón suave premium' } },
            { label: { en: 'Size', es: 'Tamaño' }, value: { en: 'One Size Fits Most', es: 'Talla única para la mayoría' } },
            { label: { en: 'Height', es: 'Altura' }, value: { en: 'Crew Cut Length', es: 'Longitud a la altura de la tripulación' } },
            { label: { en: 'Thickness', es: 'Grosor' }, value: { en: 'Medium Cushioning for Comfort', es: 'Amortiguación media para comodidad' } },
            { label: { en: 'Features', es: 'Características' }, value: { en: 'Reinforced Heel & Toe, Arch Support', es: 'Talón y punta reforzados, soporte de arco' } },
            { label: { en: 'Packaging', es: 'Empaque' }, value: { en: 'Eco-Friendly, Biodegradable Bag', es: 'Bolsa biodegradable ecológica' } },
            { label: { en: 'Care Instructions', es: 'Instrucciones de cuidado' }, value: { en: 'Machine Wash Cold, Tumble Dry Low', es: 'Lavar a máquina en frío, secar en secadora a baja temperatura' } },
        ],
        imageSources: ["Resources/RadaSocks.webp"],
        imageHoverSource: null,
        imageAlt: { en: "RADA Socks", es: "Calcetines RADA" },
        price: "$18.00",
        oldPrice: null,
        mainVersion: true,
        versionsIds: null,
        href: "rada-socks",
    },
};

export function findProductsByIds(ids: string[]): Product[] {
    // Convert the products object to an array of products
    const productArray = Object.values(products);

    // Get products with the specified IDs
    const matchingProducts = productArray.filter(product =>
        ids.includes(product.id)
    );

    return matchingProducts;
}

export function findProductsByCategoryIds(categoryIds: number[]): Product[] {
    // Convert the products object to an array of products
    const productArray = Object.values(products);

    // Filter products that include all of the specified category IDs
    const matchingProducts = productArray.filter(product =>
        categoryIds.every(id => product.categoryIds.includes(id) && product.mainVersion)
    );

    return matchingProducts;
}

export function findProductByHref(hrefParam: string): Product | undefined {
    return Object.values(products).find((product) => product.href === hrefParam);
}

export function findSimilarProducts(product: Product, count: number): Product[] {
    // Convert products object to an array and filter out the original product
    const otherProducts = Object.values(products).filter(
        (p) =>
            p.id !== product.id &&
            p.mainVersion === true &&
            !product.versionsIds?.includes(p.id),
    );

    // Shuffle the array to get random products
    const shuffledProducts = otherProducts.sort(() => 0.5 - Math.random());

    // Slice the array to get the specified count or the maximum amount possible
    return shuffledProducts.slice(0, count);
}

export function findProductsByHrefs(hrefs: string[]): Product[] {
    let categoryIds = getCategoryIdsFromHrefs(hrefs);
    return findProductsByCategoryIds(categoryIds);
}
// #endregion

// #region Reviews
export type Review = {
    productId: string,
    date: string,
    text: string,
    name: string,
    imageSrc: string,
    rating: number,
}

export let reviews: Review[] = [
    // Jersey
    {
        productId: "menjersey",
        date: '01-20-2024',
        text:
            'Nice color and good fabric quality. This is the perfect size and the blue version matches my style perfectly.',
        name: 'kylejameson',
        imageSrc: '/images/lawyers/Alejandro_Rodriguez.jpg',
        rating: 5,
    },
    {
        productId: 'menjersey',
        date: '01-25-2024',
        text:
            'Absolutely love the new Jersey 2024, the red color is vibrant and it feels very comfortable to wear.',
        name: 'sarahc',
        imageSrc: '/images/lawyers/Sofia_Lindström.jpg',
        rating: 5,
    },
    {
        productId: 'menjersey',
        date: '02-01-2024',
        text:
            'The Jersey 2024 is amazing. It fits true to size and is very stylish for any event.',
        name: 'markuslee',
        imageSrc: '/images/lawyers/Brian_Mitchell.jpg',
        rating: 5,
    },
    {
        productId: 'menjersey',
        date: '02-05-2024',
        text:
            'Great jersey, the material is high-quality and the blue is just the right shade. Highly recommend!',
        name: 'annak',
        imageSrc: '/images/lawyers/Emily_Davis.jpg',
        rating: 5,
    },
    {
        productId: 'menjersey',
        date: '02-10-2024',
        text:
            'Picked up the Jersey 2024 for my workout sessions, and it’s been fantastic. Breathable and flexible!',
        name: 'lucas98',
        imageSrc: '/images/lawyers/Marcus_Turner.jpg',
        rating: 5,
    },

    // Cycling Bib
    {
        productId: 'cyclingbib',
        date: '03-01-2024',
        text:
            'The Cycling Bib 2024 is a game-changer. The fit is exceptional, and it provides the comfort needed on long rides. Top-notch quality!',
        name: 'michaelsmith',
        imageSrc: '/images/lawyers/Brian_Mitchell.jpg',
        rating: 5,
    },
    {
        productId: 'cyclingbib',
        date: '03-04-2024',
        text:
            'Just finished a century ride with the Cycling Bib 2024, and I couldn’t be happier. Supportive, stylish, and the blue color is stunning!',
        name: 'julie_w',
        imageSrc: '/images/lawyers/Sofia_Lindström.jpg',
        rating: 5,
    },
    {
        productId: 'cyclingbib',
        date: '03-07-2024',
        text:
            'The red Cycling Bib 2024 fits like a glove and breathes so well. It\'s my new go-to for all my cycling tours.',
        name: 'daveanderson',
        imageSrc: '/images/lawyers/Rahul_Patel.jpg',
        rating: 5,
    },
    {
        productId: 'cyclingbib',
        date: '03-10-2024',
        text:
            'Incredible comfort and sleek design! The Cycling Bib 2024 has made my rides more enjoyable. Highly recommend it to any cyclist!',
        name: 'lindseyb',
        imageSrc: '/images/lawyers/Ji-Yeon_Kim.jpg',
        rating: 5,
    },

    // Rada Socks
    {
        productId: 'radaSocks',
        date: '03-01-2024',
        text: 'These RADA Socks are a game-changer! Super comfortable for my daily runs and stylish enough for casual wear.',
        name: 'julianv',
        imageSrc: '/images/lawyers/Marcus_Turner.jpg',
        rating: 5,
    },
    {
        productId: 'radaSocks',
        date: '03-03-2024',
        text: 'I was skeptical about the price, but these socks are worth every penny. They feel like walking on clouds!',
        name: 'emilyrose',
        imageSrc: '/images/lawyers/Ji-Yeon_Kim.jpg',
        rating: 5,
    },
    {
        productId: 'radaSocks',
        date: '03-05-2024',
        text: 'Bought these for my hiking trips, and they’ve been fantastic. No blisters, and my feet stay dry!',
        name: 'mikejones',
        imageSrc: '/images/lawyers/Brian_Mitchell.jpg',
        rating: 5,
    },
    {
        productId: 'radaSocks',
        date: '03-07-2024',
        text: 'The comfort level of RADA Socks is unbeatable. Plus, they look great with all my shoes!',
        name: 'anna_k',
        imageSrc: '/images/lawyers/Emily_Davis.jpg',
        rating: 5,
    },
];

export function findReviewsByProductId(productId: string): Review[] {
    return reviews.filter((review) => review.productId === productId);
}

export function calculateAverageRating(reviews: Review[]): string | undefined {
    if (reviews.length === 0) {
        return undefined;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating.toFixed(1);
}
// #endregion

// #region Cart
export let deliveryFee = 8.18;

export type DenormalizedCartItem = {
    productId: string,
    sizeId?: number,
    quantity: number,
    name: string,
    imageSrc: string,
    description: string,
    price: string,
    totalItemPrice: number,
    href: string,
}

export function denormalizeCartItems(cartItems: CartItem[]): DenormalizedCartItem[] {
    return cartItems.map((item) => {
        const product = Object.values(products).find(product => product.id === item.productId);
        if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
        }
        const itemPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        const totalItemPrice = itemPrice * item.quantity;

        let productSize;
        if (item.sizeId) {
            productSize = findCategoryById(item.sizeId)?.name[storedLanguage];
        }

        return {
            productId: item.productId,
            sizeId: item.sizeId,
            quantity: item.quantity,
            name: `${product.name[storedLanguage]}${productSize ? " - " + storedDictionary.size + ' ' + productSize : ""}`,
            imageSrc: product.imageSources[0],
            description: product.description[storedLanguage],
            price: product.price,
            totalItemPrice: totalItemPrice,
            href: product.href
        };
    });
}

export function addToCart(productId: string, quantity: number, sizeId?: number, name?: string): void {
    // Adds a product to the cart or updates the quantity if the product already exists.
    cartItems.update(items => {
        sizeId ||= 0

        const existingItemIndex = items.findIndex(item => item.productId === productId && item.sizeId === sizeId);
        if (existingItemIndex !== -1) {
            // Update quantity of an existing item
            const updatedItems = [...items];
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity,
            };
            if (name) {
                toast.success(storedDictionary.quantityUpdated,
                    {
                        style:
                            "max-width: 60%; text-align: center; box-shadow: 2px 2px 20px var(--content-5)",
                        position: "bottom-center"
                    })
            }
            return updatedItems;
        } else {
            // Add new item to the cart
            if (name) {
                toast.success(`"${name}" ${storedDictionary.hasBeenAddedToTheCart}`,
                    {
                        style:
                            "max-width: 60%; text-align: center; box-shadow: 2px 2px 20px var(--content-5)",
                        position: "bottom-center"
                    })
            }
            return [...items, { productId, quantity, sizeId }];
        }
    });
}

export function removeFromCart(productId: string, name: string, sizeId?: number): void {
    sizeId ||= 0

    cartItems.update(items => items.filter(item => item.productId !== productId || item.sizeId !== sizeId));

    toast.success(`"${name}" ${storedDictionary.hasBeenRemovedFromTheCart}`,
        {
            style:
                "max-width: 60%; text-align: center; box-shadow: 2px 2px 20px var(--content-5)",
            position: "bottom-center"
        })
}

export function getCartItemFromIDs(cartItemsStore: CartItem[], productId: string, sizeId?: number) {
    sizeId ||= 0

    return Object.values(cartItemsStore).find(item => item.productId === productId && item.sizeId === sizeId)
}
// #endregion

// #region Our Work
export type craftItem = {
    src: string;
    alt?: translatableContent;
    title?: translatableContent;
    description?: translatableContent;
}

export let crafts: craftItem[] = [
    // {
    //     src: `demo/woman-small.webp`,
    //     alt: { en: 'Cyclist wearing our high-performance jersey', es: 'Ciclista usando nuestra camiseta de alto rendimiento' },
    //     title: { en: 'High-Performance Women’s Jersey', es: 'Camiseta de Alto Rendimiento para Mujeres' },
    //     description: {
    //         en: 'Showcasing our latest in women’s cycling jerseys, this piece combines aerodynamics with unparalleled comfort. Developed in collaboration with professional cyclists, it features breathable, moisture-wicking fabric and a form-fitting design for those who refuse to compromise on performance or style.',
    //         es: 'Presentando lo último en camisetas de ciclismo para mujeres, esta pieza combina la aerodinámica con un confort sin igual. Desarrollada en colaboración con ciclistas profesionales, cuenta con un tejido transpirable que absorbe la humedad y un diseño ajustado para quienes no renuncian al rendimiento ni al estilo.'
    //     },
    // },
    // {
    //     src: `demo/man-small.webp`,
    //     alt: { en: 'Cyclist in action wearing our mountain biking gear', es: 'Ciclista en acción usando nuestro equipo de ciclismo de montaña' },
    //     title: { en: 'All-Terrain Mountain Biking Gear', es: 'Equipo de Ciclismo de Montaña Todo Terreno' },
    //     description: {
    //         en: 'Designed for the trails, our all-terrain gear set is built to withstand the most challenging conditions. With reinforced stitching, ample storage for long rides, and integrated protective padding, this gear represents our commitment to combining durability with the freedom of movement.',
    //         es: 'Diseñado para los senderos, nuestro equipo todo terreno está construido para resistir las condiciones más desafiantes. Con costuras reforzadas, amplio almacenamiento para recorridos largos y acolchado protector integrado, este equipo representa nuestro compromiso de combinar durabilidad con la libertad de movimiento.'
    //     },
    // },
    // {
    //     src: `demo/amsterdam-small.webp`,
    //     alt: { en: 'Urban cyclist apparel by the canals of Amsterdam', es: 'Ropa de ciclista urbano junto a los canales de Ámsterdam' },
    //     title: { en: 'Urban Commuter Series', es: 'Serie para Ciclistas Urbanos' },
    //     description: {
    //         en: 'Inspired by the cycling culture of Amsterdam, our Urban Commuter Series marries functionality with sleek, minimalist design. Waterproof, yet breathable materials and subtle reflective details ensure safety and comfort in urban environments, making every commute a statement.',
    //         es: 'Inspirada en la cultura ciclista de Ámsterdam, nuestra Serie para Ciclistas Urbanos combina funcionalidad con un diseño elegante y minimalista. Materiales impermeables pero transpirables y detalles reflectantes sutiles garantizan la seguridad y el confort en entornos urbanos, haciendo de cada trayecto una declaración de estilo.'
    //     },
    // },
    // {
    //     src: `demo/women.webp`,
    //     alt: { en: 'Eco-friendly cycling wear collection', es: 'Colección de ropa de ciclismo ecológica' },
    //     title: { en: 'Eco-Friendly Collection', es: 'Colección Ecológica' },
    //     description: {
    //         en: 'Our Eco-Friendly Collection is a testament to our commitment to sustainability. Made from recycled materials without compromising on performance, these pieces offer cyclists a way to support the environment while enjoying their ride. Join us on the journey towards a greener future.',
    //         es: 'Nuestra Colección Ecológica es un testimonio de nuestro compromiso con la sostenibilidad. Hecha de materiales reciclados sin comprometer el rendimiento, estas piezas ofrecen a los ciclistas una forma de apoyar al medio ambiente mientras disfrutan de su paseo. Únete a nosotros en el camino hacia un futuro más verde.'
    //     },
    // },
    {
        src: 'custom/1.webp'
    },
    {
        src: 'custom/2.webp'
    },
    {
        src: 'custom/3.webp'
    },
    {
        src: 'custom/4.webp'
    },
    {
        src: 'custom/5.webp'
    },
    {
        src: 'custom/6.webp'
    },
    {
        src: 'custom/7.webp'
    },
    {
        src: 'custom/8.webp'
    },
    {
        src: 'custom/9.webp'
    },
    {
        src: 'custom/10.webp'
    },
    {
        src: 'custom/11.webp'
    },
    {
        src: 'custom/12.webp'
    },
    {
        src: 'custom/13.webp'
    },
    {
        src: 'custom/14.webp'
    },
    {
        src: 'custom/15.webp'
    },
    {
        src: 'custom/16.webp'
    },
    {
        src: 'custom/17.webp'
    },
    {
        src: 'custom/18.webp'
    },
    {
        src: 'custom/19.webp'
    },
    {
        src: 'custom/20.webp'
    },
    {
        src: 'custom/21.webp'
    },
    {
        src: 'custom/22.webp'
    },
    {
        src: 'custom/23.webp'
    },
    {
        src: 'custom/24.webp'
    },
    {
        src: 'custom/25.webp'
    },
    {
        src: 'custom/26.webp'
    },
    {
        src: 'custom/27.webp'
    },
    {
        src: 'custom/28.webp'
    },
    {
        src: 'custom/29.webp'
    },
    {
        src: 'custom/30.webp'
    },
    {
        src: 'custom/31.webp'
    },
    {
        src: 'custom/32.webp'
    },
    {
        src: 'custom/33.webp'
    },
    {
        src: 'custom/34.webp'
    },
    {
        src: 'custom/35.webp'
    },
    {
        src: 'custom/36.webp'
    },
    {
        src: 'custom/37.webp'
    },
    {
        src: 'custom/38.webp'
    },
    {
        src: 'custom/39.webp'
    },
    {
        src: 'custom/40.webp'
    },
    {
        src: 'custom/41.webp'
    },
    {
        src: 'custom/42.webp'
    },
    {
        src: 'custom/43.webp'
    },
    {
        src: 'custom/44.webp'
    },
    {
        src: 'custom/45.webp'
    },
    {
        src: 'custom/46.webp'
    },
    {
        src: 'custom/47.webp'
    },
    {
        src: 'custom/48.webp'
    },
    {
        src: 'custom/49.webp'
    },
    {
        src: 'custom/50.webp'
    },
    {
        src: 'custom/51.webp'
    },
    {
        src: 'custom/52.webp'
    },
    {
        src: 'custom/53.webp'
    },
    {
        src: 'custom/54.webp'
    },
    {
        src: 'custom/55.webp'
    },
    {
        src: 'custom/56.webp'
    },
];
// #endregion