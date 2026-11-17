---
title: "NixOS makes infrastructure a program you can test"
description: "Explore declarative services, reusable modules, Home Manager, virtual-machine tests, and the state boundaries that make NixOS operations understandable."
pubDate: "2026-11-16"
draft: true
tags: ["nix", "nixos", "home-manager", "infrastructure", "testing"]
heroImage: "/blog/nix-declarative-hardware.webp"
heroImageAlt: "Close-up of chips and components on a computer circuit board."
heroImageCredit: "Alexandre Debiève on Unsplash"
heroImageSource: "https://unsplash.com/photos/macro-photography-of-black-circuit-board-FO7JIlwjOtU"
---

A machine usually has two configurations: the one in the documentation and the one left behind by months of commands. When they disagree, rebuilding the machine becomes a reconstruction exercise.

NixOS offers a different starting point. Describe the intended system in Nix modules, evaluate that description, and build a system configuration from it. The most interesting consequence is the ability to review and test that description before asking a real machine to use it.

This is the system-level companion to [using Nix for development environments](/blog/nix-turns-a-development-environment-into-a-reviewable-dependency). The same preference for explicit inputs becomes useful at the level of services, users, and operating-system configuration.

## Describe intent at the right level

A service module can express more than installing a binary. It can compose the package with its configuration and service-management integration. The [NixOS manual](https://nixos.org/manual/nixos/stable/#ch-configuration) explains how option definitions from modules combine into the final system.

For example, this illustrative module enables a local HTTP service and declares its document root:

```nix
{ pkgs, ... }:
{
  services.nginx = {
    enable = true;
    virtualHosts."localhost" = {
      root = pkgs.writeTextDir "index.html" "Hello from NixOS";
    };
  };

  environment.systemPackages = [ pkgs.curl ];
}
```

This fragment is not a complete machine configuration or a production web-service deployment. Hardware, boot, networking, TLS, access policy, and operational requirements still need definitions. Its value is that the relationship between a service and the content it serves is visible in one reviewable expression.

The design exercise is deciding which intent belongs in a reusable module and which belongs to a particular machine. A module for an HTTP service should not quietly choose a developer's account name, storage device, or network address. Those choices are inputs to the role, not inherent properties of the role.

## Reuse policy without hiding it

Once a configuration grows, modules can separate machine identity from shared behavior. A host selects roles; roles compose the options that implement them. The module system also provides typed options and merging rules, so it is important to learn how definitions combine rather than assuming every later assignment simply overwrites an earlier one.

I would keep the first abstraction small. A module should remove a meaningful repetition or enforce a requirement that deserves a single owner. Creating a wrapper for every existing option often makes the upstream documentation harder to use without improving the system.

A review should be able to answer: what turns this behavior on, which inputs does it require, and what other behavior does enabling it introduce? A reusable module that starts an unexpected public listener has failed that review even if its Nix syntax is immaculate.

## Extend the model into the user environment

System services are only one source of drift. Shell tools, editor configuration, and other user-level settings also affect how a machine behaves. [Home Manager](https://nix-community.github.io/home-manager/) provides declarative user-environment management and can run separately or integrate with NixOS.

That gives the configuration a useful division of responsibility. NixOS can own machine-level services and accounts; Home Manager can own selected user packages and supported application configuration. Application data should remain outside both unless there is an explicit data-management plan.

Compatibility settings deserve particular care. Home Manager's `home.stateVersion` is not the Nixpkgs version selector. Its [upgrade guidance](https://nix-community.github.io/home-manager/usage/upgrading.html) says to retain the original state version unless deliberately migrating behavior, while matching the Home Manager and Nixpkgs release branches. Changing every version-shaped string during an update is not a sound upgrade procedure.

## Test the relationship between services

A successful evaluation proves that Nix accepted an expression. A successful build establishes another useful fact. Neither proves that a service answers requests correctly after boot.

NixOS virtual-machine tests add that missing layer. The [official testing tutorial](https://nix.dev/tutorials/nixos/integration-testing-using-virtual-machines.html) shows declarative test machines driven by Python through QEMU. Tests can exercise more than one machine, which makes them useful for checking interactions across a small deployment.

For the HTTP module above, the test objective should be concrete: boot a disposable machine, wait for the service, and request the expected content. This expression is a fragment for a Linux flake check where `pkgs` is already bound to the chosen Nixpkgs input:

```nix
pkgs.testers.runNixOSTest {
  name = "local-http";

  nodes.server = { pkgs, ... }: {
    services.nginx.enable = true;
    services.nginx.virtualHosts."localhost".root =
      pkgs.writeTextDir "index.html" "Hello from NixOS";
    environment.systemPackages = [ pkgs.curl ];
  };

  testScript = ''
    start_all()
    server.wait_for_unit("nginx.service")
    server.succeed("curl --fail http://localhost | grep 'Hello from NixOS'")
  '';
}
```

The example establishes a small functional contract. Real tests should also cover the failures that matter: a dependency arriving late, invalid credentials, missing storage, or recovery after a restart. A Linux builder with the relevant virtualization capabilities is required; evaluating a test expression on a laptop does not establish that the VM test ran.

## Generations make configuration recovery practical

NixOS keeps system generations that can provide a route back to an earlier configuration. The [rollback documentation](https://nixos.org/manual/nixos/stable/#sec-rollback) describes both running-system recovery and choosing retained generations during boot.

The word “configuration” matters. Returning to an earlier service binary does not reverse a database migration that binary already performed. A generation is not a point-in-time snapshot of every mutable file, nor a transaction spanning external APIs and storage.

For a stateful service, I would review three lifecycles separately:

| Lifecycle | What needs a recovery plan |
| --- | --- |
| Configuration | Packages, generated files, service definitions, and retained generations |
| Data | Database schemas, uploaded content, backups, and tested restores |
| External effects | Messages sent, provider changes, and actions a local rollback cannot undo |

This separation also changes upgrade planning. If a new application writes a schema an older version cannot read, “keep the old generation” is only one part of recovery. The data backup and the compatibility strategy have to exist before the upgrade.

## Keep secrets out of build artifacts

A declaration can refer to a secret without embedding its plaintext. Putting a password directly into a Nix string can copy it into generated artifacts in the store, where ordinary store contents are readable to local users. Source control is not an appropriate destination either.

Tools such as [sops-nix](https://github.com/Mic92/sops-nix) support encrypted source material and runtime provisioning with explicit ownership and permissions. That mechanism still requires a key-management and recovery plan. Encryption does not decide who should receive a secret or make credentials safe to log.

I would give each service the narrow runtime secret reference it needs and keep its normal configuration reviewable without access to plaintext. The boundary should be easy to explain during both deployment and incident recovery.

## A stronger foundation still needs operations

Declarative configuration makes a system easier to reason about when changes, tests, and observed behavior stay connected. It does not remove capacity planning, monitoring, patch review, or the need to practice a restore.

The possibility I find most compelling is a repeatable loop: describe the intended behavior, test it in isolation, build the reviewed configuration, and let an operator apply it with an appropriate recovery plan. Infrastructure becomes a program with observable consequences, rather than a transcript of commands someone hopes can be replayed.

## Further reading

- [NixOS configuration and modules](https://nixos.org/manual/nixos/stable/#ch-configuration)
- [NixOS virtual-machine integration tests](https://nix.dev/tutorials/nixos/integration-testing-using-virtual-machines.html)
- [Home Manager upgrade and state-version guidance](https://nix-community.github.io/home-manager/usage/upgrading.html)
- [sops-nix secret provisioning](https://github.com/Mic92/sops-nix)
