/**
* Validation helpers for simple use cases
*
* @author  Avraam Mavridis      <avr.mav@gmail.com>
*
*/
import { descriptorIsFunc } from './helpers';

/**
 * Tests if the prop is an Object
 *
 * @method isObject
 *
 * @param  { any } prop
 *
 * @return { Boolean }
 */
export const _isObject = function ( prop ) {
  return ( typeof prop === 'object' ) && ( prop !== null );
};

/**
 * Tests if something is an Array
 *
 * @type { Boolean }
 */
export const _isArray = Array.isArray;

/**
 * Tests if the prop is a number
 *
 * @method isNumber
 *
 * @param  { any } prop
 *
 * @return { Boolean }
 */
export const _isNumber = function ( prop ) {
  return typeof prop === 'number' && isFinite( prop );
};

/**
 * Tests if the prop is an integer
 *
 * @method inInteger
 *
 * @param  { any } prop
 *
 * @return { Boolean }
 */
export const _isInteger = function ( prop ) {
  return _isNumber( prop ) && prop % 1 == 0;
};

/**
 * Tests if the prop is Boolean
 *
 * @method isBoolean
 *
 * @param  { any }  prop
 *
 * @return { Boolean }
 */
export const _isBoolean = function ( prop ) {
  return typeof prop === 'boolean';
};

/**
 * Tests if the prop is Function
 *
 * @method isBoolean
 *
 * @param  { any }  prop
 *
 * @return { Boolean }
 */
export const _isFunction = function ( prop ) {
  return typeof prop === 'function';
};

/**
 * Tests if the prop is a Promise
 *
 * @method isPromise
 *
 * @param  { any }  prop
 *
 * @return { Boolean }
 */
export const _isPromise = function ( prop ) {
  return prop !== null &&
   ( typeof prop === 'object' || typeof prop === 'function' ) &&
    typeof prop.then === 'function';
};

/**
 * Tests if the prop is a String
 *
 * @method isString
 *
 * @param  { any }  prop
 *
 * @return { Boolean }
 */
export const _isString = function ( prop ) {
  return typeof prop === 'string';
};

/**
 * validate a schema property
 *
 * @method _validateProperty
 *
 * @param  { any }          property
 * @param  { string }       type
 *
 * @return { boolean } or throws exception
 */
const _validateProperty = function ( property, type )
{
  let isValid = true;
  switch ( type )
  {
    case 'object':
      isValid = _isObject( property );
      break;
    case 'number':
      isValid = _isNumber( property );
      break;
    case 'integer':
      isValid = _isInteger( property );
      break;
    case 'boolean':
      isValid = _isBoolean( property );
      break;
    case 'array':
      isValid = _isArray( property );
      break;
    case 'function':
      isValid = _isFunction( property );
      break;
    case 'string':
      isValid = _isString( property );
      break;
    case 'promise':
      isValid = _isPromise( property );
      break;
    default:
      throw Error( `${ type } invalid type` );
  }
  if ( !isValid ) {
    throw Error( `${ property } is not ${ type }` );
  }
};

/**
 * validate against a schema
 *
 * @method isValidSchema
 *
 * @param  { object }      schema
 * @param  { number }      position = 0
 *
 * @return { Boolean }
 */
export const _isValidSchema = function ( schema, position = 0 ) {
  const schemaKeys = Object.keys( schema );

  return function ( target, key, descriptor )
  {
    const func = descriptor.value;
    descriptor.value = function ( ...args )
    {
      const prop = args[ position ];
      if ( !_isObject( prop ) )
      {
        throw Error( `${prop} is not an object` );
      }
      for ( const schemaKey of schemaKeys ) {
        if ( !prop.hasOwnProperty( schemaKey ) )
        {
          throw Error( `Object has not "${schemaKey}" property` );
        }
        _validateProperty( prop[ schemaKey ], schema[ schemaKey ] );
      }
      return func.apply( this, args );
    };
    return descriptor;
  };
};

/**
 * Returns the positions to validate
 *
 * @method _getPropsToValidate
 *
 * @param  {[type]}            position = 0  [description]
 * @param  {[type]}            args     = [] [description]
 *
 * @return {[type]}            [description]
 */
const _getPropsToValidate = function ( position = 0, args = [] )
{
  const positions = [].concat( position );
  const props = [];
  for ( const p of positions ) {
    if ( !!args[ p ] ) {
      props.push( args[ p ] );
    }
  }
  return props;
};

/**
 * Base decorator function for validation
 *
 * @method _basefunc
 *
 * @param  { integer }   position        Position of the property to validate
 * @param  { function }  validationFunc  Validation function
 * @param  { string }    errorMsg        Error message in case of invalid
 *
 * @return { function }  decorator function
 */
export const _basefunc = function ( position = 0, validationFunc, errorMsg, failSilent ) {

  return function ( key, target, descriptor )
  {
    const func = descriptor.value;
    descriptorIsFunc( key, func );
    descriptor.value = function ( ...args )
    {
      const props = _getPropsToValidate( position, args );
      props.forEach( function ( prop ) {
        if ( !validationFunc( prop ) )
        {
          if ( failSilent ) return;
          throw Error( `${ prop } ${ errorMsg }` );
        }
      } );
      return func.apply( this, args );
    };

    return descriptor;
  };
};
