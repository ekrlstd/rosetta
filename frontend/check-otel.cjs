try {
    const resources = require('@opentelemetry/resources');
    console.log('--- ROOT EXPORTS ---');
    console.log('Keys:', Object.keys(resources));
    console.log('Has Resource:', !!resources.Resource);

    if (resources.default) {
        console.log('\n--- DEFAULT EXPORT ---');
        console.log('Keys:', Object.keys(resources.default));
        console.log('Has Resource:', !!resources.default.Resource);
        console.log('Is Resource class?', typeof resources.default.Resource === 'function');
    } else {
        console.log('\nNo default export');
    }
} catch (e) {
    console.error(e);
}
