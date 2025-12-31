import os
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource

def init_telemetry():
    """
    Initializes OpenTelemetry with OTLP/HTTP exporter.
    """
    # Configuration
    # DEFAULT endpoint: http://46.62.229.59/v1/traces (SkyView IP)
    endpoint = os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT", "http://46.62.229.59/v1/traces")
    
    # API Key retrieval
    api_key = os.getenv("SKYVIEW_API_KEY", "")
    headers = {}
    if api_key:
        headers["X-API-Key"] = api_key

    # Define Resource (Service Name)
    resource = Resource.create(attributes={
        "service.name": "rosetta-backend"
    })

    # Set up TracerProvider
    provider = TracerProvider(resource=resource)

    # Set up OTLP/HTTP Exporter
    exporter = OTLPSpanExporter(
        endpoint=endpoint,
        headers=headers
    )

    # Add BatchSpanProcessor
    processor = BatchSpanProcessor(exporter)
    provider.add_span_processor(processor)

    # Set global TracerProvider
    trace.set_tracer_provider(provider)
