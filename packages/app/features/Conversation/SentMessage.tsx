import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle, CircleCheck } from '@peakee/icons';

import { TranslatableText } from '../../components';

interface Props {
	message: string;
	status?: 'pending' | 'delivered' | 'read';
}

export const SentMessage: FC<Props> = ({ message, status }) => {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<TranslatableText style={styles.text}>
					{message}
				</TranslatableText>
			</View>
			{status === 'pending' ? (
				<Circle size={14} color={'#c4c2c2'} strokeWidth="3" />
			) : status === 'delivered' ? (
				<CircleCheck size={14} color={'#c4c2c2'} strokeWidth="3" />
			) : null}
		</View>
	);
};

export default SentMessage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		gap: 2,
	},
	textContainer: {
		backgroundColor: '#FF7701',
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 20,
		marginLeft: 50,
	},
	text: {
		fontSize: 16,
		color: '#FFFFFF',
	},
});
