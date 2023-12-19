type Multilingual = {
    'es': string,
    'en': string,
    'fr': string,
    'de': string,
    'it': string,
    'ru': string,
}

type Table = {
    'property': Multilingual | null,
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
    oldPrice: string,
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
            'es': 'Boa constrictor',
            'en': 'Boa constrictor',
            'fr': 'Boa constrictor',
            'de': 'Boa constrictor',
            'it': 'Boa constrictor',
            'ru': 'Boa constrictor',
        },
        category: 'fabricacion',
        edition: {
            'es': 'CCS-Boa constrictor',
            'en': 'CCS-Boa constrictor',
            'fr': 'CCS-Boa constrictor',
            'de': 'CCS-Boa constrictor',
            'it': 'CCS-Boa constrictor',
            'ru': 'CCS-Boa constrictor',
        },    
        description: {
            'es': 'Su construcción única en una sola pieza y cuerpo de caoba colombiana la convierten en la opción perfecta para el escenario.',
            'en': 'Its unique one-piece construction and Colombian mahogany body make it the perfect choice for the stage.',
            'fr': 'Sa construction unique en une seule pièce et son corps en acajou colombien en font le choix parfait pour la scène.',
            'de': 'Die einzigartige Einzelstück-Konstruktion und der Korpus aus kolumbianischem Mahagoni machen sie zur perfekten Wahl für die Bühne.',
            'it': 'La sua costruzione unica in un unico pezzo e il corpo in mogano colombiano la rendono la scelta perfetta per il palco.',
            'ru': 'Её уникальная конструкция из одного куска и корпус из колумбийского красного дерева делают её идеальным выбором для сцены.',
        },           
        oldPrice: '2.800.000.00 COP',
        price: '2.600.000.00 COP',
        fileNames: [
            'guitarre2front',
            'guitarre2derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'webp',
        paragraph: {
            'es': `La guitarra eléctrica CCS-Boa constrictor tiene un diseño neoclásico (tipo Explorer) perfecto para rock pesado. Es una guitarra propia de escenario, con su construcción tipo neck-through y un cuerpo completamente de caoba, madera de las montañas de Colombia. El fretboard de ébano y granadillo tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y sostenimiento, manteniendo así el sonido antes de desvanecerse y finalizar. Cuenta con un Humbucker Dimarzio (DP159FBK) super distortion, con controles de volumen y tono, lo cual proporciona un alto y ajustado rendimiento. Este es nuestro color de lanzamiento: un negro mate con desvanecimiento en la parte anterior del mástil, efecto propio de la madera utilizada para la fabricación.`,
            'en': `The CCS-Boa constrictor electric guitar has a neoclassical design (Explorer type), perfect for heavy rock. It is a stage-ready guitar, with a neck-through construction and a body entirely made of mahogany, wood from the mountains of Colombia. The ebony and rosewood fretboard has 22 frets along a 24.75-inch scale, standard, designed to provide speed and comfort. The headstock design makes it even more aggressive on stage. It is a lightweight guitar with great resonance and sustain, thus maintaining the sound before fading away. It features a Dimarzio Humbucker (DP159FBK) super distortion, with volume and tone controls, providing a high and tight performance. This is our launch color: a matte black with fading on the front of the neck, a characteristic effect of the wood used for manufacturing.`,
            'fr': `La guitare électrique CCS-Boa constrictor a un design néoclassique (type Explorer) parfait pour le rock lourd. C'est une guitare prête pour la scène, avec une construction de type neck-through et un corps entièrement en acajou, bois des montagnes de Colombie. La touche en ébène et palissandre comporte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. La conception de la tête la rend encore plus agressive sur scène. C'est une guitare légère avec une grande résonance et un soutien, maintenant ainsi le son avant de s'estomper et de se terminer. Elle est équipée d'un Humbucker Dimarzio (DP159FBK) à super distorsion, avec des commandes de volume et de tonalité, offrant une performance puissante et serrée. Voici notre couleur de lancement : un noir mat avec un fondu sur l\'avant du manche, un effet caractéristique du bois utilisé pour la fabrication.`,
            'de': `Die CCS-Boa Constrictor E-Gitarre hat ein neoklassisches Design (Explorer-Typ), perfekt für Heavy Rock. Es ist eine Bühnen-gerechte Gitarre mit einer durchgehenden Halskonstruktion und einem Korpus aus Mahagoni, Holz aus den Bergen Kolumbiens. Das Griffbrett aus Ebenholz und Palisander hat 22 Bünde entlang einer Skala von 24,75 Zoll, standardmäßig gestaltet für Geschwindigkeit und Komfort. Das Kopfplattendesign macht sie noch aggressiver auf der Bühne. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, wodurch der Klang erhalten bleibt, bevor er verklingt und endet. Sie verfügt über einen Dimarzio Humbucker (DP159FBK) Super Distortion, mit Lautstärke- und Tonreglern, die eine hohe und straffe Leistung bieten. Dies ist unsere Einführungsfarbe: ein mattes Schwarz mit Verblassen auf der Vorderseite des Halses, ein charakteristischer Effekt des für die Herstellung verwendeten Holzes.`,
            'it': `La chitarra elettrica CCS-Boa constrictor ha un design neoclassico (tipo Explorer), perfetto per il rock pesante. È una chitarra pronta per il palco, con una costruzione neck-through e un corpo interamente in mogano, legno delle montagne della Colombia. La tastiera in ebano e palissandro ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. Il design della paletta la rende ancora più aggressiva sul palco. È una chitarra leggera con grande risonanza e sustain, mantenendo il suono prima di dissolversi e concludersi. È dotata di un Humbucker Dimarzio (DP159FBK) super distortion, con controlli di volume e tono, offrendo una prestazione alta e serrata. Questo è il nostro colore di lancio: un nero opaco con sfumatura sulla parte anteriore del manico, un effetto caratteristico del legno utilizzato per la fabbricazione.`,
            'ru': `Электрогитара CCS-Boa constrictor имеет неоклассический дизайн (тип Explorer), идеально подходящий для тяжёлого рока. Это гитара готовая для выступлений, с конструкцией типа neck-through и корпусом полностью из красного дерева, древесина из гор Колумбии. Гриф из эбенового и палисандрового дерева имеет 22 лада на длинной шкале 24,75 дюйма, стандарт, разработанный для обеспечения скорости и комфорта. Дизайн головы делает её еще более агрессивной на сцене. Это легкая гитара с отличной резонансной и поддерживающей способностью, сохраняя звук перед тем, как он затухнет и завершится. Он оснащен звукоснимателем Dimarzio (DP159FBK) Super Distortion, с регуляторами громкости и тона, обеспечивающими высокое и плотное исполнение. Это наш цвет для запуска: матово-черный с затуханием спереди на грифе, характерный эффект дерева, используемого для изготовления.`,    
        },
        features: ["personalizable", "fabricacionCompleta", "conForro", "garantia"],
        table:[
            {
                property: {
                    'es': 'Tiempo estimado de fabricación',
                    'en': 'Estimated manufacturing time',
                    'fr': 'Temps de fabrication estimé',
                    'de': 'Geschätzte Herstellungszeit',
                    'it': 'Tempo di produzione stimato',
                    'ru': 'Предполагаемое время производства',
                },
                value: {
                    'es': '2 meses (60 días de calendario)',
                    'en': '2 months (60 calendar days)',
                    'fr': '2 mois (60 jours calendaires)',
                    'de': '2 Monate (60 Kalendertage)',
                    'it': '2 mesi (60 giorni di calendario)',
                    'ru': '2 месяца (60 календарных дней)',
                }
            },
            {
                property: {
                    'es': 'Cuerdas',
                    'en': 'Strings',
                    'fr': 'Cordes',
                    'de': 'Saiten',
                    'it': 'Corde',
                    'ru': 'Струны',
                },
                value: {
                    'es': '10-46, calibre personalizable.',
                    'en': '10-46, customizable gauge.',
                    'fr': '10-46, calibre personnalisable.',
                    'de': '10-46, anpassbares Kaliber.',
                    'it': '10-46, calibro personalizzabile.',
                    'ru': '10-46, настраиваемый калибр.',
                }
            },
            {
                property: {
                    'es': 'Puente',
                    'en': 'Bridge',
                    'fr': 'Pont',
                    'de': 'Steg',
                    'it': 'Ponte',
                    'ru': 'Мост',
                },
                value: {
                    'es': 'Fijo',
                    'en': 'Fixed',
                    'fr': 'Fixe',
                    'de': 'Fest',
                    'it': 'Fisso',
                    'ru': 'Фиксированный',
                }
            },
            {
                property: {
                    'es': 'Pastilla del puente',
                    'en': 'Bridge pickup',
                    'fr': 'Micro chevalet',
                    'de': 'Steg-Pickup',
                    'it': 'Pickup del ponte',
                    'ru': 'Звукосниматель моста',
                },
                value: {
                    'es': 'Dimarzio (DP159FBK)',
                    'en': 'Dimarzio (DP159FBK)',
                    'fr': 'Dimarzio (DP159FBK)',
                    'de': 'Dimarzio (DP159FBK)',
                    'it': 'Dimarzio (DP159FBK)',
                    'ru': 'Dimarzio (DP159FBK)',
                }
            },
            {
                property: {
                    'es': 'Pastilla del cuello',
                    'en': 'Neck pickup',
                    'fr': 'Micro manche',
                    'de': 'Hals-Pickup',
                    'it': 'Pickup del manico',
                    'ru': 'Звукосниматель грифа',
                },
                value: {
                    'es': 'No incluye, sin embargo, al interior del cuerpo tiene la adaptación para un segundo micrófono.',
                    'en': 'Not included, however, inside the body has the provision for a second microphone.',
                    'fr': 'Non inclus, cependant, à l\'intérieur du corps, il y a la possibilité d\'un deuxième microphone.',
                    'de': 'Nicht enthalten, jedoch hat das Innere des Gehäuses die Vorrichtung für ein zweites Mikrofon.',
                    'it': 'Non incluso, tuttavia, all\'interno del corpo è prevista la predisposizione per un secondo microfono.',
                    'ru': 'Не включено, однако внутри корпуса есть предусмотренное место для второго микрофона.',
                }
            },
            {
                property: {
                    'es': 'Color',
                    'en': 'Color',
                    'fr': 'Couleur',
                    'de': 'Farbe',
                    'it': 'Colore',
                    'ru': 'Цвет',
                },
                value: {
                    'es': 'Negro mate',
                    'en': 'Matte black',
                    'fr': 'Noir mat',
                    'de': 'Matt Schwarz',
                    'it': 'Nero opaco',
                    'ru': 'Матово-черный',
                }
            },
            {
                property: {
                    'es': 'País de origen',
                    'en': 'Country of origin',
                    'fr': 'Pays d\'origine',
                    'de': 'Herkunftsland',
                    'it': 'Paese d\'origine',
                    'ru': 'Страна происхождения',
                },
                value: {
                    'es': 'Colombia',
                    'en': 'Colombia',
                    'fr': 'Colombie',
                    'de': 'Kolumbien',
                    'it': 'Colombia',
                    'ru': 'Колумбия',
                }
            },
            {
                property: {
                    'es': 'Controles',
                    'en': 'Controls',
                    'fr': 'Contrôles',
                    'de': 'Regler',
                    'it': 'Controlli',
                    'ru': 'Управление',
                },
                value: {
                    'es': `1 perilla de volumen y 1 perilla de tono`,
                    'en': `1 volume knob and 1 tone knob`,
                    'fr': `1 bouton de volume et 1 bouton de tonalité`,
                    'de': `1 Lautstärkeregler und 1 Tonregler`,
                    'it': `1 manopola del volume e 1 manopola del tono`,
                    'ru': `1 регулятор громкости и 1 регулятор тона`,
                }
            },
            {
                property: {
                    'es': 'Clavijas',
                    'en': 'Tuning pegs',
                    'fr': 'Accordeurs',
                    'de': 'Stimmmechaniken',
                    'it': 'Meccaniche di accordatura',
                    'ru': 'Колки',
                },
                value: {
                    'es': 'De los mismos fabricantes de Grover',
                    'en': 'From the same manufacturers as Grover',
                    'fr': 'Des mêmes fabricants que Grover',
                    'de': 'Vom gleichen Hersteller wie Grover',
                    'it': 'Dagli stessi produttori di Grover',
                    'ru': 'От тех же производителей, что и Grover',
                }
            },
        ]
    },
    {
        name: {
            'es': 'Asio clamator',
            'en': 'Asio clamator',
            'fr': 'Asio clamator',
            'de': 'Asio clamator',
            'it': 'Asio clamator',
            'ru': 'Asio clamator',
        },
        category: 'fabricacion',
        edition: {
            'es': 'CCS-Asio clamator',
            'en': 'CCS-Asio clamator',
            'fr': 'CCS-Asio clamator',
            'de': 'CCS-Asio clamator',
            'it': 'CCS-Asio clamator',
            'ru': 'CCS-Asio clamator',
        },
        description: {
            'es': '¡Eleva tu música con esta guitarra ligera, resonante y llena de personalidad!',
            'en': 'Elevate your music with this lightweight, resonant, and personality-filled guitar!',
            'fr': 'Élevez votre musique avec cette guitare légère, résonnante et pleine de personnalité !',
            'de': 'Heben Sie Ihre Musik mit dieser leichten, resonanten und persönlichkeitsvollen Gitarre hervor!',
            'it': 'Eleva la tua musica con questa chitarra leggera, sonora e piena di personalità!',
            'ru': 'Поднимите свою музыку с этой легкой, звучной и полной индивидуальности гитарой!',
        },        
        oldPrice: '2.800.000.00 COP',
        price: '2.600.000.00 COP',
        fileNames: [
            'guitarre3front',
            'guitarre3derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'webp',
        paragraph: {
            'es': `La guitarra eléctrica CCS-Asio clamator tiene un diseño neoclásico perfecto para tocar metal (Death-Black). Es una guitarra propia de escenario, con su construcción tipo neck-through y un cuerpo completamente de caoba, madera de las montañas de Colombia. El fretboard de ébano y granadillo tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y sostenimiento, manteniendo así el sonido antes de desvanecerse y finalizar. Cuenta con un Humbucker Dimarzio (DP159FBK) de súper distorsión, con controles de volumen y tono, proporcionando un alto y ajustado rendimiento. Este es nuestro color de lanzamiento natural y con un negro mate, el cual realza las vetas de la madera.`,
            'en': `The CCS-Asio clamator electric guitar features a neoclassical design perfect for playing metal (Death-Black). It's a stage-ready guitar with a neck-through construction and a body entirely made of mahogany, wood from the mountains of Colombia. The ebony and granadillo fretboard has 22 frets along a 24.75-inch scale, standard, designed to offer speed and comfort. The headstock design makes it even more aggressive on stage. It's a lightweight guitar with great resonance and sustain, thus maintaining the sound before fading and finishing. It comes with a Humbucker Dimarzio (DP159FBK) super distortion, with volume and tone controls, providing a high and tight performance. This is our natural launch color and with a matte black, which enhances the wood grain.`,
            'fr': `La guitare électrique CCS-Asio clamator a un design néoclassique parfait pour jouer du métal (Death-Black). C'est une guitare conçue pour la scène, avec une construction de type neck-through et un corps entièrement en acajou, bois des montagnes de Colombie. La touche en ébène et en palissandre comporte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. Le design de la tête la rend encore plus agressive sur scène. C'est une guitare légère avec une grande résonance et un sustain, maintenant ainsi le son avant de s'estomper et de finir. Elle est équipée d'un Humbucker Dimarzio (DP159FBK) super distortion, avec des commandes de volume et de tonalité, offrant une performance haute et serrée. Voici notre couleur de lancement naturelle et avec un noir mat, mettant en valeur les veines du bois.`,
            'de': `Die CCS-Asio Clamator E-Gitarre hat ein neoklassisches Design, perfekt für das Spielen von Metal (Death-Black). Es ist eine Bühnen-gerechte Gitarre mit einer durchgehenden Halskonstruktion und einem Korpus vollständig aus Mahagoni, Holz aus den Bergen Kolumbiens. Das Griffbrett aus Ebenholz und Palisander hat 22 Bünde entlang einer Skala von 24,75 Zoll, standardmäßig gestaltet für Geschwindigkeit und Komfort. Das Kopfplattendesign macht sie noch aggressiver auf der Bühne. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, wodurch der Klang erhalten bleibt, bevor er verklingt und endet. Sie ist ausgestattet mit einem Humbucker Dimarzio (DP159FBK) Super Distortion, mit Lautstärke- und Tonreglern, die eine hohe und straffe Leistung bieten. Dies ist unsere Naturfarbe und mit mattem Schwarz, das die Maserung des Holzes hervorhebt.`,
            'it': `La chitarra elettrica CCS-Asio clamator ha un design neoclassico perfetto per suonare il metal (Death-Black). È una chitarra pronta per il palco, con una costruzione neck-through e un corpo completamente in mogano, legno delle montagne della Colombia. La tastiera in ebano e granadillo ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. Il design della paletta la rende ancora più aggressiva sul palco. È una chitarra leggera con grande risonanza e sustain, mantenendo il suono prima di dissolversi e concludersi. È dotata di un Humbucker Dimarzio (DP159FBK) super distortion, con controlli di volume e tono, offrendo una prestazione alta e serrata. Questo è il nostro colore naturale e con un nero opaco, che esalta le venature del legno.`,
            'ru': `Электрогитара CCS-Asio clamator имеет неоклассический дизайн, идеально подходящий для игры в металл (Death-Black). Это гитара, подходящая для выступлений, с конструкцией типа neck-through и корпусом полностью из красного дерева, древесина из гор Колумбии. Гриф из эбенового и палисандрового дерева имеет 22 лада на длинной шкале 24,75 дюйма, стандарт, разработанный для обеспечения скорости и комфорта. Дизайн головы делает её еще более агрессивной на сцене. Это легкая гитара с отличной резонансной и поддерживающей способностью, сохраняя звук перед тем, как он затухнет и завершится. Он оснащен звукоснимателем Dimarzio (DP159FBK) Super Distortion, с регуляторами громкости и тона, обеспечивающими высокое и плотное исполнение. Это наш цвет для старта: матово-черный с затуханием спереди грифа, уникальный эффект от использованной древесины в производстве.`,    
        },
        features: ["personalizable", "fabricacionCompleta", "conForro", "garantia"],
        table:[
            {
                property: {
                    'es': 'Tiempo estimado de fabricación',
                    'en': 'Estimated manufacturing time',
                    'fr': 'Temps de fabrication estimé',
                    'de': 'Geschätzte Herstellungszeit',
                    'it': 'Tempo di produzione stimato',
                    'ru': 'Предполагаемое время производства',
                },
                value: {
                    'es': '2 meses (60 días de calendario)',
                    'en': '2 months (60 calendar days)',
                    'fr': '2 mois (60 jours calendaires)',
                    'de': '2 Monate (60 Kalendertage)',
                    'it': '2 mesi (60 giorni di calendario)',
                    'ru': '2 месяца (60 календарных дней)',
                }
            },
            {
                property: {
                    'es': 'Cuerdas',
                    'en': 'Strings',
                    'fr': 'Cordes',
                    'de': 'Saiten',
                    'it': 'Corde',
                    'ru': 'Струны',
                },
                value: {
                    'es': '10-46, calibre personalizable.',
                    'en': '10-46, customizable gauge.',
                    'fr': '10-46, calibre personnalisable.',
                    'de': '10-46, anpassbares Kaliber.',
                    'it': '10-46, calibro personalizzabile.',
                    'ru': '10-46, настраиваемый калибр.',
                }
            },
            {
                property: {
                    'es': 'Puente',
                    'en': 'Bridge',
                    'fr': 'Pont',
                    'de': 'Steg',
                    'it': 'Ponte',
                    'ru': 'Мост',
                },
                value: {
                    'es': 'Fijo',
                    'en': 'Fixed',
                    'fr': 'Fixe',
                    'de': 'Fest',
                    'it': 'Fisso',
                    'ru': 'Фиксированный',
                }
            },
            {
                property: {
                    'es': 'Pastilla del puente',
                    'en': 'Bridge pickup',
                    'fr': 'Micro chevalet',
                    'de': 'Steg-Pickup',
                    'it': 'Pickup del ponte',
                    'ru': 'Звукосниматель моста',
                },
                value: {
                    'es': 'Dimarzio (DP159FBK)',
                    'en': 'Dimarzio (DP159FBK)',
                    'fr': 'Dimarzio (DP159FBK)',
                    'de': 'Dimarzio (DP159FBK)',
                    'it': 'Dimarzio (DP159FBK)',
                    'ru': 'Dimarzio (DP159FBK)',
                }
            },
            {
                property: {
                    'es': 'Pastilla del cuello',
                    'en': 'Neck pickup',
                    'fr': 'Micro manche',
                    'de': 'Hals-Pickup',
                    'it': 'Pickup del manico',
                    'ru': 'Звукосниматель грифа',
                },
                value: {
                    'es': 'No incluye, sin embargo, al interior del cuerpo tiene la adaptación para un segundo micrófono.',
                    'en': 'Not included, however, inside the body has the provision for a second microphone.',
                    'fr': 'Non inclus, cependant, à l\'intérieur du corps, il y a la possibilité d\'un deuxième microphone.',
                    'de': 'Nicht enthalten, jedoch hat das Innere des Gehäuses die Vorrichtung für ein zweites Mikrofon.',
                    'it': 'Non incluso, tuttavia, all\'interno del corpo è prevista la predisposizione per un secondo microfono.',
                    'ru': 'Не включено, однако внутри корпуса есть предусмотренное место для второго микрофона.',
                }
            },
            {
                property: {
                    'es': 'Color',
                    'en': 'Color',
                    'fr': 'Couleur',
                    'de': 'Farbe',
                    'it': 'Colore',
                    'ru': 'Цвет',
                },
                value: {
                    'es': 'Natural / Pick Guard Negro mate',
                    'en': 'Natural / Matte Black Pick Guard',
                    'fr': 'Naturel / Protection noire mate',
                    'de': 'Natur / Mattschwarze Schlagplatte',
                    'it': 'Naturale / Protezione nera opaca',
                    'ru': 'Натуральный / Матовая черная защитная панель',
                }
            },
            {
                property: {
                    'es': 'País de origen',
                    'en': 'Country of origin',
                    'fr': 'Pays d\'origine',
                    'de': 'Herkunftsland',
                    'it': 'Paese d\'origine',
                    'ru': 'Страна происхождения',
                },
                value: {
                    'es': 'Colombia',
                    'en': 'Colombia',
                    'fr': 'Colombie',
                    'de': 'Kolumbien',
                    'it': 'Colombia',
                    'ru': 'Колумбия',
                }
            },
            {
                property: {
                    'es': 'Controles',
                    'en': 'Controls',
                    'fr': 'Contrôles',
                    'de': 'Regler',
                    'it': 'Controlli',
                    'ru': 'Управление',
                },
                value: {
                    'es': `1 perilla de volumen y 1 perilla de tono`,
                    'en': `1 volume knob and 1 tone knob`,
                    'fr': `1 bouton de volume et 1 bouton de tonalité`,
                    'de': `1 Lautstärkeregler und 1 Tonregler`,
                    'it': `1 manopola del volume e 1 manopola del tono`,
                    'ru': `1 регулятор громкости и 1 регулятор тона`,
                }
            },
            {
                property: {
                    'es': 'Clavijas',
                    'en': 'Tuning pegs',
                    'fr': 'Accordeurs',
                    'de': 'Stimmmechaniken',
                    'it': 'Meccaniche di accordatura',
                    'ru': 'Колки',
                },
                value: {
                    'es': 'De los mismos fabricantes de Grover',
                    'en': 'From the same manufacturers as Grover',
                    'fr': 'Des mêmes fabricants que Grover',
                    'de': 'Vom gleichen Hersteller wie Grover',
                    'it': 'Dagli stessi produttori di Grover',
                    'ru': 'От тех же производителей, что и Grover',
                }
            },            
        ]
    },
    {
        name: {
            'es': 'Noctilia',
            'en': 'Noctilia',
            'fr': 'Noctilia',
            'de': 'Noctilia',
            'it': 'Noctilia',
            'ru': 'Noctilia',
        },
        category: 'fabricacion',
        edition: {
            'es': 'CCS-Noctilia',
            'en': 'CCS-Noctilia',
            'fr': 'CCS-Noctilia',
            'de': 'CCS-Noctilia',
            'it': 'CCS-Noctilia',
            'ru': 'CCS-Noctilia',
        },    
        description: {
            'es': `¡Experimenta el poder y la elegancia con la guitarra eléctrica CCS-Noctilia!`,
            'en': `Experience the power and elegance with the electric guitar CCS-Noctilia!`,
            'fr': `Expérimentez la puissance et l'élégance avec la guitare électrique CCS-Noctilia !`,
            'de': `Erleben Sie die Kraft und Eleganz mit der E-Gitarre CCS-Noctilia!`,
            'it': `Vivi la potenza e l'eleganza con la chitarra elettrica CCS-Noctilia!`,
            'ru': `Почувствуйте мощь и элегантность с электрогитарой CCS-Noctilia!`,
        },           
        oldPrice: '3.600.000.00 COP',
        price: '3.400.000.00 COP',
        fileNames: [
            'noctilioFront',
            'noctilioDerriere',
        ],
        allowSmallSize: true,
        filesExtension: 'webp',
        paragraph: {
            'es': `La guitarra eléctrica CCS-Noctilia tiene un diseño LP versátil. Es una guitarra propia de escenario, con su construcción tipo neck-through y un cuerpo completamente de caoba, madera de las montañas de Colombia. El fretboard de ébano y granadillo tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y sustain, manteniendo así el sonido antes de desvanecerse y acabar. Cuenta con dos poderosos Humbuckers Seymour Duncan Black Winter, cuenta con volumen y tono, lo cual proporciona un alto y ajustado rendimiento.`,
            'en': `The electric guitar CCS-Noctilia has a versatile LP design. It is a stage-ready guitar, with its neck-through construction and a body made entirely of mahogany, wood from the mountains of Colombia. The ebony and rosewood fretboard has 22 frets along a 24.75-inch scale, standard, designed to provide speed and comfort. The headstock design makes it even more aggressive on stage. It is a lightweight guitar with great resonance and sustain, thus maintaining the sound before fading away. It features two powerful Seymour Duncan Black Winter Humbuckers, with volume and tone controls, providing high and tight performance.`,
            'fr': `La guitare électrique CCS-Noctilia a un design LP polyvalent. C'est une guitare de scène, avec sa construction à travers le manche et un corps entièrement en acajou, bois des montagnes de Colombie. La touche en ébène et palissandre comporte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. La conception de la tête la rend encore plus agressive sur scène. C'est une guitare légère avec une grande résonance et sustain, maintenant ainsi le son avant de s'estomper et de se terminer. Elle est équipée de deux puissants micros Humbuckers Seymour Duncan Black Winter, avec des commandes de volume et de tonalité, offrant des performances élevées et serrées.`,
            'de': `Die E-Gitarre CCS-Noctilia hat ein vielseitiges LP-Design. Es ist eine Bühnen-gerechte Gitarre mit einer durchgehenden Halskonstruktion und einem Korpus aus Mahagoni, Holz aus den Bergen Kolumbiens. Das Ebenholz- und Palisandergriffbrett hat 22 Bünde entlang einer 24,75-Zoll-Skala, Standard, für Geschwindigkeit und Komfort konzipiert. Das Kopfplattendesign macht sie auf der Bühne noch aggressiver. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, wodurch der Klang erhalten bleibt, bevor er verblasst und endet. Sie verfügt über zwei leistungsstarke Seymour Duncan Black Winter-Humbucker mit Lautstärke- und Klangreglern, die eine hohe und straffe Leistung bieten.`,
            'it': `La chitarra elettrica CCS-Noctilia ha un design versatile LP. È una chitarra pronta per il palco, con la sua costruzione tipo neck-through e un corpo interamente in mogano, legno delle montagne della Colombia. La tastiera in ebano e palissandro ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. Il design della testa la rende ancora più aggressiva durante una performance. È una chitarra leggera con grande risonanza e sustain, mantenendo quindi il suono prima di dissolversi e finire. È dotata di due potenti Humbucker Seymour Duncan Black Winter, con controlli di volume e tono, offrendo prestazioni elevate e serrate.`,
            'ru': `Электрогитара CCS-Noctilia имеет универсальный дизайн LP. Это гитара готова к выступлению, с конструкцией грифа типа neck-through и корпусом полностью из красного дерева, дерева из гор Колумбии. Накладка из чёрного дерева и палисандра имеет 22 лада вдоль шкалы 24,75 дюйма, стандарт, создана для обеспечения скорости и комфорта. Дизайн головы делает её ещё более агрессивной на сцене. Это легкая гитара с отличной резонансной и длительной стойкостью, сохраняя звук перед затуханием и окончанием. Она оснащена двумя мощными звукоснимателями Seymour Duncan Black Winter, с регуляторами громкости и тона, обеспечивая высокую и плотную производительность.`,    
        },
        features: ["personalizable", "fabricacionCompleta", "conForro", "garantia"],
        table:[
            {
                property: {
                    'es': 'Tiempo estimado de fabricación',
                    'en': 'Estimated manufacturing time',
                    'fr': 'Temps de fabrication estimé',
                    'de': 'Geschätzte Herstellungszeit',
                    'it': 'Tempo di produzione stimato',
                    'ru': 'Предполагаемое время производства',
                },
                value: {
                    'es': '2 meses (60 días de calendario)',
                    'en': '2 months (60 calendar days)',
                    'fr': '2 mois (60 jours calendaires)',
                    'de': '2 Monate (60 Kalendertage)',
                    'it': '2 mesi (60 giorni di calendario)',
                    'ru': '2 месяца (60 календарных дней)',
                }
            },
            {
                property: {
                    'es': 'Cuerdas',
                    'en': 'Strings',
                    'fr': 'Cordes',
                    'de': 'Saiten',
                    'it': 'Corde',
                    'ru': 'Струны',
                },
                value: {
                    'es': '10-46, calibre personalizable.',
                    'en': '10-46, customizable gauge.',
                    'fr': '10-46, calibre personnalisable.',
                    'de': '10-46, anpassbares Kaliber.',
                    'it': '10-46, calibro personalizzabile.',
                    'ru': '10-46, настраиваемый калибр.',
                }
            },
            {
                property: {
                    'es': 'Puente',
                    'en': 'Bridge',
                    'fr': 'Pont',
                    'de': 'Steg',
                    'it': 'Ponte',
                    'ru': 'Мост',
                },
                value: {
                    'es': 'Fijo',
                    'en': 'Fixed',
                    'fr': 'Fixe',
                    'de': 'Fest',
                    'it': 'Fisso',
                    'ru': 'Фиксированный',
                }
            },
            {
                property: {
                    'es': 'Pastilla del puente',
                    'en': 'Bridge pickup',
                    'fr': 'Micro chevalet',
                    'de': 'Steg-Pickup',
                    'it': 'Pickup del ponte',
                    'ru': 'Звукосниматель моста',
                },
                value: {
                    'es': 'Seymour Duncan Black Winter-Bridge',
                    'en': 'Seymour Duncan Black Winter-Bridge',
                    'fr': 'Seymour Duncan Black Winter-Bridge',
                    'de': 'Seymour Duncan Black Winter-Bridge',
                    'it': 'Seymour Duncan Black Winter-Bridge',
                    'ru': 'Seymour Duncan Black Winter-Bridge',
                }
            },
            {
                property: {
                    'es': 'Pastilla del cuello',
                    'en': 'Neck pickup',
                    'fr': 'Micro manche',
                    'de': 'Hals-Pickup',
                    'it': 'Pickup del manico',
                    'ru': 'Звукосниматель грифа',
                },
                value: {
                    'es': 'Seymour Duncan Black Winter-Neck',
                    'en': 'Seymour Duncan Black Winter-Neck',
                    'fr': 'Seymour Duncan Black Winter-Neck',
                    'de': 'Seymour Duncan Black Winter-Neck',
                    'it': 'Seymour Duncan Black Winter-Neck',
                    'ru': 'Seymour Duncan Black Winter-Neck',
                }
            },
            {
                property: {
                    'es': 'Color',
                    'en': 'Color',
                    'fr': 'Couleur',
                    'de': 'Farbe',
                    'it': 'Colore',
                    'ru': 'Цвет',
                },
                value: {
                    'es': 'Negro / Verde',
                    'en': 'Black / Green',
                    'fr': 'Noir / Vert',
                    'de': 'Schwarz / Grün',
                    'it': 'Nero / Verde',
                    'ru': 'Черный / Зеленый',
                }
            },
            {
                property: {
                    'es': 'País de origen',
                    'en': 'Country of origin',
                    'fr': 'Pays d\'origine',
                    'de': 'Herkunftsland',
                    'it': 'Paese d\'origine',
                    'ru': 'Страна происхождения',
                },
                value: {
                    'es': 'Colombia',
                    'en': 'Colombia',
                    'fr': 'Colombie',
                    'de': 'Kolumbien',
                    'it': 'Colombia',
                    'ru': 'Колумбия',
                }
            },
            {
                property: {
                    'es': 'Controles',
                    'en': 'Controls',
                    'fr': 'Contrôles',
                    'de': 'Regler',
                    'it': 'Controlli',
                    'ru': 'Управление',
                },
                value: {
                    'es': '2 perillas de volumen y 2 perillas de tono',
                    'en': '2 volume knobs and 2 tone knobs',
                    'fr': '2 boutons de volume et 2 boutons de tonalité',
                    'de': '2 Lautstärkeregler und 2 Klangregler',
                    'it': '2 manopole del volume e 2 manopole del tono',
                    'ru': '2 регулятора громкости и 2 регулятора тона',
                }
            },
            {
                property: {
                    'es': 'Clavijas',
                    'en': 'Tuning pegs',
                    'fr': 'Accordeurs',
                    'de': 'Stimmmechaniken',
                    'it': 'Meccaniche di accordatura',
                    'ru': 'Колки',
                },
                value: {
                    'es': 'De los mismos fabricantes de Grover',
                    'en': 'From the same manufacturers as Grover',
                    'fr': 'Des mêmes fabricants que Grover',
                    'de': 'Vom gleichen Hersteller wie Grover',
                    'it': 'Dagli stessi produttori di Grover',
                    'ru': 'От тех же производителей, что и Grover',
                }
            },
        ]
    },
    {
        name: {
            'es': 'Argia',
            'en': 'Argia',
            'fr': 'Argia',
            'de': 'Argia',
            'it': 'Argia',
            'ru': 'Argia',
        },
        category: 'fabricacion',
        edition: {
            'es': 'CCS-Argia',
            'en': 'CCS-Argia',
            'fr': 'CCS-Argia',
            'de': 'CCS-Argia',
            'it': 'CCS-Argia',
            'ru': 'CCS-Argia',
        },    
        description: {
            'es': `Diseño único, madera exclusiva de Colombia, y potentes pickups para un rendimiento incomparable. ¡Adquiere la CCS-Argia ahora!`,
            'en': `Unique design, exclusive wood from Colombia, and powerful pickups for unparalleled performance. Get the CCS-Argia now!`,
            'fr': `Design unique, bois exclusif de Colombie et micros puissants pour des performances inégalées. Procurez-vous la CCS-Argia dès maintenant !`,
            'de': `Einzigartiges Design, exklusives Holz aus Kolumbien und leistungsstarke Tonabnehmer für eine unvergleichliche Leistung. Holen Sie sich jetzt die CCS-Argia!`,
            'it': `Design unico, legno esclusivo dalla Colombia e pickup potenti per prestazioni incomparabili. Acquista subito la CCS-Argia!`,
            'ru': `Уникальный дизайн, эксклюзивная древесина из Колумбии и мощные звукосниматели для непревзойденной производительности. Получите CCS-Argia сейчас!`,
        },           
        oldPrice: '2.500.000.00 COP',
        price: '2.300.000.00 COP',
        fileNames: [
            'argiaBaseFront',
            'argiaBaseDerriere',
        ],
        allowSmallSize: true,
        filesExtension: 'webp',
        paragraph: {
            'es': `La guitarra eléctrica CCS-Argia tiene un diseño versátil. Es una traveler guitar, con su construcción tipo neck-through y un cuerpo completamente de Flor morado, madera de las montañas de Colombia. El fretboard de ébano y granadillo, tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. Es una guitarra liviana de gran resonancia y sustain, manteniendo así el sonido antes de desvanecerse y acabar. Cuenta con un Humbucker de alta potencia en el puente y un Pickup de bobina única y cuenta con un control de volumen lo cual proporciona un alto y ajustado rendimiento. Viene con una base desmontable para soporte.`,
            'en': `The electric guitar CCS-Argia has a versatile design. It is a traveler guitar, with its neck-through construction and a body made entirely of Colombian Purpleheart wood. The ebony and rosewood fretboard has 22 frets along a 24.75-inch standard scale, designed to provide speed and comfort. It is a lightweight guitar with great resonance and sustain, thus maintaining the sound before fading away. It features a high-power Humbucker at the bridge and a single-coil pickup, with a volume control providing a high and tight performance. Comes with a detachable base for support.`,
            'fr': `La guitare électrique CCS-Argia a un design polyvalent. C'est une traveler guitar, avec sa construction de type neck-through et un corps entièrement en bois de pourpre, provenant des montagnes de Colombie. La touche en ébène et palissandre, avec 22 frettes le long d'une échelle standard de 24,75 pouces, est conçue pour offrir vitesse et confort. C'est une guitare légère avec une grande résonance et sustain, maintenant ainsi le son avant de s'estomper. Elle est équipée d'un Humbucker haute puissance au chevalet et d'un micro à bobine simple, avec un contrôle de volume offrant une performance puissante et précise. Livré avec un socle détachable pour le soutien.`,
            'de': `Die elektrische Gitarre CCS-Argia hat ein vielseitiges Design. Es ist eine Traveler-Gitarre mit Konstruktion vom Typ Neck-through und einem Korpus aus Purple Flower-Holz, einem Holz aus den Bergen Kolumbiens. Das Griffbrett aus Ebenholz und Palisander hat 22 Bünde entlang einer Standardskala von 24,75 Zoll und ist für Geschwindigkeit und Komfort ausgelegt. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, die den Klang erhält, bevor er verblasst und endet. Sie verfügt über einen leistungsstarken Humbucker am Steg und einen Single-Coil-Pickup, mit einem Lautstärkeregler für eine kraftvolle und präzise Leistung. Kommt mit einem abnehmbaren Fuß für Unterstützung.`,
            'it': `La chitarra elettrica CCS-Argia ha un design versatile. È una traveler guitar, con la sua costruzione tipo neck-through e un corpo completamente in legno di Fiori viola, proveniente dalle montagne della Colombia. La tastiera in ebano e palissandro ha 22 tasti lungo una scala standard di 24,75 pollici, progettata per offrire velocità e comfort. È una chitarra leggera con una grande risonanza e sustain, mantenendo quindi il suono prima di dissolversi e finire. Dispone di un Humbucker ad alta potenza al ponte e di un pickup a bobina singola, con un controllo del volume che garantisce prestazioni alte e precise. Viene fornito con una base removibile per il supporto.`,
            'ru': `Электрогитара CCS-Argia имеет универсальный дизайн. Это путешественник-гитара с построением типа neck-through и корпусом полностью из фиолетового дерева Purple Flower, добываемого в горах Колумбии. Накладка из чёрного дерева и палисандра имеет 22 лада вдоль стандартной длины в 24,75 дюйма, создана для обеспечения скорости и комфорта. Это легкая гитара с отличной резонансностью и сустейном, поддерживая звук перед затуханием. В ней установлен высокомощный Humbucker на мостовой части и звукосниматель с одной катушкой, с регулятором громкости, обеспечивающим высокую и точную производительность. Идет с съемной основой для поддержки.`,
        },
        features: ["personalizable", "fabricacionCompleta", "conForro", "garantia"],
        table:[
            {
                property: {
                    'es': 'Tiempo estimado de fabricación',
                    'en': 'Estimated manufacturing time',
                    'fr': 'Temps de fabrication estimé',
                    'de': 'Geschätzte Herstellungszeit',
                    'it': 'Tempo di produzione stimato',
                    'ru': 'Предполагаемое время производства',
                },
                value: {
                    'es': '2 meses (60 días de calendario)',
                    'en': '2 months (60 calendar days)',
                    'fr': '2 mois (60 jours calendaires)',
                    'de': '2 Monate (60 Kalendertage)',
                    'it': '2 mesi (60 giorni di calendario)',
                    'ru': '2 месяца (60 календарных дней)',
                }
            },
            {
                property: {
                    'es': 'Cuerdas',
                    'en': 'Strings',
                    'fr': 'Cordes',
                    'de': 'Saiten',
                    'it': 'Corde',
                    'ru': 'Струны',
                },
                value: {
                    'es': '10-46, calibre personalizable.',
                    'en': '10-46, customizable gauge.',
                    'fr': '10-46, calibre personnalisable.',
                    'de': '10-46, anpassbares Kaliber.',
                    'it': '10-46, calibro personalizzabile.',
                    'ru': '10-46, настраиваемый калибр.',
                }
            },
            {
                property: {
                    'es': 'Puente',
                    'en': 'Bridge',
                    'fr': 'Pont',
                    'de': 'Steg',
                    'it': 'Ponte',
                    'ru': 'Мост',
                },
                value: {
                    'es': 'Fijo',
                    'en': 'Fixed',
                    'fr': 'Fixe',
                    'de': 'Fest',
                    'it': 'Fisso',
                    'ru': 'Фиксированный',
                }
            },
            {
                property: {
                    'es': 'Pastilla del puente',
                    'en': 'Bridge pickup',
                    'fr': 'Micro chevalet',
                    'de': 'Steg-Pickup',
                    'it': 'Pickup del ponte',
                    'ru': 'Звукосниматель моста',
                },
                value: {
                    'es': 'Humbucker de alta potencia',
                    'en': 'High-power humbucker',
                    'fr': 'Humbucker haute puissance',
                    'de': 'Humbucker mit hoher Leistung',
                    'it': 'Humbucker ad alta potenza',
                    'ru': 'Хамбакер высокой мощности',
                }
            },
            {
                property: {
                    'es': 'Pastilla del cuello',
                    'en': 'Neck pickup',
                    'fr': 'Micro manche',
                    'de': 'Hals-Pickup',
                    'it': 'Pickup del manico',
                    'ru': 'Звукосниматель грифа',
                },
                value: {
                    'es': 'Pickup de bobina única',
                    'en': 'Single-coil pickup',
                    'fr': 'Micro à simple bobinage',
                    'de': 'Single-Coil-Tonabnehmer',
                    'it': 'Pickup a bobina singola',
                    'ru': 'Звукосниматель с одной катушкой',
                }
            },
            {
                property: {
                    'es': 'Color',
                    'en': 'Color',
                    'fr': 'Couleur',
                    'de': 'Farbe',
                    'it': 'Colore',
                    'ru': 'Цвет',
                },
                value: {
                    'es': 'Rojo / Negro',
                    'en': 'Red / Black',
                    'fr': 'Rouge / Noir',
                    'de': 'Rot / Schwarz',
                    'it': 'Rosso / Nero',
                    'ru': 'Красный / Черный',
                }
            },
            {
                property: {
                    'es': 'País de origen',
                    'en': 'Country of origin',
                    'fr': 'Pays d\'origine',
                    'de': 'Herkunftsland',
                    'it': 'Paese d\'origine',
                    'ru': 'Страна происхождения',
                },
                value: {
                    'es': 'Colombia',
                    'en': 'Colombia',
                    'fr': 'Colombie',
                    'de': 'Kolumbien',
                    'it': 'Colombia',
                    'ru': 'Колумбия',
                }
            },
            {
                property: {
                    'es': 'Controles',
                    'en': 'Controls',
                    'fr': 'Contrôles',
                    'de': 'Regler',
                    'it': 'Controlli',
                    'ru': 'Управление',
                },
                value: {
                    'es': '1 perilla de volumen',
                    'en': '1 volume knob',
                    'fr': '1 bouton de volume',
                    'de': '1 Lautstärkeregler',
                    'it': '1 manopola del volume',
                    'ru': '1 регулятор громкости',
                }
            },
            {
                property: null,
                value: {
                    'es': 'Multiescala',
                    'en': 'Multiscale',
                    'fr': 'Multiescale',
                    'de': 'Multiscale',
                    'it': 'Multiscale',
                    'ru': 'Мультискейл',
                }
            },            
        ]
    },
]);