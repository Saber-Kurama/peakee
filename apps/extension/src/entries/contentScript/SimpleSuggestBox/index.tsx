import type { Ref } from 'react';
import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ExplainTextInSentenceResponse } from '@peakee/app/api';

import type { Position } from '../types';

type Props = {
	position: Position;
	suggestion: ExplainTextInSentenceResponse;
};

const InternalSimpleSuggestBox = (
	{ suggestion, position }: Props,
	ref: Ref<View>,
) => {
	return (
		<View ref={ref} style={[styles.container, position]}>
			<Text style={styles.heading}>Translate</Text>
			<Text style={styles.content}>{suggestion.translate}</Text>

			<Text style={styles.heading}>Tense</Text>
			<Text style={styles.content}>
				{suggestion.grammar_analysis.tense.type}
			</Text>

			<Text style={styles.heading}>Relevant examples</Text>
			<View style={styles.examplesContainer}>
				{suggestion.expand_words.map((w, index) => {
					return (
						<Text style={styles.content} key={index}>
							{w}
						</Text>
					);
				})}
			</View>
		</View>
	);
};

export const SimpleSuggestBox = forwardRef<View, Props>(
	InternalSimpleSuggestBox,
);

export default SimpleSuggestBox;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		width: 300,
		paddingBottom: 50,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#B1B6C1',
	},
	heading: {
		fontSize: 12,
		fontWeight: '500',
		marginTop: 20,
		marginBottom: 8,
	},
	content: {
		fontSize: 20,
	},
	examplesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		rowGap: 4,
		columnGap: 10,
	},
});
