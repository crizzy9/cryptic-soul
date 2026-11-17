# Two Page

A two-page resume using the original dense layout from `resume/OnePage/cv.tex`.
Its preamble, macros and three-line contact header are copied verbatim: the same
10pt font stack, 0.3in side margins, 0.25in top/bottom margins, black small-cap
section headings and rules, compact four-field job rows, circle bullets and no
page numbering. Fit the content to this pinned layout; do not alter its visual
parameters.

Coverage: summary, all seven roles and 33 experience bullets, full education,
seven skill rows, eight curated projects and three certifications. The original
one-page source is preserved separately. A deliberate break before the early
TurboTax roles keeps each role together and yields exactly two pages.

Editable source: `cv.tex`. Final PDF: `Shyam-Padia-Resume-Two-Page.pdf`.

Build from the repository root, keeping auxiliary files outside the source folder:

```sh
mkdir -p /tmp/crypticsoul-resume-build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume-build 'resume/Two Page/cv.tex'
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume-build 'resume/Two Page/cv.tex'
cp /tmp/crypticsoul-resume-build/cv.pdf 'resume/Two Page/Shyam-Padia-Resume-Two-Page.pdf'
```

Verify exactly two pages, render both pages, and check for clipped text or stranded
headings after each revision. Career facts come from the reviewed public resume
sources and `src/data/profile.ts`; project qualifiers remain explicit. No private
application or archived employer notes are embedded.
