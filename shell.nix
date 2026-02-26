flake:
{ pkgs, ... }:
let
  # Hostplatform system
  system = pkgs.hostPlatform.system;

  # Production package
  base = flake.packages.${system}.default;
in
pkgs.mkShell {
  packages = with pkgs; [
    # Nix
    nixd
    statix
    deadnix
    alejandra
  ];

  shellHook = ''
    printf "Installing pnpm dependencies\n"
    pnpm install

    printf "Adding node_modules to PATH\n"
    export PATH="$PWD/node_modules/.bin/:$PATH"

    printf "Adding necessary aliases\n"
    alias scripts='jq ".scripts" package.json'

    printf "Copying necessary fonts\n"
    cp "${
      pkgs.google-fonts.override { fonts = [ "Inter" ]; }
    }/share/fonts/truetype/Inter[opsz,wght].ttf" ./src/app/Inter.ttf
  '';
}
