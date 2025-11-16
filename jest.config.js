module.exports = {
	preset: 'jest-expo',
	setupFiles: ['./jest.setup.js'],
	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
	testEnvironment: 'jsdom',
};
