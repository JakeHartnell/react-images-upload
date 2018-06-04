'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.css');

var _reactFlipMove = require('react-flip-move');

var _reactFlipMove2 = _interopRequireDefault(_reactFlipMove);

var _UploadIcon = require('./UploadIcon.svg');

var _UploadIcon2 = _interopRequireDefault(_UploadIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%"
};

var ReactImageUploadComponent = function (_React$Component) {
  _inherits(ReactImageUploadComponent, _React$Component);

  function ReactImageUploadComponent(props) {
    _classCallCheck(this, ReactImageUploadComponent);

    var _this2 = _possibleConstructorReturn(this, (ReactImageUploadComponent.__proto__ || Object.getPrototypeOf(ReactImageUploadComponent)).call(this, props));

    _this2.state = {
      pictures: [],
      files: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: []
    };
    _this2.inputElement = '';
    _this2.onDropFile = _this2.onDropFile.bind(_this2);
    _this2.triggerFileUpload = _this2.triggerFileUpload.bind(_this2);
    return _this2;
  }

  /*
  On button click, trigger input file to open
  */


  _createClass(ReactImageUploadComponent, [{
    key: 'triggerFileUpload',
    value: function triggerFileUpload() {
      this.inputElement.click();
    }

    /*
   Handle file validation
   */

  }, {
    key: 'onDropFile',
    value: function onDropFile(e) {
      var _this3 = this;

      var files = e.target.files;
      var _this = this;

      // Iterate over all uploaded files

      var _loop = function _loop(i) {
        var f = files[i];
        // Check for file extension
        if (!_this3.hasExtension(f.name)) {
          var newArray = _this.state.notAcceptedFileType.slice();
          newArray.push(f.name);
          _this.setState({ notAcceptedFileType: newArray });
          return 'continue';
        }
        // Check for file size
        if (f.size > _this3.props.maxFileSize) {
          var _newArray = _this.state.notAcceptedFileSize.slice();
          _newArray.push(f.name);
          _this.setState({ notAcceptedFileSize: _newArray });
          return 'continue';
        }

        var reader = new FileReader();
        // Read the image via FileReader API and save image result in state.
        reader.onload = function () {
          return function (e) {
            // Add the file name to the data URL
            var dataURL = e.target.result;
            dataURL = dataURL.replace(";base64", ';name=' + f.name + ';base64');

            if (_this.props.singleImage === true) {
              _this.setState({ pictures: [dataURL], files: [f] }, function () {
                _this.props.onChange(_this.state.files, _this.state.pictures);
              });
            } else if (_this.state.pictures.indexOf(dataURL) === -1) {
              var _newArray2 = _this.state.pictures.slice();
              _newArray2.push(dataURL);

              var newFiles = _this.state.files.slice();
              newFiles.push(f);

              _this.setState({ pictures: _newArray2, files: newFiles }, function () {
                _this.props.onChange(_this.state.files, _this.state.pictures);
              });
            }
          };
        }(f);
        reader.readAsDataURL(f);
      };

      for (var i = 0; i < files.length; i++) {
        var _ret = _loop(i);

        if (_ret === 'continue') continue;
      }
    }

    /*
   Render the upload icon
   */

  }, {
    key: 'renderIcon',
    value: function renderIcon() {
      if (this.props.withIcon) {
        return _react2.default.createElement('img', { src: _UploadIcon2.default, className: 'uploadIcon', alt: 'Upload Icon' });
      }
    }

    /*
   Render label
   */

  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      if (this.props.withLabel) {
        return _react2.default.createElement(
          'p',
          { className: this.props.labelClass, style: this.props.labelStyles },
          this.props.label
        );
      }
    }

    /*
  Check file extension (onDropFile)
  */

  }, {
    key: 'hasExtension',
    value: function hasExtension(fileName) {
      var pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
      return new RegExp(pattern, 'i').test(fileName);
    }

    /*
   Remove the image from state
   */

  }, {
    key: 'removeImage',
    value: function removeImage(picture) {
      var _this4 = this;

      var removeIndex = this.state.pictures.findIndex(function (e) {
        return e === picture;
      });
      var filteredPictures = this.state.pictures.filter(function (e, index) {
        return index !== removeIndex;
      });
      var filteredFiles = this.state.files.filter(function (e, index) {
        return index !== removeIndex;
      });

      this.setState({ pictures: filteredPictures, files: filteredFiles }, function () {
        _this4.props.onChange(_this4.state.files, _this4.state.pictures);
      });
    }

    /*
   Check if any errors && render
   */

  }, {
    key: 'renderErrors',
    value: function renderErrors() {
      var _this5 = this;

      var notAccepted = '';
      if (this.state.notAcceptedFileType.length > 0) {
        notAccepted = this.state.notAcceptedFileType.map(function (error, index) {
          return _react2.default.createElement(
            'div',
            { className: 'errorMessage ' + _this5.props.errorClass, key: index, style: _this5.props.errorStyle },
            '* ',
            error,
            ' ',
            _this5.props.fileTypeError
          );
        });
      }
      if (this.state.notAcceptedFileSize.length > 0) {
        notAccepted = this.state.notAcceptedFileSize.map(function (error, index) {
          return _react2.default.createElement(
            'div',
            { className: 'errorMessage ' + _this5.props.errorClass, key: index, style: _this5.props.errorStyle },
            '* ',
            error,
            ' ',
            _this5.props.fileSizeError
          );
        });
      }
      return notAccepted;
    }

    /*
   Render preview images
   */

  }, {
    key: 'renderPreview',
    value: function renderPreview() {
      return _react2.default.createElement(
        'div',
        { className: 'uploadPicturesWrapper' },
        _react2.default.createElement(
          _reactFlipMove2.default,
          { enterAnimation: 'fade', leaveAnimation: 'fade', style: styles },
          this.renderPreviewPictures()
        )
      );
    }
  }, {
    key: 'renderPreviewPictures',
    value: function renderPreviewPictures() {
      var _this6 = this;

      return this.state.pictures.map(function (picture, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: 'uploadPictureContainer' },
          _react2.default.createElement(
            'div',
            { className: 'deleteImage', onClick: function onClick() {
                return _this6.removeImage(picture);
              } },
            'X'
          ),
          _react2.default.createElement('img', { src: picture, className: 'uploadPicture', alt: 'preview' })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      return _react2.default.createElement(
        'div',
        { className: "fileUploader " + this.props.className, style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: 'fileContainer' },
          this.renderIcon(),
          this.renderLabel(),
          _react2.default.createElement(
            'div',
            { className: 'errorsContainer' },
            this.renderErrors()
          ),
          _react2.default.createElement(
            'button',
            {
              type: this.props.buttonType,
              className: "chooseFileButton " + this.props.buttonClassName,
              style: this.props.buttonStyles,
              onClick: this.triggerFileUpload
            },
            this.props.buttonText
          ),
          _react2.default.createElement('input', {
            type: 'file',
            ref: function ref(input) {
              return _this7.inputElement = input;
            },
            name: this.props.name,
            multiple: 'multiple',
            onChange: this.onDropFile,
            accept: this.props.accept
          }),
          this.props.withPreview ? this.renderPreview() : null
        )
      );
    }
  }]);

  return ReactImageUploadComponent;
}(_react2.default.Component);

