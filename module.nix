# Refer to this for more:
# https://www.reddit.com/r/NixOS/comments/1fxf0am/setting_up_a_nextjs_project_as_a_systemd_service/
flake:
{
  config,
  lib,
  pkgs,
  ...
}:
let
  # Shortcut config
  cfg = config.services.uchar.website;

  # Packaged server
  contents = flake.packages.${pkgs.stdenv.hostPlatform.system}.default;
in
{
  options = with lib; {
    services.uchar.website = {
      enable = mkEnableOption ''
        Uchar's official website.
      '';

      proxy = {
        enable = mkEnableOption ''
          Proxy reversed method of deployment
        '';

        domain = mkOption {
          type = with types; nullOr str;
          default = null;
          example = "uchar.uz";
          description = "Domain to use while adding configurations to web proxy server";
        };

        alias = mkOption {
          type = with types; listOf str;
          default = [ ];
          example = [ "www.uchar.uz" ];
          description = "List of domain aliases to add to domain";
        };
      };

      package = mkOption {
        type = types.package;
        default = contents;
        description = ''
          Packaged uchar.uz website contents for nginx.
        '';
      };
    };
  };

  config = lib.mkIf cfg.enable {
    warnings = [
      (lib.mkIf (
        cfg.proxy.enable && cfg.proxy.domain == null
      ) "services.uchar.website.proxy.domain must be set in order to properly generate certificate!")
    ];

    services.nginx.virtualHosts = lib.mkIf (cfg.enable && cfg.proxy.enable) (
      lib.debug.traceIf (isNull cfg.proxy.domain)
        "proxy.domain can't be null, please specicy it properly!"
        {
          "${cfg.proxy.domain}" = {
            forceSSL = true;
            enableACME = true;
            serverAliases = cfg.proxy.alias;
            root = cfg.package;
          };
        }
    );
  };
}
