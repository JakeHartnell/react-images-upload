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
			var files = e.target.files;
			var _this = this;
			// If callback giving, fire.
			if (typeof this.props.onChange === "function") {
				this.props.onChange(files);
			}
			// Iterate over all uploaded files
			for (var i = 0; i < files.length; i++) {
				var f = files[i];
				// Check for file extension
				if (!this.hasExtension(f.name)) {
					var newArray = _this.state.notAcceptedFileType.slice();
					newArray.push(f.name);
					_this.setState({ notAcceptedFileType: newArray });
					continue;
				}
				// Check for file size
				if (f.size > this.props.maxFileSize) {
					var _newArray = _this.state.notAcceptedFileSize.slice();
					_newArray.push(f.name);
					_this.setState({ notAcceptedFileSize: _newArray });
					continue;
				}

				var reader = new FileReader();
				// Read the image via FileReader API and save image result in state.
				reader.onload = function () {
					return function (e) {
						if (_this.props.singleImage === true) {
							_this.setState({ pictures: [e.target.result] });
						} else if (_this.state.pictures.indexOf(e.target.result) === -1) {
							var _newArray2 = _this.state.pictures.slice();
							_newArray2.push(e.target.result);
							_this.setState({ pictures: _newArray2 });
						}
					};
				}(f);
				reader.readAsDataURL(f);
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
			return new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$').test(fileName);
		}

		/*
   Remove the image from state
   */

	}, {
		key: 'removeImage',
		value: function removeImage(picture) {
			var filteredAry = this.state.pictures.filter(function (e) {
				return e !== picture;
			});
			this.setState({ pictures: filteredAry });
		}

		/*
   Check if any errors && render
   */

	}, {
		key: 'renderErrors',
		value: function renderErrors() {
			var _this3 = this;

			var notAccepted = '';
			if (this.state.notAcceptedFileType.length > 0) {
				notAccepted = this.state.notAcceptedFileType.map(function (error, index) {
					return _react2.default.createElement(
						'div',
						{ className: 'errorMessage' + _this3.props.errorClass, key: index, style: _this3.props.errorStyle },
						'* ',
						error,
						' ',
						_this3.props.fileTypeError
					);
				});
			}
			if (this.state.notAcceptedFileSize.length > 0) {
				notAccepted = this.state.notAcceptedFileSize.map(function (error, index) {
					return _react2.default.createElement(
						'div',
						{ className: 'errorMessage' + _this3.props.errorClass, key: index, style: _this3.props.errorStyle },
						'* ',
						error,
						' ',
						_this3.props.fileSizeError
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
			var _this4 = this;

			return this.state.pictures.map(function (picture, index) {
				return _react2.default.createElement(
					'div',
					{ key: index, className: 'uploadPictureContainer' },
					_react2.default.createElement(
						'div',
						{ className: 'deleteImage', onClick: function onClick() {
								return _this4.removeImage(picture);
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
			var _this5 = this;

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
							className: "chooseFileButton " + this.props.buttonClassName,
							style: this.props.buttonStyles,
							onClick: this.triggerFileUpload
						},
						this.props.buttonText
					),
					_react2.default.createElement('input', {
						type: 'file',
						ref: function ref(input) {
							return _this5.inputElement = input;
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
	buttonClassName: {},
	buttonStyles: {},
	withPreview: false,
	accept: "accept=image/*",
	name: "",
	withIcon: true,
	buttonText: "Choose images",
	withLabel: true,
	label: "Max file size: 5mb, accepted: jpg|gif|png",
	labelStyles: {},
	labelClass: "",
	imgExtension: ['.jpg', '.gif', '.png'],
	maxFileSize: 5242880,
	fileSizeError: " file size is too big",
	fileTypeError: " is not supported file extension",
	errorClass: "",
	style: {},
	errorStyle: {},
	singleImage: false
};

ReactImageUploadComponent.propTypes = {
	style: _propTypes2.default.object,
	className: _propTypes2.default.string,
	onChange: _propTypes2.default.func,
	onDelete: _propTypes2.default.func,
	buttonClassName: _propTypes2.default.object,
	buttonStyles: _propTypes2.default.object,
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
