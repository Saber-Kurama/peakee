import { initWebsocketWithProfile } from '@peakee/app';
import { getOrInitUserProfile } from '@peakee/app/api';
import { resetUserState, setProfile, store } from '@peakee/app/state';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { logger } from './logger';

const firebaseConfig = {
	appId: APP_ID,
	apiKey: API_KEY,
	projectId: PROJECT_ID,
	authDomain: AUTH_DOMAIN,
	storageBucket: STORAGE_BUCKET,
	measurementId: MEASUREMENT_ID,
	messagingSenderId: MESSAGING_SENDER_ID,
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signIn = async () => {
	await signInWithPopup(auth, provider);
};

export const signOut = async () => {
	await auth.signOut();
	store().dispatch(resetUserState());
};

let authResolve: () => void;
/**
 * Wait for the first time initialize auth
 */
export const authInitialized = new Promise<void>((resolve) => {
	authResolve = resolve;
});

auth.onIdTokenChanged(async (firebaseUser) => {
	if (firebaseUser) {
		const jwt = await firebaseUser.getIdToken();

		initWebsocketWithProfile(firebaseUser.uid, jwt);

		const user = await getOrInitUserProfile({
			name: firebaseUser.displayName as string,
			email: firebaseUser.email as string,
			imageUrl: firebaseUser.photoURL as string,
		});

		if (user) store().dispatch(setProfile(user));
	}

	if (authResolve) {
		authResolve();
		authResolve = undefined as never;
	}

	logger.log('auth updated');
});
