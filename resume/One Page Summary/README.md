# One Page Summary

A concise one-page resume with a professional summary, selected outcomes, all employment roles, core skills, projects and education.

Editable source: `cv.tex`. Final PDF: `Shyam-Padia-Resume-Summary.pdf`.
The original `resume/OnePage/cv.tex` is preserved separately.

Build from the repository root, keeping auxiliary files outside the source folder:

```sh
mkdir -p /tmp/crypticsoul-resume-build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume-build 'resume/One Page Summary/cv.tex'
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume-build 'resume/One Page Summary/cv.tex'
cp /tmp/crypticsoul-resume-build/cv.pdf 'resume/One Page Summary/Shyam-Padia-Resume-Summary.pdf'
```

Check the final page count and render every page after changes. The summary version
must remain one page and the Two Page version exactly two; FullProfile has no page limit.

Career facts come from the existing resume sources and shared `src/data/profile.ts`,
including substantive commented bullets in the original one-page source. Projects
are reconciled with `src/content/project/`; development previews, ongoing qualification
and research are labeled. Portfolio publication dates are not treated as project
completion dates. Older conflicting model-direction and role-placement claims are
not combined. No private application or archived employer notes are embedded.
