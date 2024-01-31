import { baseImageRoute } from "./stores"

type Cat = {
    name: string,
    icon: string,
    imageSrc: string,
    imageAlt: string,
}
export let categories: Cat[] = [
    {
        name: "All",
        icon: "apps",
        imageSrc: "",
        imageAlt: "",
    },
    {
        name: "Men",
        icon: "man",
        imageSrc: "",
        imageAlt: "Products For Men",
    },
    {
        name: "Women",
        icon: "woman",
        imageSrc: "",
        imageAlt: "Products For Women",
    },
    {
        name: "Jerseys",
        icon: "shirt",
        imageSrc: "",
        imageAlt: "",
    },
    {
        name: "Bibs",
        icon: "beer",
        imageSrc: "",
        imageAlt: "",
    },
    {
        name: "Shorts",
        icon: "pricetag",
        imageSrc: "",
        imageAlt: "",
    },
    {
        name: "Shirts",
        icon: "shirt-outline",
        imageSrc: "",
        imageAlt: "",
    },
    {
        name: "Jackets & Vests",
        icon: "invert-mode",
        imageSrc: "",
        imageAlt: "",
    },
    {
        name: "Accessories",
        icon: "accessibility",
        imageSrc: "",
        imageAlt: "",
    },
]

export type Product = {
    name: string,
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

export let storage: Record<string, Product> = {
    "jersey2024": {
        name: "Jersey 2024",
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
        name: "Cycling Bib 2024",
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
        name: "Bib + Jersey + Free Socks",
        imageSrc: "1BibPlus2Jerseys.webp",
        imgHoverSrc: "radimir.jpg",
        imageAlt: "Offer: 1 Bib Plus 1 Jersey Plus Free Socks",
        price: "$219.97",
        oldPrice: "$280.00",
        versions: undefined,
        href: "bib-plus-jerseys",
    },
    "radaSocks": {
        name: "RADA Socks",
        imageSrc: "RadaSocks.webp",
        imgHoverSrc: undefined,
        imageAlt: "RADA Socks",
        price: "$16.00",
        oldPrice: "$25.00",
        versions: undefined,
        href: "rada-socks",
    }
}

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