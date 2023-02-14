import {
  RecursiveResolver,
  PackageToWrapperCacheResolver,
  WrapperCache,
  StaticResolver,
  StaticResolverLike,
} from "@polywrap/uri-resolvers-js";
import { PolywrapClient, Uri } from "@polywrap/client-js";
import { fileSystemPlugin } from "@polywrap/fs-plugin-js";
import { fileSystemResolverPlugin } from "@polywrap/fs-resolver-plugin-js";
import { ExtendableUriResolver } from "@polywrap/uri-resolver-extensions-js";
import { wsPlugin } from "../../..";

// TODO: remove when 0.10.0-pre.8 is published
const defaultPackages = {
  fileSystemResolver: "wrap://package/fs-resolver",
};

// TODO: remove when 0.10.0-pre.8 is published
const defaultInterfaces = {
  fileSystem: "wrap://ens/wrappers.polywrap.eth:file-system@1.0.0",
};

export const getClient = (staticResolvers?: StaticResolverLike[]) => {
  return new PolywrapClient(
    {
      interfaces: [
        {
          interface: ExtendableUriResolver.extInterfaceUri.uri,
          implementations: [defaultPackages.fileSystemResolver],
        },
      ],
      resolver: RecursiveResolver.from(
        PackageToWrapperCacheResolver.from(
          [
            StaticResolver.from([
              // TODO: remove when 0.10.0-pre.8 is published
              {
                from: Uri.from("wrap://ens/fs.polywrap.eth"),
                to: Uri.from(defaultInterfaces.fileSystem)
              },
              {
                uri: Uri.from("wrap://ens/ws.polywrap.eth"),
                package: wsPlugin({}),
              },
              {
                uri: Uri.from(defaultPackages.fileSystemResolver),
                package: fileSystemResolverPlugin({}),
              },
              {
                uri: Uri.from(defaultInterfaces.fileSystem),
                package: fileSystemPlugin({}),
              },
              ...(staticResolvers ?? []),
            ]),
            new ExtendableUriResolver(),
          ],
          new WrapperCache()
        )
      ),
    },
    { noDefaults: true }
  );
};
