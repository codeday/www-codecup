/**
 * @fileoverview TypeScript dependency checker
 * 
 * This tool verifies that all DefinitelyTyped dependencies are
 * production dependencies (Not just development-only dependencies)
 * otherwise the Docker image won't build
 */

//Imports
const {dirname, join} = require('path');
const {readFileSync} = require('fs');

/**
 * Panic with the specified error
 * @param error The error to panic with
 */
const panic = error =>
{
  console.log(error);
  process.exit(1);
};

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