import { type FC } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { StyledComponentsRegistry } from '../components';
import { GlobalStyles } from '../components/GlobalStyled';
import { darkTheme, lightTheme } from '../config/theme';
import { useThemeMode } from '../utils';

import '../styles/globals.css';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	const { themeMode } = useThemeMode();

	return (
		<StyledComponentsRegistry>
			<ThemeProvider
				theme={themeMode === 'light' ? lightTheme : darkTheme}
			>
				<GlobalStyles />
				<Component {...pageProps} />
			</ThemeProvider>
		</StyledComponentsRegistry>
	);
};

export default App;
