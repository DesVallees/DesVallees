export type ExerciseId = 'squats' | 'pushups' | 'situps';
export type LevelId = 'tutorial' | 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'infinite';

export interface ExerciseCard {
	id: ExerciseId;
	name: string;
	tagline: string;
	image: string;
	description: string;
	checkpoints: string[];
	accent: string;
}

export interface LevelConfig {
	id: LevelId;
	name: string;
	targetReps: number | null;
	description: string;
	badge: string;
	unlockRequirement: LevelId | null;
	invincible?: boolean;
}

export interface StorageKeys {
	bestScore: string;
	unlockedLevels: string;
	lastExercise: string;
	lastLevel: string;
}

export const STORAGE_KEYS: StorageKeys = {
	bestScore: 'im-pulse-best-score',
	unlockedLevels: 'im-pulse-unlocked-levels',
	lastExercise: 'im-pulse-last-exercise',
	lastLevel: 'im-pulse-last-level',
};

export const LEGACY_STORAGE_KEYS = ['apan-flappy-best-score'];

export const EXERCISES: ExerciseCard[] = [
	{
		id: 'squats',
		name: 'Sentadillas',
		tagline: 'Activa el tren inferior',
		image: '/images/im-pulse/squat.webp',
		description:
			'Impulsa cada aleteo elevándote con fuerza desde una sentadilla profunda.',
		checkpoints: [
			'Coloca los pies al ancho de los hombros y mantén el pecho abierto.',
			'Desciende hasta que las caderas queden por debajo de las rodillas.',
			'Impulsa con glúteos y muslos para elevar al ave.',
		],
		accent: 'var(--accent-1)',
	},
	{
		id: 'pushups',
		name: 'Flexiones',
		tagline: 'Activa el tren superior',
		image: '/images/im-pulse/pushup.webp',
		description:
			'Impulsa cada aleteo bajando el pecho hacia el suelo.',
		checkpoints: [
			'Alinea las muñecas justo debajo de los hombros.',
			'Baja el pecho con control manteniendo los codos cerca del torso.',
			'Empuja contra el suelo sin perder la alineación del cuerpo.',
		],
		accent: '#f97316',
	},
	{
		id: 'situps',
		name: 'Abdominales',
		tagline: 'Activa la zona media',
		image: '/images/im-pulse/situp.webp',
		description:
			'Ubícate de perfil frente a la cámara, activa el abdomen y haz que el ave ascienda con cada repetición.',
		checkpoints: [
			'Alinea hombros y caderas de perfil hacia la cámara.',
			'Apoya la zona lumbar y enróllate sin jalar el cuello.',
			'Sube y baja con control para impulsar al ave.',
		],
		accent: '#22d3ee',
	},
];

export const LEVELS: LevelConfig[] = [
	{
		id: 'tutorial',
		name: 'Tutorial',
		targetReps: null,
		description: 'Practica libremente y aprende cómo cada movimiento impulsa al ave.',
		badge: '📘',
		unlockRequirement: null,
		invincible: true,
	},
	{
		id: 'beginner',
		name: 'Inicial',
		targetReps: 3,
		description: 'Cruza 3 compuertas seguidas para despegar y dominar los controles.',
		badge: '✨',
		unlockRequirement: null,
	},
	{
		id: 'intermediate',
		name: 'Intermedio',
		targetReps: 6,
		description: 'Suma 6 puntos seguidos y mantén la técnica bajo presión.',
		badge: '🚀',
		unlockRequirement: 'beginner',
	},
	{
		id: 'advanced',
		name: 'Avanzado',
		targetReps: 9,
		description: 'Supera 9 compuertas consecutivas con control absoluto.',
		badge: '🧠',
		unlockRequirement: 'intermediate',
	},
	{
		id: 'expert',
		name: 'Experto',
		targetReps: 15,
		description: 'Domina 15 puntos sin fallos para demostrar maestría total.',
		badge: '💎',
		unlockRequirement: 'advanced',
	},
	{
		id: 'infinite',
		name: 'Infinito',
		targetReps: null,
		description: 'Puntos infinitos y marcador creciente. Mantén tu técnica.',
		badge: '♾️',
		unlockRequirement: 'expert',
	},
];

export const TUTORIAL_GUIDES: Record<ExerciseId, string[]> = {
	squats: [
		'Mantén los pies separados al ancho de los hombros y enfoca tu mirada al frente.',
		'Desciende hasta que las caderas queden por debajo de las rodillas.',
		'Al subir con fuerza, el ave bate sus alas y avanza.',
	],
	pushups: [
		'Alinea muñecas, hombros y caderas en línea recta.',
		'Baja el pecho con control hasta acercarlo al suelo.',
		'Impulsa el cuerpo hacia arriba para darle un salto al ave.',
	],
	situps: [
		'Gira el cuerpo de perfil hacia la cámara y planta los pies con firmeza.',
		'Enróllate hasta acercar el pecho a las rodillas manteniendo el abdomen activo.',
		'Desciende con control hasta que los hombros estén cerca del suelo antes de repetir.',
	],
};

