import * as yargs from 'yargs';
import * as npmlog from 'npmlog';
import * as globby from 'globby';

export default async () => {
  const paths = await globby('plugins/*/commands/*');
  paths.forEach(path => {
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
        // @ts-ignore
        npmlog.level = argv.logLevel;
      },
    ])
    .strict()
    .help();
};
