// Generated by CoffeeScript 1.6.2
(function() {
  'View of a single file in the editor (depends on js/img/css etc)';
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.ServerFileView = (function(_super) {
    __extends(ServerFileView, _super);

    function ServerFileView() {
      this.onDestroy = __bind(this.onDestroy, this);
      this.updateContents = __bind(this.updateContents, this);
      this.renderAsImage = __bind(this.renderAsImage, this);
      this.renderAsSourceCode = __bind(this.renderAsSourceCode, this);
      this.render = __bind(this.render, this);      _ref = ServerFileView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ServerFileView.prototype.initialize = function(options) {
      this.tplSourceCode = Handlebars.templates["source-code"];
      this.tplImage = Handlebars.templates["image"];
      return this.model.on("destroy", this.onDestroy);
    };

    ServerFileView.prototype.events = {
      "remove": "onDestroy"
    };

    ServerFileView.prototype.render = function() {
      if (this.model.get("fileType") !== ServerFile.fileTypeEnum.IMG) {
        this.renderAsSourceCode();
      } else {
        this.renderAsImage();
      }
      return this;
    };

    ServerFileView.prototype.renderAsSourceCode = function() {
      var editorMode, fileContents;

      $(this.el).html(this.tplSourceCode);
      fileContents = $(this.el).find(".file-contents");
      fileContents.text(this.model.get("contents"));
      this.aceEditor = ace.edit(fileContents[0]);
      this.aceEditor.setTheme("ace/theme/tomorrow_night_eighties");
      this.aceEditor.setFontSize("12px");
      editorMode = "ace/mode/html";
      switch (this.model.get("fileType")) {
        case ServerFile.fileTypeEnum.CSS:
          editorMode = "ace/mode/css";
          break;
        case ServerFile.fileTypeEnum.JS:
          editorMode = "ace/mode/javascript";
      }
      this.aceEditor.getSession().setMode(editorMode);
      return this.aceEditor.on("change", this.updateContents);
    };

    ServerFileView.prototype.renderAsImage = function() {
      $(this.el).html(this.tplImage);
      return this.$("img").attr("src", this.model.get("contents"));
    };

    ServerFileView.prototype.updateContents = function() {
      return this.model.save("contents", this.aceEditor.getValue());
    };

    ServerFileView.prototype.onDestroy = function() {
      return this.aceEditor.destroy();
    };

    return ServerFileView;

  })(Backbone.View);

}).call(this);
