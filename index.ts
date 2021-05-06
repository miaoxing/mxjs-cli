import * as yargs from 'yargs';
import * as npmlog from 'npmlog';
import * as globby from 'globby';

export default async (): Promise<yargs.Argv> => {
  const paths = await globby('plugins/*/commands/*');
  paths.forEach(path => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    yargs.command(require(process.cwd() + '/' + path).default);
  });

  return yargs
    .options({
      'log-level': {
        group: 'Global Options:',
        describe: 'The level to display logs at',
        type: 'string',
        default: 'info',
      },
    })
    .middleware([
      argv => {
        // @ts-ignore 实际是可写的
        npmlog.level = argv.logLevel;
      },
    ])
    .strict()
    .help();
};
