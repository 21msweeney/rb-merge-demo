export const isOnServer = typeof window === 'undefined';

const globals = {
	isOnServer: false,
	s7ContentPath: 'https://rnb.scene7.com/is/content/roomandboard',
	s7ImagePath: 'https://rnb.scene7.com/is/image/roomandboard' || '',
	sitePath: '',
};

export const {
	isOnServer,
	s7ContentPath,
	s7ImagePath,
	sitePath,
} = globals;
