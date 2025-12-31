
const { WebTracerProvider } = require('@opentelemetry/sdk-trace-web');
const { Resource } = require('@opentelemetry/resources');

console.log('WebTracerProvider type:', typeof WebTracerProvider);
try {
    const provider = new WebTracerProvider();
    console.log('Provider instance keys:', Object.keys(provider));
    console.log('Has addSpanProcessor:', typeof provider.addSpanProcessor);
    console.log('Prototype keys:', Object.getOwnPropertyNames(Object.getPrototypeOf(provider)));
} catch (e) {
    console.error(e);
}
