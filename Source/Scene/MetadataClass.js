import Check from "../Core/Check.js";
import defaultValue from "../Core/defaultValue.js";
import defined from "../Core/defined.js";
import MetadataClassProperty from "./MetadataClassProperty.js";

/**
 * A metadata class.
 *
 * @param {Object} options Object with the following properties:
 * @param {String} options.id The ID of the class.
 * @param {Object} options.class The class JSON object.
 * @param {Object.<String, MetadataEnum>} [options.enums] A dictionary of enums.
 *
 * @alias MetadataClass
 * @constructor
 */
function MetadataClass(options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);
  var id = options.id;
  var classDefinition = options.class;

  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.string("options.id", id);
  Check.typeOf.object("options.class", classDefinition);
  //>>includeEnd('debug');

  var properties = {};
  var propertiesBySemantic = {};
  for (var propertyId in classDefinition.properties) {
    if (classDefinition.properties.hasOwnProperty(propertyId)) {
      var property = new MetadataClassProperty({
        id: propertyId,
        property: classDefinition.properties[propertyId],
        enums: options.enums,
      });
      properties[propertyId] = property;
      if (defined(property.semantic)) {
        propertiesBySemantic[property.semantic] = property;
      }
    }
  }

  this._properties = properties;
  this._propertiesBySemantic = propertiesBySemantic;
  this._id = id;
  this._name = classDefinition.name;
  this._description = classDefinition.description;
  this._extras = classDefinition.extras;
  this._extensions = classDefinition.extensions;
}

Object.defineProperties(MetadataClass.prototype, {
  /**
   * The class properties.
   *
   * @memberof MetadataClass.prototype
   * @type {Object.<String, MetadataClassProperty>}
   * @readonly
   */
  properties: {
    get: function () {
      return this._properties;
    },
  },

  /**
   * A dictionary mapping semantics to class properties.
   *
   * @memberof MetadataClass.prototype
   * @type {Object.<String, MetadataClassProperty>}
   * @readonly
   */
  propertiesBySemantic: {
    get: function () {
      return this._propertiesBySemantic;
    },
  },

  /**
   * The ID of the class.
   *
   * @memberof MetadataClass.prototype
   * @type {String}
   * @readonly
   */
  id: {
    get: function () {
      return this._id;
    },
  },

  /**
   * The name of the class.
   *
   * @memberof MetadataClass.prototype
   * @type {String}
   * @readonly
   */
  name: {
    get: function () {
      return this._name;
    },
  },

  /**
   * The description of the class.
   *
   * @memberof MetadataClass.prototype
   * @type {String}
   * @readonly
   */
  description: {
    get: function () {
      return this._description;
    },
  },

  /**
   * Extras in the JSON object.
   *
   * @memberof MetadataClass.prototype
   * @type {*}
   * @readonly
   */
  extras: {
    get: function () {
      return this._extras;
    },
  },

  /**
   * Extensions in the JSON object.
   *
   * @memberof MetadataClass.prototype
   * @type {Object}
   * @readonly
   */
  extensions: {
    get: function () {
      return this._extensions;
    },
  },
});

export default MetadataClass;
