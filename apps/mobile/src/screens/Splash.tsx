import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, runOnJS } from 'react-native-reanimated';
import { initAuthPromise } from '@peakee/app';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import 'utils/auth';

const Splash = () => {
	const { navigate, reset } = useNavigation();
	const firstRender = useRef(true);
	const resolveAnimationRef = useRef(() => ({}));
	const animationRef = useRef(
		new Promise((resolve) => {
			resolveAnimationRef.current = resolve as never;
		}),
	);

	const IconFadeIn = FadeInUp.duration(500)
		.springify()
		.withCallback(() => {
			runOnJS(resolveAnimationRef.current)();
		});

	useEffect(() => {
		const initApp = async () => {
			const [user] = await Promise.all([
				initAuthPromise,
				animationRef.current,
			]);
			if (!user) navigate('SignIn');
			else navigate('Home', { screen: 'Chat' });
			firstRender.current = false;
		};
		initApp();
	}, []);

	useFocusEffect(
		useCallback(() => {
			if (!firstRender.current) {
				reset({ routes: [{ name: 'Splash' }] });
			}
		}, []),
	);

	return (
		<View style={styles.container}>
			<Animated.View entering={IconFadeIn}>
				<Text style={styles.title}>Peakee</Text>
			</Animated.View>
		</View>
	);
};

export default Splash;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
	},
	title: {
		fontSize: 50,
		fontWeight: '900',
		color: '#FF7701',
	},
});
