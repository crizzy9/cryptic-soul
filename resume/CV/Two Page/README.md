# Two Page

A two-page resume using the original dense layout from `resume/CV/OnePage/cv.tex`.
Its preamble, macros and three-line contact header are copied verbatim: the same
10pt font stack, 0.3in side margins, 0.25in top/bottom margins, black small-cap
section headings and rules, compact four-field job rows, circle bullets and no
page numbering. Fit the content to this pinned layout; do not alter its visual
parameters.

Page one contains the summary, education, all seven roles and 33 experience
bullets, and three certifications. Page two contains seven skill rows, eleven
projects, and two open-source contributions. Project rows show the starting
month and year on the right and the subtitle below the title.

Editable source: `cv.tex`. Final PDF: `Shyam-Padia-Resume-Two-Page.pdf`.

Build from the repository root, keeping auxiliary files outside the source folder:

```sh
mkdir -p /tmp/crypticsoul-resume-build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume-build 'resume/CV/Two Page/cv.tex'
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume-build 'resume/CV/Two Page/cv.tex'
cp /tmp/crypticsoul-resume-build/cv.pdf 'resume/CV/Two Page/Shyam-Padia-Resume-Two-Page.pdf'
```

Verify exactly two pages, render both pages, and check for clipped text or stranded
headings after each revision. Career facts come from the reviewed public resume
sources and `src/data/profile.ts`; project qualifiers remain explicit. No private
application or archived employer notes are embedded.
