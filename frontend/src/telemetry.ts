
// @ts-nocheck
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import * as resources from '@opentelemetry/resources';

// Trace Endpoint
// DEFAULT endpoint: http://46.62.204.165/v1/traces (Hetzner IP)
const COLLECTOR_URL = import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT || 'http://46.62.204.165/v1/traces';
const API_KEY = import.meta.env.VITE_SKYVIEW_API_KEY || '';

// Define Resource
// @ts-expect-error Resource type mismatch in newer OTel versions
const resource = new resources.Resource({
    'service.name': 'rosetta-frontend',
});

// Configure Provider
const provider = new WebTracerProvider({ resource });

// Configure Exporter
const exporter = new OTLPTraceExporter({
    url: COLLECTOR_URL,
    headers: API_KEY ? { 'X-API-Key': API_KEY } : {},
});

// Add Processor
(provider as any).addSpanProcessor(new BatchSpanProcessor(exporter));

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