ReactImageUploadComponent.defaultProps = {
  className: '',
  buttonClassName: "",
  buttonStyles: {},
  withPreview: false,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "Choose images",
  buttonType: "button",
  withLabel: true,
  label: "Max file size: 5mb, accepted: jpg|gif|png",
  labelStyles: {},
  labelClass: "",
  imgExtension: ['.jpg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: " file size is too big",
  fileTypeError: " is not a supported file extension",
  errorClass: "",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: function onChange() {}
};

ReactImageUploadComponent.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onDelete: _propTypes2.default.func,
  buttonClassName: _propTypes2.default.string,
  buttonStyles: _propTypes2.default.object,
  buttonType: _propTypes2.default.string,
  withPreview: _propTypes2.default.bool,
  accept: _propTypes2.default.string,
  name: _propTypes2.default.string,
  withIcon: _propTypes2.default.bool,
  buttonText: _propTypes2.default.string,
  withLabel: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  labelStyles: _propTypes2.default.object,
  labelClass: _propTypes2.default.string,
  imgExtension: _propTypes2.default.array,
  maxFileSize: _propTypes2.default.number,
  fileSizeError: _propTypes2.default.string,
  fileTypeError: _propTypes2.default.string,
  errorClass: _propTypes2.default.string,
  errorStyle: _propTypes2.default.object,
  singleImage: _propTypes2.default.bool
};

exports.default = ReactImageUploadComponent;