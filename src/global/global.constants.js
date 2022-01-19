export const isOnServer = typeof window === 'undefined';

const globals = {
	s7ContentPath: 'https://rnb.scene7.com/is/content/roomandboard',
	s7ImagePath: 'https://rnb.scene7.com/is/image/roomandboard' || '',
	sitePath: '',
};

export const {
	s7ContentPath,
	s7ImagePath,
	sitePath,
} = globals;
