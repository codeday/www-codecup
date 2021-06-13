/**
 * @fileoverview Joi-powered validation middleware
 */

//Imports
import withJoi from 'next-joi';

//Export
export default withJoi({
  onValidationError: (_, res) =>
  {
    return res.status(422).json({
      error: {
        name: 'Invalid Arguments',
        description: 'Please '
      }
    });
  },
});