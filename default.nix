{
  lib,
  stdenv,
  writeText,
  google-fonts,

  nodejs_22,
  pnpmConfigHook,
  pnpm,
  typescript,
  vips,
  fetchPnpmDeps,

  # Overridable
  conf ? import ./config.nix,
  ...
}:
let
  # Manifest data
  manifest =lib.importJSON ./package.json;

  # All source codes
  source = ./.;

  # Default configuration
  config = writeText "config.json" (builtins.toJSON conf);
in
stdenv.mkDerivation {
  pname = manifest.name;
  version = manifest.version;

  src = source;

  nativeBuildInputs =  [
    nodejs_22
    pnpmConfigHook
    pnpm
    typescript
    vips
  ];

  preBuild = ''
    cp "${
      google-fonts.override { fonts = [ "Inter" ]; }
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

    # Replace config with provided value
    rm $out/config.json
    cp ${config} $out/config.json
  '';

  pnpmDeps = fetchPnpmDeps {
    pname = manifest.name;
    version = manifest.version;
    src = source;
    fetcherVersion = 3;
    hash = "sha256-hzmgCCY2A5ETNll2FIK3byq/Ro2p11Oyv76AHPEfyaI=";
  };

  meta = with lib; {
    homepage = "https://uchar.uz";
    mainProgram = "${manifest.name}-start";
    description = "Website of Uchar";
    license = with licenses; [ cc-by-40 ];
    platforms = with platforms; linux ++ darwin;
    maintainers = with maintainers; [ orzklv ];
  };
}
