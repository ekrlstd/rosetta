
// @ts-nocheck
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { resourceFromAttributes } from '@opentelemetry/resources';

// Trace Endpoint
// Use relative path to go through Nginx proxy --> avoids CORS
const COLLECTOR_URL = '/v1/traces';
const API_KEY = import.meta.env.VITE_SKYVIEW_API_KEY || '';

// Define Resource
// Use factory function to avoid constructor issues
const resource = resourceFromAttributes({
    'service.name': 'rosetta-frontend',
});

// Configure Exporter
const exporter = new OTLPTraceExporter({
    url: COLLECTOR_URL,
    headers: API_KEY ? { 'X-API-Key': API_KEY } : {},
});

// Configure Processor
const spanProcessor = new BatchSpanProcessor(exporter);

// Configure Provider
const provider = new WebTracerProvider({
    resource,
    spanProcessors: [spanProcessor]
});

// Register Provider
provider.register({
    contextManager: new ZoneContextManager(),
});

// Register Auto-Instrumentation
registerInstrumentations({
    instrumentations: [
        new FetchInstrumentation({
            propagateTraceHeaderCorsUrls: [
                new RegExp('.*') // Propagate trace headers to all backends (be careful with 3rd parties)
            ],
        }),
    ],
});

export const tracer = provider.getTracer('rosetta-frontend');
