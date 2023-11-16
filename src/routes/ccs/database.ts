type Multilingual = {
    'español': string,
    'english': string,
    'français': string,
    'deutsch': string,
    'italiano': string,
    'Русский': string,
}

type Table = {
    'property': Multilingual,
    'value': Multilingual,
}[]

type Category = 'restauracion' | 'fabricacion' | 'personalizacion';
export type Feature = 'personalizable' | 'fabricacionCompleta' | 'conForro' | 'garantia';


export const guitarStorage: {
    name: Multilingual,
    category: Category,
    edition: Multilingual,
    description: Multilingual,
    price: string,
    fileNames: string[],
    allowSmallSize: boolean,
    filesExtension: string,
    paragraph: Multilingual,
    table: Table,
    features: Feature[],
}[] =
([
    {
        name: {
            'español': 'Boa constrictor',
            'english': 'Boa constrictor',
            'français': 'Boa constrictor',
            'deutsch': 'Boa constrictor',
            'italiano': 'Boa constrictor',
            'Русский': 'Boa constrictor',
        },
        category: 'fabricacion',
        edition: {
            'español': 'CCS-Boa constrictor',
            'english': 'CCS-Boa constrictor',
            'français': 'CCS-Boa constrictor',
            'deutsch': 'CCS-Boa constrictor',
            'italiano': 'CCS-Boa constrictor',
            'Русский': 'CCS-Boa constrictor',
        },    
        description: {
            'español': 'Su construcción única en una sola pieza y cuerpo de flor morado colombiano la convierten en la opción perfecta para el escenario.',
            'english': 'Its unique one-piece construction and Colombian purpleheart body make it the perfect choice for the stage.',
            'français': 'Sa construction unique en une seule pièce et son corps en bois de pourpre colombien en font le choix parfait pour la scène.',
            'deutsch': 'Durch ihre einzigartige Einteilige Konstruktion und den kolumbianischen Purpleheart-Korpus ist sie die perfekte Wahl für die Bühne.',
            'italiano': 'La sua costruzione unica in un pezzo e il corpo in legno di purpleheart colombiano la rendono la scelta perfetta per il palco.',
            'Русский': 'Её уникальная конструкция из одного куска и корпус из колумбийского пурпурного дерева делают её идеальным выбором для сцены.',
        },           
        price: '4,099,000.00 COP',
        fileNames: [
            'guitarre2front',
            'guitarre2derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'png',
        paragraph: {
            'español': `La guitarra eléctrica CCS-Boa constrictor tiene un diseño neoclásico (tipo Explorer) perfecto para el rock pesado. Es una guitarra propia de escenario, con su construcción en una sola pieza y un cuerpo completamente de flor morado, madera de las montañas de Colombia. El diapasón de caoba y arce tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y sustain, manteniendo el sonido antes de desvanecerse y acabar. Cuenta con un Humbucker Dimarzio (DP159FBK) de super distorsión, con controles de volumen y tono, lo cual proporciona un rendimiento alto y ajustado. Este es nuestro color de lanzamiento: un negro mate con desvanecimiento en la parte anterior del diapasón, un efecto propio de la madera utilizada para la fabricación.`,
            'english': `The CCS-Boa constrictor electric guitar has a neoclassical design (Explorer type) perfect for heavy rock. It is a stage-ready guitar, with its one-piece construction and a body made entirely of purpleheart, wood from the mountains of Colombia. The mahogany and maple fretboard has 22 frets along a 24.75-inch scale, standard, designed for speed and comfort. The headstock design makes it even more aggressive on stage. It is a lightweight guitar with great resonance and sustain, maintaining the sound before fading away. It features a Dimarzio (DP159FBK) super distortion Humbucker, with volume and tone controls, providing high and tight performance. This is our launch color: matte black with fading on the front of the fretboard, a characteristic effect of the wood used for manufacturing.`,
            'français': `La guitare électrique CCS-Boa constrictor a un design néoclassique (type Explorer) parfait pour le rock lourd. C'est une guitare prête pour la scène, avec sa construction en une seule pièce et un corps entièrement en bois de pourpre, provenant des montagnes de Colombie. La touche en acajou et érable compte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. Le design de la tête la rend encore plus agressive sur scène. C'est une guitare légère avec une grande résonance et un sustain, maintenant le son avant de s'estomper. Elle est équipée d'un Humbucker Dimarzio (DP159FBK) de super distorsion, avec des contrôles de volume et de tonalité, offrant une performance élevée et serrée. Voici notre couleur de lancement : noir mat avec un fondu sur l'avant de la touche, un effet caractéristique du bois utilisé pour la fabrication.`,
            'deutsch': `Die CCS-Boa constrictor E-Gitarre hat ein neoklassisches Design (Explorer-Typ), das perfekt für Heavy Rock geeignet ist. Sie ist eine bühnentaugliche Gitarre mit ihrer einteiligen Konstruktion und einem Korpus aus Purpleheart-Holz, das aus den Bergen Kolumbiens stammt. Der Mahagoni- und Ahorngriffbrett hat 22 Bünde entlang einer Skala von 24,75 Zoll, standardmäßig, konzipiert für Geschwindigkeit und Komfort. Das Kopfplattendesign macht sie auf der Bühne noch aggressiver. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, die den Klang vor dem Verklingen bewahrt. Sie verfügt über einen Dimarzio (DP159FBK) Super Distortion-Humbucker, mit Lautstärke- und Tonreglern, für eine hohe und präzise Leistung. Dies ist unsere Startfarbe: Mattschwarz mit Verblassen auf der Vorderseite des Griffbretts, ein charakteristischer Effekt des für die Herstellung verwendeten Holzes.`,
            'italiano': `La chitarra elettrica CCS-Boa constrictor ha un design neoclassico (tipo Explorer) perfetto per il rock pesante. È una chitarra pronta per il palco, con la sua costruzione monopezzo e un corpo completamente in legno di purpleheart, proveniente dalle montagne della Colombia. La tastiera in mogano e acero ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. Il design della paletta la rende ancora più aggressiva sul palco. È una chitarra leggera con una grande risonanza e sustain, che mantiene il suono prima di dissolversi. Dispone di un pickup Humbucker Dimarzio (DP159FBK) super distortion, con controlli di volume e tono, che forniscono prestazioni elevate e precise. Questo è il nostro colore di lancio: nero opaco con sbiadimento sulla parte anteriore della tastiera, un effetto caratteristico del legno utilizzato per la produzione.`,
            'Русский': `Электрогитара CCS-Boa constrictor имеет неоклассический дизайн (типа Explorer), идеально подходящий для тяжелого рока. Это готовая к выступлению гитара с односоставной конструкцией и корпусом полностью из пурпурного сердца, дерева из гор Колумбии. Гриф из красного дерева и клёна имеет 22 лада вдоль масштаба 24,75 дюйма, стандарт, разработанный для обеспечения скорости и комфорта. Дизайн головки делает ее еще более агрессивной на сцене. Это легкая гитара с отличной резонансной способностью и сустейном, поддерживающим звук перед исчезновением. Она оснащена звукоснимателем Dimarzio (DP159FBK) Super Distortion, с регуляторами громкости и тона, обеспечивающими высокую и точную производительность. Это наш цвет запуска: матово-черный с затуханием спереди грифа, характерный эффект для использованного в производстве дерева.`,    
        },
        features: ["personalizable", "fabricacionCompleta", "conForro", "garantia"],
        table:[
            {
                property: {
                    'español': 'Tiempo estimado de fabricación',
                    'english': 'Estimated manufacturing time',
                    'français': 'Temps de fabrication estimé',
                    'deutsch': 'Geschätzte Herstellungszeit',
                    'italiano': 'Tempo di produzione stimato',
                    'Русский': 'Предполагаемое время производства',
                },
                value: {
                    'español': '2 meses (60 días de calendario)',
                    'english': '2 months (60 calendar days)',
                    'français': '2 mois (60 jours calendaires)',
                    'deutsch': '2 Monate (60 Kalendertage)',
                    'italiano': '2 mesi (60 giorni di calendario)',
                    'Русский': '2 месяца (60 календарных дней)',
                }
            },
            {
                property: {
                    'español': 'Cuerdas',
                    'english': 'Strings',
                    'français': 'Cordes',
                    'deutsch': 'Saiten',
                    'italiano': 'Corde',
                    'Русский': 'Струны',
                },
                value: {
                    'español': '10-46, calibre personalizable.',
                    'english': '10-46, customizable gauge.',
                    'français': '10-46, calibre personnalisable.',
                    'deutsch': '10-46, anpassbares Kaliber.',
                    'italiano': '10-46, calibro personalizzabile.',
                    'Русский': '10-46, настраиваемый калибр.',
                }
            },
            {
                property: {
                    'español': 'Puente',
                    'english': 'Bridge',
                    'français': 'Pont',
                    'deutsch': 'Steg',
                    'italiano': 'Ponte',
                    'Русский': 'Мост',
                },
                value: {
                    'español': 'Fijo',
                    'english': 'Fixed',
                    'français': 'Fixe',
                    'deutsch': 'Fest',
                    'italiano': 'Fisso',
                    'Русский': 'Фиксированный',
                }
            },
            {
                property: {
                    'español': 'Pastilla del puente',
                    'english': 'Bridge pickup',
                    'français': 'Micro chevalet',
                    'deutsch': 'Steg-Pickup',
                    'italiano': 'Pickup del ponte',
                    'Русский': 'Звукосниматель моста',
                },
                value: {
                    'español': 'Dimarzio (DP159FBK)',
                    'english': 'Dimarzio (DP159FBK)',
                    'français': 'Dimarzio (DP159FBK)',
                    'deutsch': 'Dimarzio (DP159FBK)',
                    'italiano': 'Dimarzio (DP159FBK)',
                    'Русский': 'Dimarzio (DP159FBK)',
                }
            },
            {
                property: {
                    'español': 'Pastilla del cuello',
                    'english': 'Neck pickup',
                    'français': 'Micro manche',
                    'deutsch': 'Hals-Pickup',
                    'italiano': 'Pickup del manico',
                    'Русский': 'Звукосниматель грифа',
                },
                value: {
                    'español': 'No incluye, sin embargo, al interior del cuerpo tiene la adaptación para un segundo micrófono.',
                    'english': 'Not included, however, inside the body has the provision for a second microphone.',
                    'français': 'Non inclus, cependant, à l\'intérieur du corps, il y a la possibilité d\'un deuxième microphone.',
                    'deutsch': 'Nicht enthalten, jedoch hat das Innere des Gehäuses die Vorrichtung für ein zweites Mikrofon.',
                    'italiano': 'Non incluso, tuttavia, all\'interno del corpo è prevista la predisposizione per un secondo microfono.',
                    'Русский': 'Не включено, однако внутри корпуса есть предусмотренное место для второго микрофона.',
                }
            },
            {
                property: {
                    'español': 'Color',
                    'english': 'Color',
                    'français': 'Couleur',
                    'deutsch': 'Farbe',
                    'italiano': 'Colore',
                    'Русский': 'Цвет',
                },
                value: {
                    'español': 'Negro mate',
                    'english': 'Matte black',
                    'français': 'Noir mat',
                    'deutsch': 'Matt Schwarz',
                    'italiano': 'Nero opaco',
                    'Русский': 'Матово-черный',
                }
            },
            {
                property: {
                    'español': 'País de origen',
                    'english': 'Country of origin',
                    'français': 'Pays d\'origine',
                    'deutsch': 'Herkunftsland',
                    'italiano': 'Paese d\'origine',
                    'Русский': 'Страна происхождения',
                },
                value: {
                    'español': 'Colombia',
                    'english': 'Colombia',
                    'français': 'Colombie',
                    'deutsch': 'Kolumbien',
                    'italiano': 'Colombia',
                    'Русский': 'Колумбия',
                }
            },
            {
                property: {
                    'español': 'Controles',
                    'english': 'Controls',
                    'français': 'Contrôles',
                    'deutsch': 'Regler',
                    'italiano': 'Controlli',
                    'Русский': 'Управление',
                },
                value: {
                    'español': '1 volumen y 1 tono',
                    'english': '1 volume and 1 tone',
                    'français': '1 volume et 1 tonalité',
                    'deutsch': '1 Lautstärke und 1 Ton',
                    'italiano': '1 volume e 1 tono',
                    'Русский': '1 громкость и 1 тон',
                }
            },
            {
                property: {
                    'español': 'Clavijas',
                    'english': 'Tuning pegs',
                    'français': 'Accordeurs',
                    'deutsch': 'Stimmmechaniken',
                    'italiano': 'Meccaniche di accordatura',
                    'Русский': 'Колки',
                },
                value: {
                    'español': 'De los mismos fabricantes de Grover',
                    'english': 'From the same manufacturers as Grover',
                    'français': 'Des mêmes fabricants que Grover',
                    'deutsch': 'Vom gleichen Hersteller wie Grover',
                    'italiano': 'Dagli stessi produttori di Grover',
                    'Русский': 'От тех же производителей, что и Grover',
                }
            },
        ]
    },
    {
        name: {
            'español': 'Asio clamator',
            'english': 'Asio clamator',
            'français': 'Asio clamator',
            'deutsch': 'Asio clamator',
            'italiano': 'Asio clamator',
            'Русский': 'Asio clamator',
        },
        category: 'fabricacion',
        edition: {
            'español': 'CCS-Asio clamator',
            'english': 'CCS-Asio clamator',
            'français': 'CCS-Asio clamator',
            'deutsch': 'CCS-Asio clamator',
            'italiano': 'CCS-Asio clamator',
            'Русский': 'CCS-Asio clamator',
        },
        description: {
            'español': '¡Eleva tu música con esta guitarra ligera, resonante y llena de personalidad!',
            'english': 'Elevate your music with this lightweight, resonant, and personality-filled guitar!',
            'français': 'Élevez votre musique avec cette guitare légère, résonnante et pleine de personnalité !',
            'deutsch': 'Heben Sie Ihre Musik mit dieser leichten, resonanten und persönlichkeitsvollen Gitarre hervor!',
            'italiano': 'Eleva la tua musica con questa chitarra leggera, sonora e piena di personalità!',
            'Русский': 'Поднимите свою музыку с этой легкой, звучной и полной индивидуальности гитарой!',
        },        
        price: '4,099,000.00 COP',
        fileNames: [
            'guitarre3front',
            'guitarre3derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'png',
        paragraph: {
            'español': `La guitarra eléctrica CCS-Asio clamator tiene un diseño neoclásico perfecto para tocar metal (Death-Black). Es una guitarra propia de escenario, con su construcción en una sola pieza y un cuerpo completamente de flor morado, madera de las montañas de Colombia. El diapasón de caoba y arce tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y un sustain, por tanto, manteniendo el sonido antes de desvanecerse y acabar. Cuenta con un Humbucker Dimarzio (DP159FBK) super distortion, cuenta con volumen y tono, lo cual proporciona un alto y ajustado rendimiento. Este es nuestro color de lanzamiento natural y con un negro mate, el cual realza las betas de la madera.`,
            'english': `The CCS-Asio clamator electric guitar features a perfect neoclassical design for playing metal (Death-Black). It is a stage-ready guitar, with its one-piece construction and a body made entirely of purpleheart, wood from the mountains of Colombia. The mahogany and maple fretboard has 22 frets along a 24.75-inch scale, standard, designed for speed and comfort. The headstock design makes it even more aggressive on stage. It is a lightweight guitar with great resonance and sustain, maintaining the sound before fading away. It features a Dimarzio (DP159FBK) super distortion Humbucker, with volume and tone controls, providing high and tight performance. This is our natural launch color with matte black, enhancing the wood's grain.`,
            'français': `La guitare électrique CCS-Asio clamator arbore un design néoclassique parfait pour jouer du métal (Death-Black). C'est une guitare prête pour la scène, avec sa construction en une seule pièce et un corps entièrement en bois de pourpre, provenant des montagnes de Colombie. Le manche en acajou et érable comporte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. Le design de la tête la rend encore plus agressive sur scène. C'est une guitare légère avec une grande résonance et un sustain, maintenant le son avant de s'estomper. Elle est équipée d'un Humbucker Dimarzio (DP159FBK) super distortion, avec des contrôles de volume et de tonalité, offrant une performance puissante et serrée. Il s'agit de notre couleur de lancement naturelle avec un noir mat, mettant en valeur les veines du bois.`,
            'deutsch': `Die CCS-Asio clamator E-Gitarre hat ein perfektes neoklassisches Design für das Spielen von Metal (Death-Black). Es ist eine Bühnen-gerechte Gitarre mit ihrem einteiligen Aufbau und einem Korpus aus Purpleheart-Holz, das aus den Bergen Kolumbiens stammt. Das Griffbrett aus Mahagoni und Ahorn hat 22 Bünde entlang einer 24,75-Zoll-Skala, standardmäßig, für Geschwindigkeit und Komfort konzipiert. Das Kopfplattendesign macht sie auf der Bühne noch aggressiver. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, die den Klang vor dem Verklingen bewahrt. Sie verfügt über einen Dimarzio (DP159FBK) Super Distortion-Humbucker, mit Lautstärke- und Tonreglern, für eine hohe und präzise Leistung. Dies ist unsere natürliche Einführungsfarbe mit mattem Schwarz, das die Maserung des Holzes betont.`,
            'italiano': `La chitarra elettrica CCS-Asio clamator ha un design neoclassico perfetto per suonare metal (Death-Black). È una chitarra pronta per il palco, con la sua costruzione monoblocco e un corpo completamente in purpleheart, legno proveniente dalle montagne della Colombia. La tastiera in mogano e acero ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. Il design della paletta la rende ancora più aggressiva sul palco. È una chitarra leggera con una grande risonanza e sustain, mantenendo il suono prima di svanire. Dotata di un Humbucker Dimarzio (DP159FBK) super distortion, con controlli di volume e tono, che garantiscono prestazioni elevate e precise. Questo è il nostro colore di lancio naturale con nero opaco, che enfatizza le venature del legno.`,
            'Русский': `Электрогитара CCS-Asio clamator имеет идеальный неоклассический дизайн для игры в металл (Death-Black). Это гитара готова к выступлениям, с ее односоставной конструкцией и корпусом полностью из дерева пурпурного сердца, привезенного из гор Колумбии. Гриф из красного дерева и клёна имеет 22 лада вдоль масштаба 24,75 дюйма, стандарт, разработанный для обеспечения скорости и комфорта. Дизайн головки делает ее еще более агрессивной на сцене. Это легкая гитара с отличной резонансной способностью и сустейном, поддерживающим звук перед исчезновением. Она оснащена звукоснимателем Dimarzio (DP159FBK) Super Distortion, с регуляторами громкости и тона, обеспечивающими высокую и точную производительность. Это наш натуральный цвет запуска с матово-черным, что подчеркивает текстуру дерева.`,    
        },
        features: ["personalizable", "fabricacionCompleta", "conForro", "garantia"],
        table:[
            {
                property: {
                    'español': 'Tiempo estimado de fabricación',
                    'english': 'Estimated manufacturing time',
                    'français': 'Temps de fabrication estimé',
                    'deutsch': 'Geschätzte Herstellungszeit',
                    'italiano': 'Tempo di produzione stimato',
                    'Русский': 'Предполагаемое время производства',
                },
                value: {
                    'español': '2 meses (60 días de calendario)',
                    'english': '2 months (60 calendar days)',
                    'français': '2 mois (60 jours calendaires)',
                    'deutsch': '2 Monate (60 Kalendertage)',
                    'italiano': '2 mesi (60 giorni di calendario)',
                    'Русский': '2 месяца (60 календарных дней)',
                }
            },
            {
                property: {
                    'español': 'Cuerdas',
                    'english': 'Strings',
                    'français': 'Cordes',
                    'deutsch': 'Saiten',
                    'italiano': 'Corde',
                    'Русский': 'Струны',
                },
                value: {
                    'español': '10-46, calibre personalizable.',
                    'english': '10-46, customizable gauge.',
                    'français': '10-46, calibre personnalisable.',
                    'deutsch': '10-46, anpassbares Kaliber.',
                    'italiano': '10-46, calibro personalizzabile.',
                    'Русский': '10-46, настраиваемый калибр.',
                }
            },
            {
                property: {
                    'español': 'Puente',
                    'english': 'Bridge',
                    'français': 'Pont',
                    'deutsch': 'Steg',
                    'italiano': 'Ponte',
                    'Русский': 'Мост',
                },
                value: {
                    'español': 'Fijo',
                    'english': 'Fixed',
                    'français': 'Fixe',
                    'deutsch': 'Fest',
                    'italiano': 'Fisso',
                    'Русский': 'Фиксированный',
                }
            },
            {
                property: {
                    'español': 'Pastilla del puente',
                    'english': 'Bridge pickup',
                    'français': 'Micro chevalet',
                    'deutsch': 'Steg-Pickup',
                    'italiano': 'Pickup del ponte',
                    'Русский': 'Звукосниматель моста',
                },
                value: {
                    'español': 'Dimarzio (DP159FBK)',
                    'english': 'Dimarzio (DP159FBK)',
                    'français': 'Dimarzio (DP159FBK)',
                    'deutsch': 'Dimarzio (DP159FBK)',
                    'italiano': 'Dimarzio (DP159FBK)',
                    'Русский': 'Dimarzio (DP159FBK)',
                }
            },
            {
                property: {
                    'español': 'Pastilla del cuello',
                    'english': 'Neck pickup',
                    'français': 'Micro manche',
                    'deutsch': 'Hals-Pickup',
                    'italiano': 'Pickup del manico',
                    'Русский': 'Звукосниматель грифа',
                },
                value: {
                    'español': 'No incluye, sin embargo, al interior del cuerpo tiene la adaptación para un segundo micrófono.',
                    'english': 'Not included, however, inside the body has the provision for a second microphone.',
                    'français': 'Non inclus, cependant, à l\'intérieur du corps, il y a la possibilité d\'un deuxième microphone.',
                    'deutsch': 'Nicht enthalten, jedoch hat das Innere des Gehäuses die Vorrichtung für ein zweites Mikrofon.',
                    'italiano': 'Non incluso, tuttavia, all\'interno del corpo è prevista la predisposizione per un secondo microfono.',
                    'Русский': 'Не включено, однако внутри корпуса есть предусмотренное место для второго микрофона.',
                }
            },
            {
                property: {
                    'español': 'Color',
                    'english': 'Color',
                    'français': 'Couleur',
                    'deutsch': 'Farbe',
                    'italiano': 'Colore',
                    'Русский': 'Цвет',
                },
                value: {
                    'español': 'Natural / Pick Guard Negro mate',
                    'english': 'Natural / Matte Black Pick Guard',
                    'français': 'Naturel / Protection noire mate',
                    'deutsch': 'Natur / Mattschwarze Schlagplatte',
                    'italiano': 'Naturale / Protezione nera opaca',
                    'Русский': 'Натуральный / Матовая черная защитная панель',
                }
            },
            {
                property: {
                    'español': 'País de origen',
                    'english': 'Country of origin',
                    'français': 'Pays d\'origine',
                    'deutsch': 'Herkunftsland',
                    'italiano': 'Paese d\'origine',
                    'Русский': 'Страна происхождения',
                },
                value: {
                    'español': 'Colombia',
                    'english': 'Colombia',
                    'français': 'Colombie',
                    'deutsch': 'Kolumbien',
                    'italiano': 'Colombia',
                    'Русский': 'Колумбия',
                }
            },
            {
                property: {
                    'español': 'Controles',
                    'english': 'Controls',
                    'français': 'Contrôles',
                    'deutsch': 'Regler',
                    'italiano': 'Controlli',
                    'Русский': 'Управление',
                },
                value: {
                    'español': '1 volumen y 1 tono',
                    'english': '1 volume and 1 tone',
                    'français': '1 volume et 1 tonalité',
                    'deutsch': '1 Lautstärke und 1 Ton',
                    'italiano': '1 volume e 1 tono',
                    'Русский': '1 громкость и 1 тон',
                }
            },
            {
                property: {
                    'español': 'Clavijas',
                    'english': 'Tuning pegs',
                    'français': 'Accordeurs',
                    'deutsch': 'Stimmmechaniken',
                    'italiano': 'Meccaniche di accordatura',
                    'Русский': 'Колки',
                },
                value: {
                    'español': 'De los mismos fabricantes de Grover',
                    'english': 'From the same manufacturers as Grover',
                    'français': 'Des mêmes fabricants que Grover',
                    'deutsch': 'Vom gleichen Hersteller wie Grover',
                    'italiano': 'Dagli stessi produttori di Grover',
                    'Русский': 'От тех же производителей, что и Grover',
                }
            },            
        ]
    },
    {
        name: {
            'español': 'Mantidae',
            'english': 'Mantidae',
            'français': 'Mantidae',
            'deutsch': 'Mantidae',
            'italiano': 'Mantidae',
            'Русский': 'Mantidae',
        },
        category: 'restauracion',
        edition: {
            'español': 'CCS-Mantidae',
            'english': 'CCS-Mantidae',
            'français': 'CCS-Mantidae',
            'deutsch': 'CCS-Mantidae',
            'italiano': 'CCS-Mantidae',
            'Русский': 'CCS-Mantidae',
        },
        description: {
            'español': 'Ofrece un rendimiento excepcional con sus 2 potentes Humbuckers Dimarzio y controles push-pull para una experiencia musical única.',
            'english': 'Delivers exceptional performance with its 2 powerful Dimarzio Humbuckers and push-pull controls for a unique musical experience.',
            'français': 'Offre des performances exceptionnelles avec ses 2 puissants Humbuckers Dimarzio et des contrôles push-pull pour une expérience musicale unique.',
            'deutsch': 'Bietet eine außergewöhnliche Leistung mit seinen 2 leistungsstarken Humbuckers von Dimarzio und Push-Pull-Reglern für ein einzigartiges musikalisches Erlebnis.',
            'italiano': 'Offre prestazioni eccezionali con i suoi 2 potenti Humbuckers Dimarzio e controlli push-pull per un\'esperienza musicale unica.',
            'Русский': 'Предлагает исключительное исполнение с двумя мощными звукоснимателями Dimarzio и регуляторами push-pull для уникального музыкального опыта.',
        },        
        price: '4,099,000.00 COP',
        fileNames: [
            'guitarre1front',
            'guitarre1derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'png',
        paragraph: {
            'español': `La guitarra eléctrica CCS-Mantidae tiene un corte tipo headless, perfecto para rock en sus subgéneros. Es una guitarra propia de escenario, con su construcción en una sola pieza y un cuerpo completamente de flor morado, madera de las montañas de Colombia. El diapasón de caoba y arce tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. Es una guitarra liviana de gran resonancia y un sustain, por tanto, manteniendo el sonido antes de desvanecerse y acabar. Cuenta con 2 poderosos Humbuckers Dimarzio (Air Norton DP193- The Tone Zone DP155), cuenta con controles de volumen y tono maestro, y algo muy importante, control con push-pull, lo cual proporciona un alto y ajustado rendimiento. Este es nuestro color de lanzamiento natural negro, el cual realza las betas de la madera.`,
            'english': `The CCS-Mantidae electric guitar features a headless design, perfect for rock in its subgenres. It is a stage-ready guitar, with its one-piece construction and a body made entirely of Colombian purpleheart wood from the mountains. The mahogany and maple fretboard has 22 frets along a 24.75-inch scale, standard, designed for speed and comfort. It is a lightweight guitar with great resonance and sustain, thus maintaining the sound before fading away. It boasts 2 powerful Dimarzio Humbuckers (Air Norton DP193- The Tone Zone DP155), with master volume and tone controls, and something very important, a push-pull control, providing high and tight performance. This is our natural black launch color, enhancing the wood's grain.`,
            'français': `La guitare électrique CCS-Mantidae présente une conception « headless », parfaite pour le rock dans ses sous-genres. C'est une guitare prête pour la scène, avec sa construction d'une seule pièce et un corps entièrement en bois de pourpre colombien des montagnes. Le manche en acajou et en érable compte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. C'est une guitare légère avec une grande résonance et un sustain, maintenant ainsi le son avant de s'estomper. Elle est équipée de 2 puissants Humbuckers Dimarzio (Air Norton DP193- The Tone Zone DP155), avec des commandes de volume et de tonalité principales, et quelque chose de très important, un contrôle push-pull, offrant des performances élevées et serrées. C'est notre couleur de lancement naturelle, noir, qui met en valeur le grain du bois.`,
            'deutsch': `Die CCS-Mantidae E-Gitarre hat ein kopfloses Design, perfekt für Rock in seinen Subgenres. Es ist eine Bühnen-gerechte Gitarre mit einer Konstruktion aus einem Stück und einem Korpus aus vollständigem violettem Herzholz aus Kolumbien. Das Griffbrett aus Mahagoni und Ahorn hat 22 Bünde entlang einer 24,75-Zoll-Skala, Standard, entworfen für Geschwindigkeit und Komfort. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, wodurch der Klang erhalten bleibt, bevor er verblasst. Sie verfügt über 2 leistungsstarke Dimarzio-Humbucker (Air Norton DP193- The Tone Zone DP155), mit Hauptreglern für Lautstärke und Klang, und etwas sehr Wichtiges, einem Push-Pull-Regler, der eine hohe und präzise Leistung bietet. Dies ist unsere natürliche schwarze Einführungsfarbe, die die Maserung des Holzes betont.`,
            'italiano': `La chitarra elettrica CCS-Mantidae presenta un design headless, perfetto per il rock nei suoi sottogeneri. È una chitarra pronta per il palco, con la sua costruzione monopezzo e un corpo interamente in legno di cuore viola colombiano proveniente dalle montagne. La tastiera in mogano ed acero ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. È una chitarra leggera con grande risonanza e sustain, mantenendo il suono prima di dissolversi. Vanta 2 potenti Humbuckers Dimarzio (Air Norton DP193- The Tone Zone DP155), con controlli principali di volume e tono, e qualcosa di molto importante, un controllo push-pull, che offre prestazioni elevate e precise. Questo è il nostro colore di lancio naturale, nero, che enfatizza la venatura del legno.`,
            'Русский': `Электрогитара CCS-Mantidae имеет дизайн без головки, идеально подходящий для рока в его поджанрах. Это гитара, готовая к выступлениям, с односоставной конструкцией и корпусом из колумбийского дерева пурпурного сердца. Гриф из красного дерева и клёна имеет 22 лада вдоль масштаба 24,75 дюйма, стандарт, разработанный для обеспечения скорости и комфорта. Это легкая гитара с отличной резонансной способностью и сустейном, что позволяет сохранить звук перед исчезновением. На ней установлены 2 мощных звукоснимателя Dimarzio (Air Norton DP193- The Tone Zone DP155), с главными регуляторами громкости и тона, а также очень важным регулятором push-pull, обеспечивающим высокую и точную производительность. Это наш естественный черный цвет запуска, который подчёркивает структуру дерева.`,    
        },
        features: ["personalizable", "fabricacionCompleta", "conForro", "garantia"],
        table:[
            {
                property: {
                    'español': 'Tiempo estimado de fabricación',
                    'english': 'Estimated manufacturing time',
                    'français': 'Temps de fabrication estimé',
                    'deutsch': 'Geschätzte Herstellungszeit',
                    'italiano': 'Tempo di produzione stimato',
                    'Русский': 'Предполагаемое время производства',
                },
                value: {
                    'español': '2 meses (60 días de calendario)',
                    'english': '2 months (60 calendar days)',
                    'français': '2 mois (60 jours calendaires)',
                    'deutsch': '2 Monate (60 Kalendertage)',
                    'italiano': '2 mesi (60 giorni di calendario)',
                    'Русский': '2 месяца (60 календарных дней)',
                }
            },
            {
                property: {
                    'español': 'Cuerdas',
                    'english': 'Strings',
                    'français': 'Cordes',
                    'deutsch': 'Saiten',
                    'italiano': 'Corde',
                    'Русский': 'Струны',
                },
                value: {
                    'español': '10-46, calibre personalizable.',
                    'english': '10-46, customizable gauge.',
                    'français': '10-46, calibre personnalisable.',
                    'deutsch': '10-46, anpassbares Kaliber.',
                    'italiano': '10-46, calibro personalizzabile.',
                    'Русский': '10-46, настраиваемый калибр.',
                }
            },
            {
                property: {
                    'español': 'Puente',
                    'english': 'Bridge',
                    'français': 'Pont',
                    'deutsch': 'Steg',
                    'italiano': 'Ponte',
                    'Русский': 'Мост',
                },
                value: {
                    'español': 'Fijo',
                    'english': 'Fixed',
                    'français': 'Fixe',
                    'deutsch': 'Fest',
                    'italiano': 'Fisso',
                    'Русский': 'Фиксированный',
                }
            },
            {
                property: {
                    'español': 'Pastilla del puente',
                    'english': 'Bridge pickup',
                    'français': 'Micro chevalet',
                    'deutsch': 'Steg-Pickup',
                    'italiano': 'Pickup del ponte',
                    'Русский': 'Звукосниматель моста',
                },
                value: {
                    'español': 'Air Norton DP193',
                    'english': 'Air Norton DP193',
                    'français': 'Air Norton DP193',
                    'deutsch': 'Air Norton DP193',
                    'italiano': 'Air Norton DP193',
                    'Русский': 'Air Norton DP193',
                }
            },
            {
                property: {
                    'español': 'Pastilla del cuello',
                    'english': 'Neck pickup',
                    'français': 'Micro manche',
                    'deutsch': 'Hals-Pickup',
                    'italiano': 'Pickup del manico',
                    'Русский': 'Звукосниматель грифа',
                },
                value: {
                    'español': 'The Tone Zone DP155',
                    'english': 'The Tone Zone DP155',
                    'français': 'The Tone Zone DP155',
                    'deutsch': 'The Tone Zone DP155',
                    'italiano': 'The Tone Zone DP155',
                    'Русский': 'The Tone Zone DP155',
                }
            },
            {
                property: {
                    'español': 'Color',
                    'english': 'Color',
                    'français': 'Couleur',
                    'deutsch': 'Farbe',
                    'italiano': 'Colore',
                    'Русский': 'Цвет',
                },
                value: {
                    'español': 'Natural Negro / Pick Guard Natural corte de raíz',
                    'english': 'Natural Black / Natural Root Cut Pick Guard',
                    'français': 'Naturel Noir / Protection Naturelle Découpée Racine',
                    'deutsch': 'Naturschwarz / Naturwurzelschnitt Schlagbrett',
                    'italiano': 'Nero Naturale / Protezione Naturale Taglio Radice',
                    'Русский': 'Натуральный черный / Натуральная резка корня защиты',
                }
            },
            {
                property: {
                    'español': 'País de origen',
                    'english': 'Country of origin',
                    'français': 'Pays d\'origine',
                    'deutsch': 'Herkunftsland',
                    'italiano': 'Paese d\'origine',
                    'Русский': 'Страна происхождения',
                },
                value: {
                    'español': 'Colombia',
                    'english': 'Colombia',
                    'français': 'Colombie',
                    'deutsch': 'Kolumbien',
                    'italiano': 'Colombia',
                    'Русский': 'Колумбия',
                }
            },
            {
                property: {
                    'español': 'Controles',
                    'english': 'Controls',
                    'français': 'Contrôles',
                    'deutsch': 'Regler',
                    'italiano': 'Controlli',
                    'Русский': 'Управление',
                },
                value: {
                    'español': 'Volumen, Tono y push-pull.',
                    'english': 'Volume, Tone, and push-pull.',
                    'français': 'Volume, Tonalité et push-pull.',
                    'deutsch': 'Lautstärke, Ton und Push-Pull.',
                    'italiano': 'Volume, Tono e push-pull.',
                    'Русский': 'Громкость, Тон и тяни-толкай.',
                }
            },            
            {
                property: {
                    'español': 'Clavijas',
                    'english': 'Tuning pegs',
                    'français': 'Accordeurs',
                    'deutsch': 'Stimmmechaniken',
                    'italiano': 'Meccaniche di accordatura',
                    'Русский': 'Колки',
                },
                value: {
                    'español': 'No incluye',
                    'english': 'Not included',
                    'français': 'Non inclus',
                    'deutsch': 'Nicht enthalten',
                    'italiano': 'Non incluso',
                    'Русский': 'Не включено',
                }
            },            
        ]
    },
]);