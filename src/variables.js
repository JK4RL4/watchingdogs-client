import dogBark1 from './sounds/dog_bark/dog_bark_1.mp3'
import dogBark2 from './sounds/dog_bark/dog_bark_2.mp3'
import dogBark3 from './sounds/dog_bark/dog_bark_big_1.mp3'
import dogBark4 from './sounds/dog_bark/dog_bark_big_2.mp3'
import dogBark5 from './sounds/dog_bark/dog_bark_small_1.mp3'
import dogBark6 from './sounds/dog_bark/dog_bark_small_2.mp3'
import dogBark7 from './sounds/dog_bark/dog_bark_small_3.mp3'
import dogBark8 from './sounds/dog_bark/dog_bark_various_old.mp3'
import dogBark9 from './sounds/dog_bark/dog_bark_various_old_medium.mp3'
import dogBark10 from './sounds/dog_bark/dog_bark_various_old_small.mp3'
import dogBark11 from './sounds/dog_bark/dog_bark_various_triple.mp3'

const variables = {
    tutorialTexts: [
'Bienvenido a The Waiting Dogs',
'El objetivo del juego es dejar pasar solo a los perros que cumplan las condiciones especificadas en la ' + 
'parte inferior de la pantalla, pulsando el botón verde, si las cumplen, o el rojo, si no lo hacen.',
`Las condiciones pueden ser de 3 tipos:

Blanca: necesaria, es obligatorio que el perro la cumpla para poder salir.

Negra: excluyente, el perro no debe cumplir la condición.

Marrón: opcional, es necesario que al menos se cumpla una de entre todas las condiciones marrones propuestas.`,
`En la parte superior de la pantalla podrás ver las vidas restantes (3 por nivel) y el temporizador de cada nivel. 

Si cometes un error con un perro o la barra de tiempo se completa, perderás una vida y tendrás que repetir el nivel, pero no te preocupes, 
el objetivo es conseguir superarlo en los 3 intentos. `,

`Si pierdes las 3 vidas, el nivel quedará incompleto y deberás saltar al siguiente nivel. 

Puedes salir del juego antes de comenzar un nuevo nivel y volver a empezar más tarde donde lo dejaste, pero no lo hagas durante un nivel o perderás y tendrás que saltar al siguiente.`,
`En el menú superior de la esquina derecha, podrás abandonar el juego, saltar al siguiente nivel y volver a ver esta información en la ayuda.

Durante el juego, recibirás pistas sonoras para superar ciertas dificultades, por lo que no debes desactivar el audio en ningún momento.`
    ],
    tutorial: {
        levelName: 'Tutorial',
        conditions: {
            genre: { active: false, conditions: [{ rule: 'male', type: 'needed' }] },
            vaccinated: { active: false, conditions: [{ rule: true, type: 'optional' }] },
            color: { active: true, conditions: [{ rule: 'blanco', type: 'needed' }] },
            race: { active: false, conditions: [{ rule: 'san bernardo', type: 'excluding' }] },
            dangerous: { active: false, conditions: [{ rule: false, type: 'needed' }] }
        },
        dogs: [{
            name: 'Pulguitas',
            genre: 'male',
            vaccinated: true,
            color: 'blanco',
            colorId: 1,
            race: 'bichón maltés',
            dangerous: true,
            img: 1,
            sound: new Audio(dogBark1),
            type: 'scottie',
            id: 0,
        }, {
            name: 'Hulk',
            genre: 'female',
            vaccinated: false,
            color: 'marrón',
            colorId: 2,
            race: 'san bernardo',
            dangerous: true,
            img: 2,
            sound: new Audio(dogBark2),
            type: 'sntbernard',
            id: 1,
        }]
    },
    level1: {
        levelName: 'Nivel 1',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'female', type: 'excluding' }] },
            vaccinated: { active: false, conditions: [{ rule: true, type: 'optional' }] },
            color: { active: true, conditions: [{ rule: 'marrón', type: 'needed' }] },
            race: { active: false, conditions: [{ rule: 'husky', type: 'excluding' }] },
            dangerous: { active: false, conditions: [{ rule: false, type: 'needed' }] }
        },
        dogs: [{
            // 1
            name: 'Tobi',
            genre: 'male',
            vaccinated: true,
            color: 'marrón',
            colorId: 5,
            race: 'pomeranio',
            dangerous: true,
            img: 4,
            sound: new Audio(dogBark2),
            type: 'pomeranian',
            id: 2,

        }, {
            // 2
            name: 'Nieve',
            genre: 'female',
            vaccinated: false,
            color: 'blanco',
            colorId: 4,
            race: 'husky',
            dangerous: true,
            img: 15,
            sound: new Audio(dogBark4),
            type: 'wolfdog',
            id: 3,
        }, {
            // 3
            name: 'Lana',
            genre: 'female',
            vaccinated: true,
            color: 'negro',
            colorId: 1,
            race: 'rottweiler',
            dangerous: false,
            img: 9,
            sound: new Audio(dogBark3),
            type: 'golden',
            id: 4
        }, {
            // 4
            name: 'Coco',
            genre: 'male',
            vaccinated: false,
            color: 'marrón',
            race: 'corgi',
            colorId: 8,
            dangerous: false,
            img: 16,
            sound: new Audio(dogBark5),
            type: 'corgi',
            id: 5
        }, {
            // 5
            name: 'Manolo',
            genre: 'male',
            vaccinated: true,
            color: 'marrón',
            colorId: 4,
            race: 'golden retriever',
            dangerous: false,
            img: 7,
            sound: new Audio(dogBark9),
            type: 'golden',
            id: 6
        }]

    },
    level2: {
        levelName: 'Nivel 2',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'female', type: 'needed' }] },
            vaccinated: { active: false, conditions: [{ rule: true, type: 'optional' }] },
            color: { active: true, conditions: [{ rule: 'gris', type: 'optional' }] },
            race: { active: true, conditions: [{ rule: 'san bernardo', type: 'excluding' }] },
            dangerous: { active: false, conditions: [{ rule: false, type: 'needed' }] }
        },
        dogs: [{
            // 1
            name: 'Sully',
            genre: 'male',
            vaccinated: true,
            color: 'negro',
            colorId: 3,
            race: 'perro salchicha',
            dangerous: true,
            img: 14,
            sound: new Audio(dogBark3),
            type: 'wolfdog',
            id: 7
        }, {
            // 2
            name: 'Duna',
            genre: 'female',
            vaccinated: false,
            color: 'gris',
            colorId: 6,
            race: 'pug',
            dangerous: true,
            img: 6,
            sound: new Audio(dogBark1),
            type: 'golden',
            id: 8
        }, {
            // 3
            name: 'Rosario',
            genre: 'female',
            vaccinated: true,
            color: 'gris',
            colorId: 8,
            race: 'san bernardo',
            dangerous: false,
            img: 2,
            sound: new Audio(dogBark2),
            type: 'sntbernard',
            id: 9
        }, {
            // 4
            name: 'Dila',
            genre: 'female',
            vaccinated: false,
            color: 'gris',
            colorId: 2,
            race: 'scottie',
            dangerous: false,
            img: 3,
            sound: new Audio(dogBark9),
            type: 'scottie',
            id: 10
        }, {
            // 5
            name: 'Paco',
            genre: 'male',
            vaccinated: true,
            color: 'marrón',
            colorId: 6,
            race: 'corgi',
            dangerous: false,
            img: 16,
            sound: new Audio(dogBark8),
            type: 'corgi',
            id: 11
        }]
    },
    level3: {
        levelName: 'Nivel 3',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'male', type: 'excluding' }] },
            vaccinated: { active: true, conditions: [{ rule: true, type: 'needed' }] },
            color: { active: true, conditions: [{ rule: 'negro', type: 'optional' }] },
            race: { active: true, conditions: [{ rule: 'husky', type: 'optional' }] },
            dangerous: { active: false, conditions: [{ rule: false, type: 'needed' }] }
        },
        dogs: [{
            // 1
            name: 'Max',
            genre: 'male',
            vaccinated: true,
            color: 'negro',
            colorId: 2,
            race: 'scottie',
            dangerous: true,
            img: 3,
            sound: new Audio(dogBark6),
            type: 'scottie',
            id: 12
        }, {
            // 2
            name: 'Balto',
            genre: 'female',
            vaccinated: true,
            color: 'blanco',
            colorId: 4,
            race: 'husky',
            dangerous: false,
            img: 15,
            sound: new Audio(dogBark8),
            type: 'wolfdog',
            id: 13
        }, {
            // 3
            name: 'Thor',
            genre: 'male',
            vaccinated: true,
            color: 'negro',
            colorId: 3,
            race: 'doberman',
            dangerous: false,
            img: 12,
            sound: new Audio(dogBark11),
            type: 'wolfdog',
            id: 14
        }, {
            // 4
            name: 'Milú',
            genre: 'male',
            vaccinated: false,
            color: 'blanco',
            colorId: 1,
            race: 'bichón maltés',
            dangerous: false,
            img: 1,
            sound: new Audio(dogBark1),
            type: 'scottie',
            id: 15
        }, {
            // 5
            name: 'Lola',
            genre: 'female',
            vaccinated: true,
            color: 'negro',
            colorId: 4,
            race: 'pomeranio',
            dangerous: false,
            img: 4,
            sound: new Audio(dogBark7),
            type: 'pomeranian',
            id: 16
        }]
    }, level4: {
        levelName: 'Nivel 4',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'male', type: 'excluding' }] },
            vaccinated: { active: true, conditions: [{ rule: true, type: 'needed' }] },
            color: { active: true, conditions: [{ rule: 'gris', type: 'optional' }] },
            race: { active: true, conditions: [{ rule: 'pomeranio', type: 'optional' }] },
            dangerous: { active: true, conditions: [{ rule: false, type: 'excluding' }] }
        },
        dogs: [{
            // 1
            name: 'Nala',
            genre: 'female',
            vaccinated: true,
            color: 'marrón',
            colorId: 7,
            race: 'pomeranio',
            dangerous: true,
            img: 4,
            sound: new Audio(dogBark5),
            type:'pomeranian',
            id:17
            
        }, {
            // 2
            name: 'Erwin',
            genre: 'male',
            vaccinated: false,
            color: 'blanco',
            colorId: 1,
            race: 'pastor alemán',
            dangerous: true,
            img: 11,
            sound: new Audio(dogBark2),
            type: 'corgi',
            id: 18
        }, {
            // 3
            name: 'Wesley',
            genre: 'female',
            vaccinated: true,
            color: 'negro',
            colorId: 2,
            race: 'scottie',
            dangerous: false,
            img: 3,
            sound: new Audio(dogBark6),
            type: 'scottie',
            id: 19
        }, {
            // 4
            name: 'Bobu',
            genre: 'female',
            vaccinated: true,
            color: 'gris',
            colorId: 8,
            race: 'san bernardo',
            dangerous: true,
            img: 2,
            sound: new Audio(dogBark9),
            type: 'sntbernard',
            id: 20
        }, {
            // 5
            name: 'Arya',
            genre: 'female',
            vaccinated: true,
            color: 'negro',
            colorId: 4,
            race: 'pomeranio',
            dangerous: true,
            img: 4,
            sound: new Audio(dogBark7),
            type: 'pomeranian',
            id: 21

        }]
    }, level5: {
        levelName: 'Nivel 5',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'male', type: 'optional' }] },
            vaccinated: { active: true, conditions: [{ rule: true, type: 'needed' }] },
            color: { active: true, conditions: [{ rule: 'blanco', type: 'excluding' }] },
            race: { active: true, conditions: [{ rule: 'doberman', type: 'optional' }] },
            dangerous: { active: true, conditions: [{ rule: true, type: 'needed' }] }
        },
        dogs: [{
            // 1
            name: 'Txuku',
            genre: 'male',
            vaccinated: true,
            color: 'marrón',
            colorId: 3,
            race: 'golden retriever',
            dangerous: true,
            img: 7,
            sound: new Audio(dogBark5),
            type: 'golden',
            id: 22
        }, {
            // 2
            name: 'Mani',
            genre: 'male',
            vaccinated: true,
            color: 'blanco',
            colorId: 2,
            race: 'dálmata',
            dangerous: true,
            img: 8,
            sound: new Audio(dogBark1),
            type: 'wolfdog',
            id: 23
        }, {
            // 3
            name: 'Loki',
            genre: 'female',
            vaccinated: true,
            color: 'negro',
            colorId: 3,
            race: 'doberman',
            dangerous: true,
            img: 12,
            sound: new Audio(dogBark11),
            type: 'wolfdog',
            id: 24
        }, {
            // 4
            name: 'Lulu',
            genre: 'male',
            vaccinated: true,
            color: 'negro',
            colorId: 2,
            race: 'shih tzu',
            dangerous: true,
            img: 1,
            sound: new Audio(dogBark7),
            type: 'scottie',
            id: 25,
        }, {
            // 5
            name: 'Sansa',
            genre: 'female',
            vaccinated: false,
            color: 'blanco',
            colorId: 1,
            race: 'jack russell terrier',
            dangerous: true,
            img: 11,
            sound: new Audio(dogBark9),
            type: 'corgi',
            id: 26
        }]
    }, level6: {
        levelName: 'Nivel 6',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'male', type: 'needed' }] },
            vaccinated: { active: true, conditions: [{ rule: true, type: 'optional' }] },
            color: { active: true, conditions: [{ rule: 'negro', type: 'optional' }] },
            race: { active: true, conditions: [{ rule: 'chihuahua', type: 'excluding' }] },
            dangerous: { active: true, conditions: [{ rule: false, type: 'excluding' }] }
        },
        dogs: [{
            // 1
            name: 'Txori',
            genre: 'male',
            vaccinated: true,
            color: 'negro',
            colorId: 2,
            race: 'chihuahua',
            dangerous: true,
            img: 10,
            sound: new Audio(dogBark7),
            type: 'corgi',
            id: 27
        }, {
            // 2
            name: 'Bate',
            genre: 'male',
            vaccinated: true,
            color: 'blanco',
            colorId: 3,
            race: 'scottie',
            dangerous: true,
            img: 3,
            sound: new Audio(dogBark6),
            type: 'scottie',
            id: 28
        }, {
            // 3
            name: 'Kira',
            genre: 'female',
            vaccinated: false,
            color: 'marrón',
            colorId: 7,
            race: 'shiba Inu',
            dangerous: false,
            img: 5,
            sound: new Audio(dogBark1),
            type: 'corgi',
            id: 29
        }, {
            // 4
            name: 'Mfulu',
            genre: 'female',
            vaccinated: false,
            color: 'negro',
            colorId: 8,
            race: 'rottweiler',
            dangerous: false,
            img: 9,
            sound: new Audio(dogBark10),
            type: 'golden',
            id: 30
        }, {
            // 5
            name: 'Mans',
            genre: 'male',
            vaccinated: false,
            color: 'negro',
            colorId: 7,
            race: 'basset hound',
            dangerous: true,
            img: 13,
            sound: new Audio(dogBark4),
            type: 'wolfdog',
            id: 31
        }]
    }, level7: {
        levelName: 'Nivel 7',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'female', type: 'optional' }] },
            vaccinated: { active: true, conditions: [{ rule: true, type: 'excluding' }] },
            color: { active: true, conditions: [{ rule: 'beige', type: 'optional' }] },
            race: { active: true, conditions: [{ rule: 'pomeranio', type: 'optional' }] },
            dangerous: { active: true, conditions: [{ rule: false, type: 'needed' }] }
        },
        dogs: [{
            // 1
            name: 'Aron',
            genre: 'male',
            vaccinated: false,
            color: 'marrón',
            colorId: 1,
            race: 'pomeranio',
            dangerous: false,
            img: 4,
            sound: new Audio(dogBark5),
            type: 'pomeranian',
            id: 32
        }, {
            // 2
            name: 'Mia',
            genre: 'female',
            vaccinated: false,
            color: 'blanco',
            colorId: 4,
            race: 'Husky',
            dangerous: false,
            img: 15,
            sound: new Audio(dogBark8),
            type: 'wolfdog',
            id: 33
        }, {
            // 3
            name: 'Noa',
            genre: 'male',
            vaccinated: false,
            color: 'beige',
            colorId: 1,
            race: 'san bernardo',
            dangerous: false,
            img: 2,
            sound: new Audio(dogBark3),
            type: 'sntbernard',
            id: 34
        }, {
            // 4
            name: 'Pia',
            genre: 'male',
            vaccinated: true,
            color: 'gris',
            colorId: 6,
            race: 'pug',
            dangerous: false,
            img: 6,
            sound: new Audio(dogBark1),
            type: 'golden',
            id: 35
        }, {
            // 5
            name: 'Nora',
            genre: 'female',
            vaccinated: true,
            color: 'marrón',
            colorId: 4,
            race: 'san bernardo',
            dangerous: false,
            img: 2,
            sound: new Audio(dogBark3),
            type: 'sntbernard',
            id: 36
        }]
    }, level8: {
        levelName: 'Nivel 8',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'male', type: 'optional' }] },
            vaccinated: { active: true, conditions: [{ rule: true, type: 'needed' }] },
            color: { active: true, conditions: [{ rule: 'gris', type: 'optional' }] },
            race: { active: true, conditions: [{ rule: 'husky', type: 'excluding' }] },
            dangerous: { active: true, conditions: [{ rule: false, type: 'needed' }] }
        },
        dogs: [{
            // 1
            name: 'Gato',
            genre: 'male',
            vaccinated: true,
            color: 'gris',
            colorId: 8,
            race: 'gran danés',
            dangerous: false,
            img: 2,
            sound: new Audio(dogBark4),
            type: 'sntbernard',
            id: 37
        }, {
            // 2
            name: 'Bimba',
            genre: 'female',
            vaccinated: true,
            color: 'gris',
            colorId: 2,
            race: 'husky',
            dangerous: false,
            img: 15,
            sound: new Audio(dogBark8),
            type: 'wolfdog',
            id: 38
        }, {
            // 3
            name: 'Bambi',
            genre: 'female',
            vaccinated: false,
            color: 'gris',
            colorId: 6,
            race: 'scottie',
            dangerous: true,
            img: 3,
            sound: new Audio(dogBark6),
            type: 'scottie',
            id: 39
        }, {
            // 4
            name: 'Kobu',
            genre: 'male',
            vaccinated: true,
            color: 'beige',
            colorId: 1,
            race: 'pomeranio',
            dangerous: false,
            img: 4,
            sound: new Audio(dogBark5),
            type: 'pomeranian',
            id: 40
        }, {
            // 5
            name: 'Dana',
            genre: 'female',
            vaccinated: true,
            color: 'negro',
            colorId: 2,
            race: 'teckle',
            dangerous: false,
            img: 14,
            sound: new Audio(dogBark2),
            type: 'corgi',
            id: 41
        }, 
        ]
    }, level9: {
        levelName: 'Nivel 9',
        conditions: {
            genre: { active: true, conditions: [{ rule: 'female', type: 'optional' }] },
            vaccinated: { active: true, conditions: [{ rule: false, type: 'excluding' }] },
            color: { active: true, conditions: [{ rule: 'marrón', type: 'optional' }] },
            race: { active: true, conditions: [{ rule: 'Jack Russell Terrier', type: 'optional' }] },
            dangerous: { active: true, conditions: [{ rule: false, type: 'needed' }] }
        },
        dogs: [{
            // 1
            name: 'Dustin',
            genre: 'male',
            vaccinated: true,
            color: 'blanco',
            colorId: 6,
            race: 'dálmata',
            dangerous: false,
            img: 8,
            sound: new Audio(dogBark2),
            type: 'golden',
            id: 42
        }, {
            // 2
            name: 'Dustin',
            genre: 'female',
            vaccinated: false,
            color: 'beige',
            colorId: 4,
            race: 'pomeranio',
            dangerous: false,
            img: 4,
            sound: new Audio(dogBark7),
            type: 'golden',
            id: 43
        }, {
            // 3
            name: 'Dustin',
            genre: 'female',
            vaccinated: true,
            color: 'negro',
            colorId: 2,
            race: 'doberman',
            dangerous: false,
            img: 12,
            sound: new Audio(dogBark10),
            type: 'golden',
            id: 44
        }, {
            // 4
            name: 'Dustin',
            genre: 'female',
            vaccinated: false,
            color: 'marrón',
            colorId: 5,
            race: 'jack russell terrier',
            dangerous: false,
            img: 13,
            sound: new Audio(dogBark3),
            type: 'golden',
            id: 45
        }, {
            // 5
            name: 'Dustin',
            genre: 'male',
            vaccinated: true,
            color: 'blanco',
            colorId: 3,
            race: 'pug',
            dangerous: true,
            img: 6,
            sound: new Audio(dogBark1),
            type: 'golden',
            id: 46
        }]
    },
    userData: {
        level1: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        },
        level2: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        },
        level3: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        },
        level4: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        },
        level5: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        },
        level6: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        },
        level7: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        },
        level8: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        },
        level9: {
            lives: 3,
            pass: false,
            skip: false,
            abandon: false,
            response: []
        }
    }
}

export default variables;