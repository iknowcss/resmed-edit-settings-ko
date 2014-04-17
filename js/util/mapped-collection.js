(function (ResMed) {

  MappedCollection.prototype = [];
  MappedCollection.prototype.constructor = MappedCollection;
  function MappedCollection(keyField) {
    if (_.isString(keyField) && keyField.length > 0) {
      this.keyField = keyField;
    } else {
      throw 'keyField must be a valid string; got "' + keyField + '"';
    }
    this.__map = {};
  }

  _.extend(MappedCollection.prototype, {

    push: function () {
      _.each(arguments, function (obj) {
        if (this.__mapObject(obj)) {
          Array.prototype.push.call(this, obj);
        }
      }, this);
    },

    get: function (key) {
      return this.__map[key];
    },

    hasKey: function (key) {
      return this.__map.hasOwnProperty(key);
    }

  });

  _.extend(MappedCollection.prototype, {

    __mapObject: function (obj) {
      var key;
      if (obj.hasOwnProperty(this.keyField)) {
        key = obj[this.keyField];
        if (!this.__map.hasOwnProperty(key)) {
          this.__map[key] = obj;
        } else {
          throw 'Could not add object; duplicate key found for "' + key + '"';
        }  
      } else {
        throw 'Could not add object; did not have field "' + this.keyField + '"';
      }
      return true;
    }

  });

  /* Export */
  ResMed.ECO.Util.MappedCollection = MappedCollection;

}(window.ResMed));