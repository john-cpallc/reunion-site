/**
 * Smoke-test /api/register.
 * Expects 503 when Sheets env is missing, or 200/400 when configured.
 *
 * Usage: node scripts/smoke-register.mjs [baseUrl]
 * Default baseUrl: http://localhost:3000
 */

const base = process.argv[2] ?? "http://localhost:3000";

const res = await fetch(`${base}/api/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firstName: "Smoke",
    lastName: "Test",
    preferredName: "",
    email: "smoke@example.com",
    phone: "",
    cityState: "Huntsville, AL",
    gradNote: "2017",
    hearAbout: "smoke script",
    consent: true,
    website: "",
  }),
});

const text = await res.text();
console.log(res.status, text);

if (res.status === 503 || res.status === 200 || res.status === 400) {
  process.exit(0);
}

process.exit(1);
