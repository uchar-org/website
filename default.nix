{
  pkgs ?
    let
      lock = (builtins.fromJSON (builtins.readFile ./flake.lock)).nodes.nixpkgs.locked;
      nixpkgs = fetchTarball {
        url = "https://github.com/nixos/nixpkgs/archive/${lock.rev}.tar.gz";
        sha256 = lock.narHash;
      };
    in
    import nixpkgs { overlays = [ ]; },
  ...
}:
let
  # Manifest data
  manifest = pkgs.lib.importJSON ./package.json;

  # All source codes
  source = ./.;
in
pkgs.stdenv.mkDerivation {
  pname = manifest.name;
  version = manifest.version;

  src = source;

  nativeBuildInputs = with pkgs; [
    nodejs_22
    pnpmConfigHook
    pnpm
    typescript
    vips
  ];

  preBuild = ''
    cp "${
      pkgs.google-fonts.override { fonts = [ "Inter" ]; }
    }/share/fonts/truetype/Inter[opsz,wght].ttf" ./src/app/Inter.ttf
  '';

  buildPhase = ''
    # Build the package
    pnpm build
  '';

  installPhase = ''
    # Create output directory
    mkdir -p $out

    # Move compiled contents
    cp -r ./out/* $out
  '';

  pnpmDeps = pkgs.fetchPnpmDeps {
    pname = manifest.name;
    version = manifest.version;
    src = source;
    fetcherVersion = 3;
    hash = "sha256-hzmgCCY2A5ETNll2FIK3byq/Ro2p11Oyv76AHPEfyaI=";
  };

  meta = with pkgs.lib; {
    homepage = "https://uzberk.uz";
    mainProgram = "${manifest.name}-start";
    description = "Website of Lochin";
    license = with licenses; [ cc-by-40 ];
    platforms = with platforms; linux ++ darwin;
    maintainers = with maintainers; [ orzklv ];
  };
}
