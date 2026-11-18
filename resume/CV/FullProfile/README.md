# FullProfile

An unconstrained full profile with all seven roles and 37 experience bullets, 19 project entries, seven skill groups, education/coursework, certifications and open-source contributions.

Editable source: `cv.tex`. Final PDF: `Shyam-Padia-Full-Profile.pdf`.
The original `resume/CV/OnePage/cv.tex` is preserved separately.

Build from the repository root, keeping auxiliary files outside the source folder:

```sh
mkdir -p /tmp/crypticsoul-resume-build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume-build 'resume/CV/FullProfile/cv.tex'
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume-build 'resume/CV/FullProfile/cv.tex'
cp /tmp/crypticsoul-resume-build/cv.pdf 'resume/CV/FullProfile/Shyam-Padia-Full-Profile.pdf'
```

Check the final page count and render every page after changes. The summary version
must remain one page and the Two Page version exactly two; FullProfile has no page limit.

Career facts come from the existing resume sources and shared `src/data/profile.ts`,
including substantive commented bullets in the original one-page source. Projects
are reconciled with `src/content/project/`. Project rows place the start month and
year beside the title when an earlier resume or project record supports it. The
subtitle and any development or research context go below the title. Older
conflicting model-direction and role-placement claims are
not combined. No private application or archived employer notes are embedded.

Layout is pinned to `resume/CV/OnePage/cv.tex`: the same original dense preamble,
macros, margins, fonts, header and spacing. Change content or page breaks only;
do not redesign or override the template. FullProfile has no page limit.
