describe('MappedCollection', function () {

  var MappedCollection = window.ResMed.ECO.Util.MappedCollection,
      sut;

  beforeEach(function () {
    sut = new MappedCollection('key');
  });

  it('behaves like an array', function () {
    var alpha = { key: 'a', value: 'alpha' },
        beta = { key: 'b', value: 'beta' };

    expect(sut.length).toBe(0);

    sut.push(alpha);
    expect(sut.length).toBe(1);
    expect(sut[0]).toBe(alpha);

    sut.push(beta);
    expect(sut.length).toBe(2);
    expect(sut[1]).toBe(beta);
  });

  it('provides access to values by key', function () {
    var alpha = { key: 'a', value: 'alpha' },
        beta = { key: 'b', value: 'beta' };

    sut.push(alpha, beta);

    expect(sut.get('a')).toBe(alpha);
    expect(sut.get('b')).toBe(beta);
  });

  it('knows whether or not it has a value with the provided key', function () {
    var alpha = { key: 'a', value: 'alpha' },
        beta = { key: 'b', value: 'beta' };

    sut.push(alpha, beta);

    expect(sut.hasKey('a')).toBe(true);
    expect(sut.hasKey('b')).toBe(true);
    expect(sut.hasKey('c')).toBe(false);
  });

  it('throws an error when an invalid key field is provided to the constructor', function () {
    expect(function () { new MappedCollection();   }).toThrow();
    expect(function () { new MappedCollection(''); }).toThrow();
    expect(function () { new MappedCollection(0);  }).toThrow();
  });

  it('throws an error when an object with a duplicate key is added', function () {
    var alpha = { key: 'a', value: 'alpha' },
        beta = { key: 'b', value: 'beta' },
        beta2 = { key: 'b', value: 'beta2' };

    sut.push(alpha, beta);
    expect(function () { sut.push(beta2); }).toThrow();

    expect(sut.length).toBe(2);
    expect(sut.get('a')).toBe(alpha);
    expect(sut.get('b')).toBe(beta);
  });

  it('throws an error when an object does not have the expected key field', function () {
    expect(function () { sut.push({ value: 'bad' }); }).toThrow();
    expect(sut.length).toBe(0);
  });

});