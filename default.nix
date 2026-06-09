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

    # cat ./next.config.ts
    # ls -la ./.next

    # # Copy standalone as library
    # cp -r ./.next/standalone $out/lib

    # # Create filler folders
    # mkdir -p $out/lib/.next

    # # Copy static contents
    # if [ -d "./.next/static" ]; then
    #   cp -R ./.next/static $out/lib/.next/static
    # fi

    # # Copy public assets
    # if [ -d "./public" ]; then
    #   cp -R ./public $out/lib/public
    # fi

    # # Create executable directory
    # mkdir -p $out/bin

    # # Copy shell script to executables
    # cp -r $ {exec} $out/bin/$ {manifest.name}-start
  '';

  pnpmDeps = pkgs.fetchPnpmDeps {
    pname = manifest.name;
    version = manifest.version;
    src = source;
    fetcherVersion = 3;
    hash = "sha256-Pb/636RcvVxOx4jSF7N5k4A0xYnuTwXcBpNuFT+EZ/8=";
  };

  meta = with pkgs.lib; {
    homepage = "https://uchar.uz";
    mainProgram = "${manifest.name}-start";
    description = "Website of Uchar";
    license = with licenses; [ cc-by-40 ];
    platforms = with platforms; linux ++ darwin;
    maintainers = with maintainers; [ orzklv ];
  };
}
