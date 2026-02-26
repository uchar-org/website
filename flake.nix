{
  description = "Official website of Uchar Messenger";

  inputs = {
    # Too old to work with most libraries
    # nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05";

    # Perfect!
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    # The flake-parts library
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-parts,
      ...
    }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } (
      { ... }:
      {
        systems = [
          "x86_64-linux"
          "aarch64-linux"
          "x86_64-darwin"
          "aarch64-darwin"
        ];
        flake = {
          # Deployment module
          nixosModules.server = import ./module.nix self;
        };
        perSystem =
          { pkgs, ... }:
          {
            # Nix script formatter
            formatter = pkgs.nixfmt-tree;

            # Development environment
            devShells.default = import ./shell.nix self { inherit pkgs; };

            # Output package
            packages = rec {
              default = ssr;
              ssr = pkgs.callPackage ./default-ssr.nix { inherit pkgs; };
              ssg = pkgs.callPackage ./default-ssg.nix { inherit pkgs; };
            };
          };
      }
    );
}
