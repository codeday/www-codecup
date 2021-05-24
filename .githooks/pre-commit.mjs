/**
 * @fileoverview Pre-commit Git hook
 */

//Imports
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import {readFileSync} from 'fs';

/**
 * Panic with the specified error
 * @param error The error to panic with
 */
 const panic = error =>
 {
   console.log(error);
   process.exit(1);
 };

//Get __dirname of this script
const __dirname = dirname(fileURLToPath(import.meta.url));

//Verify all TypeScript types are production dependencies
const rawPkg = readFileSync(join(__dirname, '../package.json'), 'utf-8');
const pkg = JSON.parse(rawPkg);

for (const dependency of Object.keys(pkg.devDependencies))
{
  if (dependency.startsWith('@types/'))
  {
    panic(`${dependency} must be a production dependency!`);
  }
}