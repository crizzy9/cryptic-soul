---
title: "Nix turns a development environment into a reviewable dependency"
description: "Use Nix development shells and pinned inputs to make toolchains explicit, while understanding what reproducibility does and does not guarantee."
pubDate: "2026-11-16"
draft: true
tags: ["nix", "development", "reproducibility", "devops"]
---

A setup guide is often an unofficial dependency manager. It says which Python to install, which compiler happened to work, and which missing library someone discovered last week. The application has a lock file; the machine needed to run it has a collection of memories.

What interests me about Nix is the possibility of treating that machine-facing part of a project as code. The environment becomes something a colleague can inspect, enter, and change through the same review process as the application. You can start with one repository rather than replacing an operating system.

## Separate the environment from the computer

Nix is a package manager and build system; NixOS is an operating system built around it. A development shell only needs Nix on a supported host. It can provide tools for a project without asking every developer to install those tools into a shared global profile. The official [declarative shell tutorial](https://nix.dev/tutorials/first-steps/declarative-shell.html) demonstrates this repository-owned environment pattern.

Consider a small Python service that also needs Git and a task runner. The useful question is no longer whether every laptop has approximately the right utilities. It is whether the repository describes the utilities it expects, and whether its tests run inside that description.

That distinction changes maintenance. A toolchain update can arrive as a diff with a test result. A failing build can be investigated against a known input revision. Onboarding instructions can concentrate on the work rather than collecting package-installation commands for several operating systems.

## Give the repository one explicit entry point

The following is a complete illustrative `flake.nix`. It defines a shell for four common Linux and macOS architecture combinations. It does not package the application itself.

```nix
{
  description = "A small Python development toolchain";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
    in
    {
      devShells = nixpkgs.lib.genAttrs systems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShellNoCC {
            packages = with pkgs; [ python3 git just ];
          };
        });
    };
}
```

The branch in `inputs.nixpkgs.url` is the source to resolve when creating or updating the lock. The accompanying `flake.lock` records the resolved input revisions. Keep both files under version control, and review lock updates deliberately. Merely writing a branch name into `flake.nix` does not freeze that branch forever. Flakes and the newer CLI remain marked experimental in the [official flakes documentation](https://nix.dev/concepts/flakes.html).

With the `nix-command` and `flakes` experimental features enabled in your Nix installation, the basic workflow is:

```sh
nix flake lock
nix develop
python3 --version
```

For an automated invocation, use `nix develop --command python3 --version`. A CI job can use the same entry point for the repository's actual test command. The [`nix develop` reference](https://nix.dev/manual/nix/2.34/command-ref/new-cli/nix3-develop.html) documents how it selects `devShells.<system>.default` and runs a command inside that environment.

One small source-control detail matters: when a local flake is read through Git, untracked source files are not automatically part of its source tree. A file existing in your working directory is not sufficient evidence that the flake can see it. The [flake reference manual](https://nix.dev/manual/nix/2.34/command-ref/new-cli/nix3-flake.html) explains that source-selection behavior.

## A pinned shell is the beginning of the contract

The Python interpreter above is selected through Nixpkgs. Your application's Python dependencies still need a deliberate strategy: a dependency lock plus an installer inside the shell, or a Nix package definition that captures those dependencies in the build graph.

Those options provide different guarantees. A developer running an installer in an interactive shell can still reach the network, create a virtual environment, and change files. The shell supplies tools; it does not turn every command typed into it into a reproducible Nix build.

I would make the boundary visible in the repository:

- The Nix lock selects the operating-system-level toolchain.
- The language lock selects application libraries.
- The test command establishes whether those selections work together.
- A package definition, when added, describes how to build the deliverable.

If those responsibilities are mixed together, a team can end up with two apparent locks and an undocumented installation step that defeats both.

## Build graphs create possibilities beyond onboarding

A Nix derivation describes a build step and its declared inputs. Dependencies connect those steps into a graph. The [derivation reference](https://nix.dev/manual/nix/2.34/store/derivation/index.html) is useful for understanding why changing a dependency can produce a different output path without overwriting the previous result.

That model opens up practical workflows: reusable build artifacts, several toolchain versions living side by side, CI jobs that evaluate the same project definition, and release outputs built from reviewed inputs. Binary caches can reduce repeated work, provided the organization also manages which caches and signing keys it trusts.

It is worth keeping the development and release paths connected. A shell that helps an engineer investigate a failed package is more valuable than a separate handcrafted environment whose dependencies only resemble the release build.

## Reproducibility has layers

A locked dependency graph is not a proof of byte-for-byte reproducibility. A builder can embed timestamps, rely on nondeterministic ordering, or behave differently on different hardware. Network fetches and fixed-output derivations also need careful handling. Nix's [sandbox settings](https://nix.dev/manual/nix/2.34/command-ref/conf-file.html#conf-sandbox) help restrict undeclared build inputs, but the details depend on the platform and configuration.

A useful review distinguishes three questions: can another machine resolve the same inputs, can it build the program successfully, and does rebuilding produce identical output? Nix provides mechanisms for [checking build determinism](https://nix.dev/manual/nix/2.34/advanced-topics/diff-hook.html); the last question still needs evidence.

Portability deserves the same precision. Exporting shells for Linux and macOS does not make their binaries identical or guarantee every package supports both. CI should test the platforms the project claims to support. Missing source archives, unavailable caches, platform-specific dependencies, and the host kernel remain operational concerns.

## Start where the uncertainty is expensive

My preferred first adoption target would be a repository with a troublesome toolchain or recurring onboarding failures. Describe its essential tools, lock the inputs, and make CI enter the shell. Avoid immediately turning every local preference into a shared requirement.

The payoff is a smaller gap between “this is how I set up my laptop” and “this is what the project requires.” Nix gives that gap a representation that can be reviewed, tested, and improved. The interesting possibilities grow from keeping the representation honest.

## Further reading

- [Nix development shells](https://nix.dev/tutorials/first-steps/declarative-shell.html)
- [Flakes and input locking](https://nix.dev/concepts/flakes.html)
- [The `nix develop` command](https://nix.dev/manual/nix/2.34/command-ref/new-cli/nix3-develop.html)
- [Verifying build reproducibility](https://nix.dev/manual/nix/2.34/advanced-topics/diff-hook.html)

For the next layer, see [NixOS makes infrastructure a program you can test](/blog/nixos-makes-infrastructure-a-program-you-can-test).
