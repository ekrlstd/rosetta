
const { WebTracerProvider } = require('@opentelemetry/sdk-trace-web');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

console.log('BatchSpanProcessor type:', typeof BatchSpanProcessor);

try {
    const config = {
        spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter())]
    };
    const provider = new WebTracerProvider(config);
    console.log('Provider created with config');

    // Check internal property for span processors
    console.log('Active span processor:', provider._activeSpanProcessor);
    console.log('Registered span processors:', provider._registeredSpanProcessors); // internal property in some versions
} catch (e) {
    console.error(e);
}
