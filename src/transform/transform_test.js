'use strict';

var should = require('should');
var path = require('path');
var fs = require('fs');
var gutil = require('gulp-util');

describe('transform', function () {
  var transform;

  it('should not crash when required', function () {
    should(function () {
      transform = require('./');
    }).not.throw();
  });

  it('should be a function', function () {
    transform.should.be.type('function');
  });

  describe('targets', function () {
    it('should have a transform function for html target files', function () {
      transform.html.should.be.type('function');
    });

    it('should have a transform function for react javascript (jsx) target files', function () {
      transform.jsx.should.be.type('function');
    });

    it('should have a transform function for jade target files', function () {
      transform.jade.should.be.type('function');
    });

    it('should have a transform function for slm target files', function () {
      transform.slm.should.be.type('function');
    });

    it('should have a transform function for haml target files', function () {
      transform.haml.should.be.type('function');
    });
  });

  describe('html as target', function () {
    it('should transform css to a link tag', function () {
      transform.html.css.should.be.type('function');
      transform.html.css('test-file.css').should.equal('<link rel="stylesheet" href="test-file.css">');
    });

    it('should transform html to a link tag', function () {
      transform.html.html.should.be.type('function');
      transform.html.html('test-file.html').should.equal('<link rel="import" href="test-file.html">');
    });

    it('should transform javascript to a script tag', function () {
      transform.html.js.should.be.type('function');
      transform.html.js('test-file.js').should.equal('<script src="test-file.js"></script>');
    });

    it('should transform coffeescript to a script tag', function () {
      transform.html.coffee.should.be.type('function');
      transform.html.coffee('test-file.coffee').should.equal('<script type="text/coffeescript" src="test-file.coffee"></script>');
    });

    it('should transform an image to an img tag', function () {
      transform.html.image.should.be.type('function');
      transform.html.image('test-file.png').should.equal('<img src="test-file.png">');
    });

    describe('selfClosingTag option is true', function () {
      before(function () {
        transform.selfClosingTag = true;
      });
      after(function () {
        transform.selfClosingTag = false;
      });

      it('should make link tags self closing', function () {
        transform.html.css('test-file.css').should.equal('<link rel="stylesheet" href="test-file.css" />');
        transform.html.html('test-file.html').should.equal('<link rel="import" href="test-file.html" />');
      });

      it('should make img tags self closing', function () {
        transform.html.image('test-file.png').should.equal('<img src="test-file.png" />');
      });
    });

    it('should use the css transformer for css files automatically', function () {
      transform.html('test-file.css').should.equal(transform.html.css('test-file.css'));
    });

    it('should use the html transformer for html files automatically', function () {
      transform.html('test-file.html').should.equal(transform.html.html('test-file.html'));
    });

    it('should use the js transformer for js files automatically', function () {
      transform.html('test-file.js').should.equal(transform.html.js('test-file.js'));
    });

    it('should use the coffee transformer for coffee files automatically', function () {
      transform.html('test-file.coffee').should.equal(transform.html.coffee('test-file.coffee'));
    });

    it('should use the image transformer for png, gif, jpg and jpeg files automatically', function () {
      transform.html('test-file.png').should.equal(transform.html.image('test-file.png'));
      transform.html('test-file.gif').should.equal(transform.html.image('test-file.gif'));
      transform.html('test-file.jpg').should.equal(transform.html.image('test-file.jpg'));
      transform.html('test-file.jpeg').should.equal(transform.html.image('test-file.jpeg'));
    });

  });

  describe('jsx as target', function () {
    it('should transform css to a self closing link tag', function () {
      transform.jsx.css.should.be.type('function');
      transform.jsx.css('test-file.css').should.equal('<link rel="stylesheet" href="test-file.css" />');
    });

    it('should transform html to a self closing link tag', function () {
      transform.jsx.html.should.be.type('function');
      transform.jsx.html('test-file.html').should.equal('<link rel="import" href="test-file.html" />');
    });

    it('should transform javascript to a script tag', function () {
      transform.jsx.js.should.be.type('function');
      transform.jsx.js('test-file.js').should.equal('<script src="test-file.js"></script>');
    });

    it('should transform coffeescript to a script tag', function () {
      transform.jsx.coffee.should.be.type('function');
      transform.jsx.coffee('test-file.coffee').should.equal('<script type="text/coffeescript" src="test-file.coffee"></script>');
    });

    it('should transform an image to a self closing img tag', function () {
      transform.jsx.image.should.be.type('function');
      transform.jsx.image('test-file.png').should.equal('<img src="test-file.png" />');
    });

    it('should use the css transformer for css files automatically', function () {
      transform.jsx('test-file.css').should.equal(transform.jsx.css('test-file.css'));
    });

    it('should use the html transformer for html files automatically', function () {
      transform.jsx('test-file.html').should.equal(transform.jsx.html('test-file.html'));
    });

    it('should use the js transformer for js files automatically', function () {
      transform.jsx('test-file.js').should.equal(transform.jsx.js('test-file.js'));
    });

    it('should use the coffee transformer for coffee files automatically', function () {
      transform.jsx('test-file.coffee').should.equal(transform.jsx.coffee('test-file.coffee'));
    });

    it('should use the image transformer for png, gif, jpg and jpeg files automatically', function () {
      transform.jsx('test-file.png').should.equal(transform.jsx.image('test-file.png'));
      transform.jsx('test-file.gif').should.equal(transform.jsx.image('test-file.gif'));
      transform.jsx('test-file.jpg').should.equal(transform.jsx.image('test-file.jpg'));
      transform.jsx('test-file.jpeg').should.equal(transform.jsx.image('test-file.jpeg'));
    });
  });

  describe('jade as target', function () {
    it('should transform css to a jade link tag', function () {
      transform.jade.css.should.be.type('function');
      transform.jade.css('test-file.css').should.equal('link(rel="stylesheet", href="test-file.css")');
    });

    it('should transform html to a self closing link tag', function () {
      transform.jade.html.should.be.type('function');
      transform.jade.html('test-file.html').should.equal('link(rel="import", href="test-file.html")');
    });

    it('should transform javascript to a script tag', function () {
      transform.jade.js.should.be.type('function');
      transform.jade.js('test-file.js').should.equal('script(src="test-file.js")');
    });

    it('should transform coffeescript to a script tag', function () {
      transform.jade.coffee.should.be.type('function');
      transform.jade.coffee('test-file.coffee').should.equal('script(type="text/coffeescript", src="test-file.coffee")');
    });

    it('should transform an image to a self closing img tag', function () {
      transform.jade.image.should.be.type('function');
      transform.jade.image('test-file.png').should.equal('img(src="test-file.png")');
    });

    it('should use the css transformer for css files automatically', function () {
      transform.jade('test-file.css').should.equal(transform.jade.css('test-file.css'));
    });

    it('should use the html transformer for html files automatically', function () {
      transform.jade('test-file.html').should.equal(transform.jade.html('test-file.html'));
    });

    it('should use the js transformer for js files automatically', function () {
      transform.jade('test-file.js').should.equal(transform.jade.js('test-file.js'));
    });

    it('should use the coffee transformer for coffee files automatically', function () {
      transform.jade('test-file.coffee').should.equal(transform.jade.coffee('test-file.coffee'));
    });

    it('should use the image transformer for png, gif, jpg and jpeg files automatically', function () {
      transform.jade('test-file.png').should.equal(transform.jade.image('test-file.png'));
      transform.jade('test-file.gif').should.equal(transform.jade.image('test-file.gif'));
      transform.jade('test-file.jpg').should.equal(transform.jade.image('test-file.jpg'));
      transform.jade('test-file.jpeg').should.equal(transform.jade.image('test-file.jpeg'));
    });
  });

  describe('slm as target', function () {
    it('should transform css to a slm link tag', function () {
      transform.slm.css.should.be.type('function');
      transform.slm.css('test-file.css').should.equal('link rel="stylesheet" href="test-file.css"');
    });

    it('should transform html to a self closing link tag', function () {
      transform.slm.html.should.be.type('function');
      transform.slm.html('test-file.html').should.equal('link rel="import" href="test-file.html"');
    });

    it('should transform javascript to a script tag', function () {
      transform.slm.js.should.be.type('function');
      transform.slm.js('test-file.js').should.equal('script src="test-file.js"');
    });

    it('should transform coffeescript to a script tag', function () {
      transform.slm.coffee.should.be.type('function');
      transform.slm.coffee('test-file.coffee').should.equal('script type="text/coffeescript" src="test-file.coffee"');
    });

    it('should transform an image to a self closing img tag', function () {
      transform.slm.image.should.be.type('function');
      transform.slm.image('test-file.png').should.equal('img src="test-file.png"');
    });

    it('should use the css transformer for css files automatically', function () {
      transform.slm('test-file.css').should.equal(transform.slm.css('test-file.css'));
    });

    it('should use the html transformer for html files automatically', function () {
      transform.slm('test-file.html').should.equal(transform.slm.html('test-file.html'));
    });

    it('should use the js transformer for js files automatically', function () {
      transform.slm('test-file.js').should.equal(transform.slm.js('test-file.js'));
    });

    it('should use the coffee transformer for coffee files automatically', function () {
      transform.slm('test-file.coffee').should.equal(transform.slm.coffee('test-file.coffee'));
    });

    it('should use the image transformer for png, gif, jpg and jpeg files automatically', function () {
      transform.slm('test-file.png').should.equal(transform.slm.image('test-file.png'));
      transform.slm('test-file.gif').should.equal(transform.slm.image('test-file.gif'));
      transform.slm('test-file.jpg').should.equal(transform.slm.image('test-file.jpg'));
      transform.slm('test-file.jpeg').should.equal(transform.slm.image('test-file.jpeg'));
    });
  });

  describe('haml as target', function () {
    it('should transform css to a haml link tag', function () {
      transform.haml.css.should.be.type('function');
      transform.haml.css('test-file.css').should.equal('%link{rel:"stylesheet", href:"test-file.css"}');
    });

    it('should transform html to a self closing link tag', function () {
      transform.haml.html.should.be.type('function');
      transform.haml.html('test-file.html').should.equal('%link{rel:"import", href:"test-file.html"}');
    });

    it('should transform javascript to a script tag', function () {
      transform.haml.js.should.be.type('function');
      transform.haml.js('test-file.js').should.equal('%script{src:"test-file.js"}');
    });

    it('should transform coffeescript to a script tag', function () {
      transform.haml.coffee.should.be.type('function');
      transform.haml.coffee('test-file.coffee').should.equal('%script{type:"text/coffeescript", src:"test-file.coffee"}');
    });

    it('should transform an image to a self closing img tag', function () {
      transform.haml.image.should.be.type('function');
      transform.haml.image('test-file.png').should.equal('%img{src:"test-file.png"}');
    });

    it('should use the css transformer for css files automatically', function () {
      transform.haml('test-file.css').should.equal(transform.haml.css('test-file.css'));
    });

    it('should use the html transformer for html files automatically', function () {
      transform.haml('test-file.html').should.equal(transform.haml.html('test-file.html'));
    });

    it('should use the js transformer for js files automatically', function () {
      transform.haml('test-file.js').should.equal(transform.haml.js('test-file.js'));
    });

    it('should use the coffee transformer for coffee files automatically', function () {
      transform.haml('test-file.coffee').should.equal(transform.haml.coffee('test-file.coffee'));
    });

    it('should use the image transformer for png, gif, jpg and jpeg files automatically', function () {
      transform.haml('test-file.png').should.equal(transform.haml.image('test-file.png'));
      transform.haml('test-file.gif').should.equal(transform.haml.image('test-file.gif'));
      transform.haml('test-file.jpg').should.equal(transform.haml.image('test-file.jpg'));
      transform.haml('test-file.jpeg').should.equal(transform.haml.image('test-file.jpeg'));
    });
  });

  it('should pick the correct target transformer for html targets', function () {
    var targetFile = fixture('index.html');
    var sourceFile = fixture('style.css');
    transform(sourceFile.path, null, null, sourceFile, targetFile)
      .should.equal(transform.html.css(sourceFile.path));
  });

  it('should pick the correct target transformer for jsx targets', function () {
    var targetFile = fixture('app.jsx');
    var sourceFile = fixture('app.js');
    transform(sourceFile.path, null, null, sourceFile, targetFile)
      .should.equal(transform.jsx.js(sourceFile.path));
  });

  it('should pick the correct target transformer for jade targets', function () {
    var targetFile = fixture('index.jade');
    var sourceFile = fixture('image.gif');
    transform(sourceFile.path, null, null, sourceFile, targetFile)
      .should.equal(transform.jade.image(sourceFile.path));
  });

  it('should pick the correct target transformer for slm targets', function () {
    var targetFile = fixture('index.slm');
    var sourceFile = fixture('image.gif');
    transform(sourceFile.path, null, null, sourceFile, targetFile)
      .should.equal(transform.slm.image(sourceFile.path));
  });

  it('should pick the correct target transformer for haml targets', function () {
    var targetFile = fixture('index.haml');
    var sourceFile = fixture('image.gif');
    transform(sourceFile.path, null, null, sourceFile, targetFile)
      .should.equal(transform.haml.image(sourceFile.path));
  });

  it('should default to the html target transformer for other files', function () {
    var targetFile = fixture('plain.txt');
    var sourceFile = fixture('image.gif');
    transform(sourceFile.path, null, null, sourceFile, targetFile)
      .should.equal(transform.html.image(sourceFile.path));
  });

  it('should default to the html target transformer for unknown files', function () {
    var sourceFile = fixture('image.gif');
    transform(sourceFile.path, null, null, sourceFile)
      .should.equal(transform.html.image(sourceFile.path));
  });

});

function fixture (file, read) {
  var filepath = path.resolve(__dirname, 'fixtures', file);
  return new gutil.File({
    path: filepath,
    cwd: __dirname,
    base: path.resolve(__dirname, 'fixtures', path.dirname(file)),
    contents: read ? fs.readFileSync(filepath) : null
  });
}
