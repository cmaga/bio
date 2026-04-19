# Resume

LaTeX source for my resume. Builds a PDF that ships with the Astro site at `/resume.pdf`.

## Prerequisites (macOS)

```sh
# TeX distribution (~4GB, every package bundled)
brew install --cask mactex

# Verify tooling on PATH (bundled with MacTeX)
which latexindent chktex
```

Restart the shell after installing MacTeX so `/Library/TeX/texbin` lands on `PATH`.

**Smaller alternative:** `brew install --cask basictex` (~100MB). `tlmgr install` missing packages as they come up.

### VS Code

Install the [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop) extension. The repo's `.vscode/settings.json` configures:

- Build on save via `latexmk`, then copy the PDF to `../public/resume.pdf`
- Format on save via `latexindent`
- Lint via `chktex` as you type
- Soft-wrap long lines in `.tex` files

## Build

Saving any `.tex` file in VS Code triggers the full flow. The output directory is set in `.latexmkrc` (`$out_dir = 'output';`), so the CLI doesn't need an `-outdir` flag — run from `bio/resume/`:

```sh
latexmk -pdf 2026.tex && cp output/2026.pdf ../public/resume.pdf
```

Clean scratch:

```sh
latexmk -C
```

## File layout

```text
resume/
  2026.tex             # entry point — \input{}s the pieces below
  preamble.tex         # document class, packages, custom commands
  sections/
    header.tex         # name + contact line
    summary.tex
    experience.tex
    projects.tex
    skills.tex
    education.tex
  output/              # scratch + intermediate PDF (gitignored)
  .latexmkrc           # pins latexmk's $out_dir to ./output
  .chktexrc            # linter suppressions
  .latexindent.yaml    # formatter config
public/
  resume.pdf           # deployed artifact, served at /resume.pdf
```

To start a new year, copy `2026.tex` to `2027.tex` and edit the `latex-workshop.latex.recipe.default` flow if you want the new year's file to be the default build target.
