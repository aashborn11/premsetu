/**
 * E2E test — manual UPI payment flow.
 * Run with the dev server up on :5000 (in-memory DB is fine):
 *   node e2e-upi.js
 */
"use strict";

const BASE = "http://localhost:5000/api";
let pass = 0;
let fail = 0;

function check(name, ok, detail = "") {
  if (ok) { pass += 1; console.log(`  ✓ ${name}`); }
  else    { fail += 1; console.log(`  ✗ ${name} ${detail}`); }
}

async function req(method, path, { token, body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  let data = null;
  try { data = await res.json(); } catch { /* non-JSON */ }
  return { status: res.status, data };
}

(async () => {
  console.log("UPI payment flow e2e\n");

  // 1. Register a fresh user
  const email = `upi_${Date.now()}@test.com`;
  const reg = await req("POST", "/auth/register", {
    body: {
      fullName: "Upi Tester",
      email,
      password: "Tester123",
      phone: "9876543210",
      gender: "male",
      dateOfBirth: "1995-05-10"
    }
  });
  check("register new user", reg.status === 201 || reg.status === 200, `status=${reg.status}`);
  const token = reg.data?.token;
  check("got auth token", Boolean(token));

  // 2. Fresh user is unpaid
  const me1 = await req("GET", "/profile/me", { token });
  check("new user isPaid=false", me1.data?.user?.isPaid === false || me1.data?.isPaid === false);

  // 3. Confirm without auth → 401
  const noAuth = await req("POST", "/payment/confirm");
  check("confirm without token rejected", noAuth.status === 401 || noAuth.status === 403, `status=${noAuth.status}`);

  // 4. Confirm with auth + txn ref → success
  const conf = await req("POST", "/payment/confirm", {
    token,
    body: { txnId: "TESTUTR123456" }
  });
  check("confirm succeeds", conf.status === 200 && conf.data?.success === true, `status=${conf.status}`);

  // 5. isPaid flipped
  const me2 = await req("GET", "/profile/me", { token });
  const paid = me2.data?.user?.isPaid ?? me2.data?.isPaid;
  check("isPaid=true after confirm", paid === true);

  // 6. Double confirm → 400 already a member
  const again = await req("POST", "/payment/confirm", { token, body: {} });
  check("second confirm rejected (already member)", again.status === 400, `status=${again.status}`);

  // 7. paymentRef / paidAt never leak via public teaser
  const teaser = await req("GET", "/matches/suggestions");
  const leak = (teaser.data?.users || []).some(
    (u) => "paymentRef" in u || "paidAt" in u || "isPaid" in u
  );
  check("no payment fields leak in public teaser", !leak);

  // 8. Oversized txnId is truncated server-side (accepts without error)
  const email2 = `upi2_${Date.now()}@test.com`;
  const reg2 = await req("POST", "/auth/register", {
    body: {
      fullName: "Upi Tester Two",
      email: email2,
      password: "Tester123",
      phone: "9876543211",
      gender: "female",
      dateOfBirth: "1996-06-12"
    }
  });
  const token2 = reg2.data?.token;
  const longRef = "X".repeat(500);
  const conf2 = await req("POST", "/payment/confirm", { token: token2, body: { txnId: longRef } });
  check("long txnId handled", conf2.status === 200 && conf2.data?.success === true, `status=${conf2.status}`);

  console.log(`\nResult: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => {
  console.error("E2E crashed:", e.message);
  process.exit(1);
});
