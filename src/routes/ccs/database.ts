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
        oldPrice: '2,800,000.00 COP',
        price: '2,600,000.00 COP',
        fileNames: [
            'guitarre2front',
            'guitarre2derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'png',
        paragraph: {
            'español': `La guitarra eléctrica CCS-Boa constrictor tiene un diseño neoclásico (tipo Explorer) perfecto para rock pesado. Es una guitarra propia de escenario, con su construcción tipo neck-through y un cuerpo completamente de caoba, madera de las montañas de Colombia. El fretboard de ébano y granadillo tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y sostenimiento, por tanto, manteniendo así el sonido antes de desvanecerse y finalizar. Cuenta con un Humbucker Dimarzio (DP159FBK) super distortion, con controles de volumen y tono, lo cual proporciona un alto y ajustado rendimiento. Este es nuestro color de lanzamiento: un negro mate con desvanecimiento en la parte anterior del diapasón, efecto propio de la madera utilizada para la fabricación.`,
            'english': `The CCS-Boa constrictor electric guitar has a neoclassical design (Explorer type), perfect for heavy rock. It is a stage-ready guitar, with a neck-through construction and a body entirely made of mahogany, wood from the mountains of Colombia. The ebony and rosewood fretboard has 22 frets along a 24.75-inch scale, standard, designed to provide speed and comfort. The headstock design makes it even more aggressive on stage. It is a lightweight guitar with great resonance and sustain, thus maintaining the sound before fading away. It features a Dimarzio Humbucker (DP159FBK) super distortion, with volume and tone controls, providing a high and tight performance. This is our launch color: a matte black with fading on the front of the fretboard, a unique effect from the wood used in manufacturing.`,
            'français': `La guitare électrique CCS-Boa constrictor a un design néoclassique (type Explorer) parfait pour le rock lourd. C'est une guitare prête pour la scène, avec une construction de type neck-through et un corps entièrement en acajou, bois des montagnes de Colombie. La touche en ébène et palissandre comporte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. La conception de la tête la rend encore plus agressive sur scène. C'est une guitare légère avec une grande résonance et un soutien, maintenant ainsi le son avant de s'estomper et de se terminer. Elle est équipée d'un Humbucker Dimarzio (DP159FBK) à super distorsion, avec des commandes de volume et de tonalité, offrant une performance puissante et serrée. Voici notre couleur de lancement : un noir mat avec un fondu sur le devant de la touche, un effet unique du bois utilisé dans la fabrication.`,
            'deutsch': `Die CCS-Boa Constrictor E-Gitarre hat ein neoklassisches Design (Explorer-Typ), perfekt für Heavy Rock. Es ist eine Bühnen-gerechte Gitarre mit einer durchgehenden Halskonstruktion und einem Korpus aus Mahagoni, Holz aus den Bergen Kolumbiens. Das Griffbrett aus Ebenholz und Palisander hat 22 Bünde entlang einer Skala von 24,75 Zoll, standardmäßig gestaltet für Geschwindigkeit und Komfort. Das Kopfplattendesign macht sie noch aggressiver auf der Bühne. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, wodurch der Klang erhalten bleibt, bevor er verklingt und endet. Sie verfügt über einen Dimarzio Humbucker (DP159FBK) Super Distortion, mit Lautstärke- und Tonreglern, die eine hohe und straffe Leistung bieten. Dies ist unsere Einführungsfarbe: ein mattschwarzes Finish mit Verblassen auf der Vorderseite des Griffbretts, ein einzigartiger Effekt des verwendeten Holzes bei der Herstellung.`,
            'italiano': `La chitarra elettrica CCS-Boa constrictor ha un design neoclassico (tipo Explorer), perfetto per il rock pesante. È una chitarra pronta per il palco, con una costruzione neck-through e un corpo interamente in mogano, legno delle montagne della Colombia. La tastiera in ebano e palissandro ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. Il design della paletta la rende ancora più aggressiva sul palco. È una chitarra leggera con grande risonanza e sustain, mantenendo il suono prima di dissolversi e concludersi. È dotata di un Humbucker Dimarzio (DP159FBK) super distortion, con controlli di volume e tono, offrendo una prestazione alta e serrata. Questo è il nostro colore di lancio: un nero opaco con sfumature sulla parte anteriore della tastiera, un effetto unico del legno utilizzato nella produzione.`,
            'Русский': `Электрогитара CCS-Boa constrictor имеет неоклассический дизайн (тип Explorer), идеально подходящий для тяжёлого рока. Это гитара готовая для выступлений, с конструкцией типа neck-through и корпусом полностью из красного дерева, древесина из гор Колумбии. Гриф из эбенового и палисандрового дерева имеет 22 лада на длинной шкале 24,75 дюйма, стандарт, разработанный для обеспечения скорости и комфорта. Дизайн головы делает её еще более агрессивной на сцене. Это легкая гитара с отличной резонансной и поддерживающей способностью, сохраняя звук перед тем, как он затухнет и завершится. Он оснащен звукоснимателем Dimarzio (DP159FBK) Super Distortion, с регуляторами громкости и тона, обеспечивающими высокое и плотное исполнение. Это наш цвет для старта: матово-черный с затуханием спереди грифа, уникальный эффект от использованной древесины в производстве.`,    
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
        oldPrice: '2,800,000.00 COP',
        price: '2,600,000.00 COP',
        fileNames: [
            'guitarre3front',
            'guitarre3derriere',
        ],
        allowSmallSize: true,
        filesExtension: 'png',
        paragraph: {
            'español': `La guitarra eléctrica CCS-Asio clamator tiene un diseño neoclásico perfecto para tocar metal (Death-Black). Es una guitarra propia de escenario, con su construcción tipo neck-through y un cuerpo completamente de caoba, madera de las montañas de Colombia. El diapasón de ébano y granadillo tiene 22 trastes a lo largo de una escala de 24,75 pulgadas, estándar, diseñada para brindar velocidad y comodidad. El diseño de la cabeza la hace aún más agresiva en una puesta en escena. Es una guitarra liviana de gran resonancia y sostenimiento, manteniendo así el sonido antes de desvanecerse y finalizar. Cuenta con un Humbucker Dimarzio (DP159FBK) de súper distorsión, con controles de volumen y tono, proporcionando un alto y ajustado rendimiento. Este es nuestro color de lanzamiento natural y con un negro mate, el cual realza las vetas de la madera.`,
            'english': `The CCS-Asio clamator electric guitar features a neoclassical design perfect for playing metal (Death-Black). It's a stage-ready guitar with a neck-through construction and a body entirely made of mahogany, wood from the mountains of Colombia. The ebony and granadillo fretboard has 22 frets along a 24.75-inch scale, standard, designed to offer speed and comfort. The headstock design makes it even more aggressive on stage. It's a lightweight guitar with great resonance and sustain, thus maintaining the sound before fading and finishing. It comes with a Humbucker Dimarzio (DP159FBK) super distortion, with volume and tone controls, providing a high and tight performance. This is our natural launch color and with a matte black, which enhances the wood grain.`,
            'français': `La guitare électrique CCS-Asio clamator a un design néoclassique parfait pour jouer du métal (Death-Black). C'est une guitare conçue pour la scène, avec une construction de type neck-through et un corps entièrement en acajou, bois des montagnes de Colombie. La touche en ébène et en palissandre comporte 22 frettes le long d'une échelle de 24,75 pouces, standard, conçue pour offrir vitesse et confort. Le design de la tête la rend encore plus agressive sur scène. C'est une guitare légère avec une grande résonance et un sustain, maintenant ainsi le son avant de s'estomper et de finir. Elle est équipée d'un Humbucker Dimarzio (DP159FBK) super distortion, avec des commandes de volume et de tonalité, offrant une performance haute et serrée. Voici notre couleur de lancement naturelle et avec un noir mat, mettant en valeur les veines du bois.`,
            'deutsch': `Die CCS-Asio Clamator E-Gitarre hat ein neoklassisches Design, perfekt für das Spielen von Metal (Death-Black). Es ist eine Bühnen-gerechte Gitarre mit einer durchgehenden Halskonstruktion und einem Korpus vollständig aus Mahagoni, Holz aus den Bergen Kolumbiens. Das Griffbrett aus Ebenholz und Palisander hat 22 Bünde entlang einer Skala von 24,75 Zoll, standardmäßig gestaltet für Geschwindigkeit und Komfort. Das Kopfplattendesign macht sie noch aggressiver auf der Bühne. Es ist eine leichte Gitarre mit großer Resonanz und Sustain, wodurch der Klang erhalten bleibt, bevor er verklingt und endet. Sie ist ausgestattet mit einem Humbucker Dimarzio (DP159FBK) Super Distortion, mit Lautstärke- und Tonreglern, die eine hohe und straffe Leistung bieten. Dies ist unsere Naturfarbe und mit mattem Schwarz, das die Maserung des Holzes hervorhebt.`,
            'italiano': `La chitarra elettrica CCS-Asio clamator ha un design neoclassico perfetto per suonare il metal (Death-Black). È una chitarra pronta per il palco, con una costruzione neck-through e un corpo completamente in mogano, legno delle montagne della Colombia. La tastiera in ebano e granadillo ha 22 tasti lungo una scala di 24,75 pollici, standard, progettata per offrire velocità e comfort. Il design della paletta la rende ancora più aggressiva sul palco. È una chitarra leggera con grande risonanza e sustain, mantenendo il suono prima di dissolversi e concludersi. È dotata di un Humbucker Dimarzio (DP159FBK) super distortion, con controlli di volume e tono, offrendo una prestazione alta e serrata. Questo è il nostro colore naturale e con un nero opaco, che esalta le venature del legno.`,
            'Русский': `Электрогитара CCS-Asio clamator имеет неоклассический дизайн, идеально подходящий для игры в металл (Death-Black). Это гитара, подходящая для выступлений, с конструкцией типа neck-through и корпусом полностью из красного дерева, древесина из гор Колумбии. Гриф из эбенового и палисандрового дерева имеет 22 лада на длинной шкале 24,75 дюйма, стандарт, разработанный для обеспечения скорости и комфорта. Дизайн головы делает её еще более агрессивной на сцене. Это легкая гитара с отличной резонансной и поддерживающей способностью, сохраняя звук перед тем, как он затухнет и завершится. Он оснащен звукоснимателем Dimarzio (DP159FBK) Super Distortion, с регуляторами громкости и тона, обеспечивающими высокое и плотное исполнение. Это наш цвет для старта: матово-черный с затуханием спереди грифа, уникальный эффект от использованной древесины в производстве.`,    
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
]);