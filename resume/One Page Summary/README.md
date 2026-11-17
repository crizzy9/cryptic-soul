# One Page Summary

A one-page resume with a professional summary, seven employment roles, 23 selected achievement bullets, full education/GPAs, all seven original skill rows and three compact projects. It uses the original OnePage layout verbatim.

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

## Pinned layout

The preamble, macros and three-line contact header match `resume/OnePage/cv.tex`
verbatim: the original 10pt font settings and margins, black small-caps section rules, compact
single-line entries, circle bullets, and no page numbering. Keep Education, Work
Experience, Technical Skills and Projects in the original order, with Summary before
Education. Fit future edits by curating content; do not change visual parameters.
