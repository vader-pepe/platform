// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from '@sentry/nestjs';
import { getConfig } from './common/config';

export function initSentry() {
    Sentry.init({
        dsn: getConfig('SENTRY_DSN'),
        // Tracing
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
    });
}
