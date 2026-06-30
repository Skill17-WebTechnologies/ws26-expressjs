# Express — Docker

Pinned version: **5.2.1** (WSC2026 / WorldSkills 2026 Web Technologies)

## Run

```bash
docker compose up --build
```

**What it does:** Runs the Mocha test suite (`npm test`).

**Open / use:** Watch test output.

## Notes
- Base image pinned to the WSC2026 spec: Node `24.1.0` (npm `11.5.0`) for JS frameworks,
  or PHP `8.3` + Composer `2.9.5` for PHP frameworks; MySQL `8.4` where a database is bundled.
- This repository is the **upstream framework source** checked out at its exact release tag,
  so `docker compose up` exercises the repo's own dev/build/test target rather than a demo app.
- First run is slow (dependencies install during the image build); later runs are cached.
- Stop with `docker compose down` (add `-v` to also drop the database volume).
