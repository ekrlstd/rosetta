# SkyView Observability Issues Report

**Date:** 2026-01-04  
**Affected Application:** Rosetta (rosetta-backend, rosetta-frontend)  
**SkyView Endpoint:** http://46.62.229.59  
**Tenant ID:** `rosetta-01`  
**API Key:** `sk_live_rosetta_12345`

---

## 🚨 Critical Issue: Backend Telemetry Rejection (500 Error)

The core issue is that **Rosetta Backend** telemetry is being rejected by the server, while **Rosetta Frontend** telemetry works fine.

| Component | Signal | Status | Error |
|-----------|--------|--------|-------|
| **Frontend** | Traces | ✅ **Working** | None (Visible in SkyView) |
| **Backend** | Traces | ❌ **Failing** | `500: Failed to process trace` |
| **Backend** | Logs | ❌ **Failing** | `500: Server Error` |
| **Backend** | Metrics | ❌ **Failing** | `500: Server Error` |

### Why Frontend Works & Backend Fails
- **Frontend** sends traces via `rosetta-frontend` container (Nginx proxy) or directly from browser.
- **Backend** sends traces/logs via direct HTTP connection from `rosetta-backend` container.
- The logs show explicit **500 Internal Server Errors** from the SkyView endpoint when the backend tries to export data.

---

## Technical Details

### 1. Log Export Failure
The backend is configured to send all logs (INFO and above). It **is generating logs**, but they are rejected.
```
INFO: rosetta-backend Failed to export span batch code: 500
INFO: rosetta-backend Exception while exporting Log
```

### 2. Log Severity Misclassification
When internal OTel SDK logs *do* appear (describing the failures), they show as INFO in SkyView, even though they have `severity_number: 17` (ERROR).

---

## Confirmed Environment
- **Tenant:** `rosetta-01` (Correctly visible in SkyView now)
- **Config:** Backend uses `init_telemetry` with `OTLPLogExporter` pointed to `/v1/logs`.
- **No Client Restrictions:** The code explicitly captures all root logger events (`logging.INFO`).

---

## Recommended Fixes for SkyView Team
1. **Fix Backend Ingestion:** Investigate why `/v1/traces`, `/v1/logs`, and `/v1/metrics` return 500 for the backend container's IP/request.
2. **Check Auth/Rate Limiting:** Confirm `obsera-auth-gateway` isn't incorrectly blocking the backend.
3. **Fix Log Severity UI:** Ensure ERROR logs (severity 17) appear as red errors, not info.
