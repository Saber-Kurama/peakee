import { createLogger } from '@peakee/logger';

import { setUtilsLogger } from '../../utils/logger';

export const logger = createLogger('Background');
setUtilsLogger(logger);

export const keepBackgroundAlive = () => {
	if (chrome.runtime) {
		if (chrome.runtime?.id) {
			// Keep Manifest V3 service worker alive
			chrome.runtime.onInstalled.addListener(() => {
				chrome.alarms.get('keep-alive', (a) => {
					if (!a) {
						chrome.alarms.create('keep-alive', {
							periodInMinutes: 0.1,
						});
					}
				});
			});
		}

		// Add a noop listener to the alarm. Without this, the service worker seems
		// to be deemed as idle by Chrome and will be killed after 30s.
		chrome.alarms?.onAlarm.addListener(() => {
			Function.prototype();
		});
	}
};
