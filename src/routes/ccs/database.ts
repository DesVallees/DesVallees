type Multilingual = {
    'es': string,
    'en': string,
    'fr': string,
    'de': string,
    'it': string,
    'ru': string,
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
            'es': 'Su construcción única en una sola pieza y cuerpo de flor morado colombiano la convierten en la opción perfecta para el escenario.',
            'en': 'Its unique one-piece construction and Colombian purpleheart body make it the perfect choice for the stage.',
            'fr': 'Sa construction unique en une seule pièce et son corps en bois de pourpre colombien en font le choix parfait pour la scène.',
            'de': 'Durch ihre einzigartige Einteilige Konstruktion und den kolumbianischen Purpleheart-Korpus ist sie die perfekte Wahl für die Bühne.',
            'it': 'La sua costruzione unica in un pezzo e il corpo in legno di purpleheart colombiano la rendono la scelta perfetta per il palco.',
            'ru': 'Её уникальная конструкция из одного куска и корпус из колумбийского пурпурного дерева делают её идеальным выбором для сцены.',
        },           
        oldPrice: '2,800,000.00 COP',
        price: '2,600,000.00 COP',
        fileNames: [
            'guitarre2front',
            'guitarre2derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'png',
        paragraph: {
            'es': `La guitarra eléctrica CCS-Boa constrictor tiene un diseño neoclásico (tipo Explorer) perfecto para rock pesado. Es una guitarra propia de escenario, con su construcción tipo neck-through y un cuerpo completamente de caoba, madera de las montañas de Colombia. El fretboard de ébano y granadillo tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y sostenimiento, manteniendo así el sonido antes de desvanecerse y finalizar. Cuenta con un Humbucker Dimarzio (DP159FBK) super distortion, con controles de volumen y tono, lo cual proporciona un alto y ajustado rendimiento. Este es nuestro color de lanzamiento: un negro mate con desvanecimiento en la parte anterior del diapasón, efecto propio de la madera utilizada para la fabricación.`,
            'en': `The CCS-Boa constrictor electric guitar has a neoclassical design (Explorer type), perfect for heavy rock. It is a stage-ready guitar, with a neck-through construction and a body entirely made of mahogany, wood from the mountains of Colombia. The ebony and rosewood fretboard has 22 frets along a 24.75-inch scale, standard, designed to provide speed and comfort. The headstock design makes it even more aggressive on stage. It is a lightweight guitar with great resonance and sustain, thus maintaining the sound before fading away. It features a Dimarzio Humbucker (DP159FBK) super distortion, with volume and tone controls, providing a high and tight performance. This is our launch color: a matte black with fading on the front of the fretboard, a unique effect from the wood used in manufacturing.`,
            'fr': `La guitare électrique CCS-Boa constrictor a un design néoclassique (type Explorer) parfait pour le rock lourd. C'est une guitare prête pour la scène, avec une construction de type neck-through et un corps entièrement en acajou, bois des montagnes de Colombie. La touche en ébène et palissandre comporte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. La conception de la tête la rend encore plus agressive sur scène. C'est une guitare légère avec une grande résonance et un soutien, maintenant ainsi le son avant de s'estomper et de se terminer. Elle est équipée d'un Humbucker Dimarzio (DP159FBK) à super distorsion, avec des commandes de volume et de tonalité, offrant une performance puissante et serrée. Voici notre couleur de lancement : un noir mat avec un fondu sur le devant de la touche, un effet unique du bois utilisé dans la fabrication.`,
            'de': `Die CCS-Boa Constrictor E-Gitarre hat ein neoklassisches Design (Explorer-Typ), perfekt für Heavy Rock. Es ist eine Bühnen-gerechte Gitarre mit einer durchgehenden Halskonstruktion und einem Korpus aus Mahagoni, Holz aus den Bergen Kolumbiens. Das Griffbrett aus Ebenholz und Palisander hat 22 Bünde entlang einer Skala von 24,75 Zoll, standardmäßig gestaltet für Geschwindigkeit und Komfort. Das Kopfplattendesign macht sie noch aggressiver auf der Bühne. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, wodurch der Klang erhalten bleibt, bevor er verklingt und endet. Sie verfügt über einen Dimarzio Humbucker (DP159FBK) Super Distortion, mit Lautstärke- und Tonreglern, die eine hohe und straffe Leistung bieten. Dies ist unsere Einführungsfarbe: ein mattschwarzes Finish mit Verblassen auf der Vorderseite des Griffbretts, ein einzigartiger Effekt des verwendeten Holzes bei der Herstellung.`,
            'it': `La chitarra elettrica CCS-Boa constrictor ha un design neoclassico (tipo Explorer), perfetto per il rock pesante. È una chitarra pronta per il palco, con una costruzione neck-through e un corpo interamente in mogano, legno delle montagne della Colombia. La tastiera in ebano e palissandro ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. Il design della paletta la rende ancora più aggressiva sul palco. È una chitarra leggera con grande risonanza e sustain, mantenendo il suono prima di dissolversi e concludersi. È dotata di un Humbucker Dimarzio (DP159FBK) super distortion, con controlli di volume e tono, offrendo una prestazione alta e serrata. Questo è il nostro colore di lancio: un nero opaco con sfumature sulla parte anteriore della tastiera, un effetto unico del legno utilizzato nella produzione.`,
            'ru': `Электрогитара CCS-Boa constrictor имеет неоклассический дизайн (тип Explorer), идеально подходящий для тяжёлого рока. Это гитара готовая для выступлений, с конструкцией типа neck-through и корпусом полностью из красного дерева, древесина из гор Колумбии. Гриф из эбенового и палисандрового дерева имеет 22 лада на длинной шкале 24,75 дюйма, стандарт, разработанный для обеспечения скорости и комфорта. Дизайн головы делает её еще более агрессивной на сцене. Это легкая гитара с отличной резонансной и поддерживающей способностью, сохраняя звук перед тем, как он затухнет и завершится. Он оснащен звукоснимателем Dimarzio (DP159FBK) Super Distortion, с регуляторами громкости и тона, обеспечивающими высокое и плотное исполнение. Это наш цвет для старта: матово-черный с затуханием спереди грифа, уникальный эффект от использованной древесины в производстве.`,    
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
                    'es': '1 volumen y 1 tono',
                    'en': '1 volume and 1 tone',
                    'fr': '1 volume et 1 tonalité',
                    'de': '1 Lautstärke und 1 Ton',
                    'it': '1 volume e 1 tono',
                    'ru': '1 громкость и 1 тон',
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
        oldPrice: '2,800,000.00 COP',
        price: '2,600,000.00 COP',
        fileNames: [
            'guitarre3front',
            'guitarre3derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'png',
        paragraph: {
            'es': `La guitarra eléctrica CCS-Asio clamator tiene un diseño neoclásico perfecto para tocar metal (Death-Black). Es una guitarra propia de escenario, con su construcción tipo neck-through y un cuerpo completamente de caoba, madera de las montañas de Colombia. El diapasón de ébano y granadillo tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y sostenimiento, manteniendo así el sonido antes de desvanecerse y finalizar. Cuenta con un Humbucker Dimarzio (DP159FBK) de súper distorsión, con controles de volumen y tono, proporcionando un alto y ajustado rendimiento. Este es nuestro color de lanzamiento natural y con un negro mate, el cual realza las vetas de la madera.`,
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
                    'es': '1 volumen y 1 tono',
                    'en': '1 volume and 1 tone',
                    'fr': '1 volume et 1 tonalité',
                    'de': '1 Lautstärke und 1 Ton',
                    'it': '1 volume e 1 tono',
                    'ru': '1 громкость и 1 тон',
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
]);