# Local homepage showcase

The two languages show the design studies, fictional gallery-to-project example, and graphical situations in a regular build. The German homepage includes the self-contained painter form at `/demos/malerbetrieb/`. It does not submit data. Local client material is excluded from standard builds.

- The optional unreleased client assets are not included in Git. Existing owners who already have approved local copies can keep them in the ignored `.local-preview/` folder. The client route is included only in local builds when its draft exists, and the videos are copied only when a complete local set exists. Without those files the design, painter demo and fictional examples still build and work.
- Do not push a generated local build or put the private preview flag on a deployment job. The preview does not constitute publication consent.

```sh
VP_PRIVATE_PREVIEW=1 ./node_modules/.bin/astro build
python3 -m http.server 4327 --bind 127.0.0.1 --directory dist
```

If a preview already uses that port, keep the existing server and make a staged build before switching its output directory. Keep private client files out of `public/`.
