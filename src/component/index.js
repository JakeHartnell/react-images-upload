import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import FlipMove from 'react-flip-move';

const styles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexWrap: "wrap",
	width: "100%"
};

class ReactImageUploadComponent extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			pictures: [],
			notAcceptedFileType: [],
			notAcceptedFileSize: []
		};
		this.inputElement = '';
		this.onDropFile = this.onDropFile.bind(this);
		this.triggerFileUpload = this.triggerFileUpload.bind(this);
	}

	/*
	 On button click, trigger input file to open
	 */
	triggerFileUpload() {
		this.inputElement.click();
	}

	/*
	 Handle file validation
	 */
	onDropFile(e) {
		const files = e.target.files;
		const _this = this;
		// If callback giving, fire.
		if (typeof this.props.onChange === "function") {
			this.props.onChange(files);
		}
		// Iterate over all uploaded files
		for (let i = 0, f; f = files[i]; i++) {
			// Check for file extension
			if (!this.hasExtension(f.name)) {
				const newArray = _this.state.notAcceptedFileType.slice();
				newArray.push(f.name);
				_this.setState({notAcceptedFileType: newArray});
				continue;
			}
			// Check for file size
			if(f.size > this.props.maxFileSize) {
				const newArray = _this.state.notAcceptedFileSize.slice();
				newArray.push(f.name);
				_this.setState({notAcceptedFileSize: newArray});
				continue;
			}

			const reader = new FileReader();
			// Read the image via FileReader API and save image result in state.
			reader.onload = (function () {
				return function (e) {
					if (_this.state.pictures.indexOf(e.target.result) === -1) {
						const newArray = _this.state.pictures.slice();
						newArray.push(e.target.result);
						_this.setState({pictures: newArray});
					}
				};
			})(f);
			reader.readAsDataURL(f);
		}
	}

	/*
	 Render the upload icon
	 */
	renderIcon() {
		if (this.props.withIcon) {
			return <div className="uploadIcon"/>;
		}
	}

	/*
	 Render label
	 */
	renderLabel() {
		if (this.props.withLabel) {
			return <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>
		}
	}

	/*
	 Check file extension (onDropFile)
	 */
	hasExtension(fileName) {
		return (new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
	}

	/*
	 Remove the image from state
	 */
	removeImage(picture) {
		const filteredAry = this.state.pictures.filter((e) => e !== picture);
		this.setState({pictures: filteredAry})
	}

	/*
	 Check if any errors && render
	 */
	renderErrors() {
		let notAccepted = '';
		if (this.state.notAcceptedFileType.length > 0) {
			notAccepted = this.state.notAcceptedFileType.map((error, index) => {
				return (
					<div className={'errorMessage' + this.props.errorClass} key={index} style={this.props.errorStyle}>
						* {error} {this.props.fileTypeError}
					</div>
				)
			});
		}
		if (this.state.notAcceptedFileSize.length > 0) {
			notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
				return (
					<div className={'errorMessage' + this.props.errorClass} key={index} style={this.props.errorStyle}>
						* {error} {this.props.fileSizeError}
					</div>
				)
			});
		}
		return notAccepted;
	}

	/*
	 Render preview images
	 */
	renderPreview() {
		return (
			<div className="uploadPicturesWrapper">
				<FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
					{this.renderPreviewPictures()}
				</FlipMove>
			</div>
		);
	}

	renderPreviewPictures() {
		return this.state.pictures.map((picture, index) => {
			return (
				<div key={index} className="uploadPictureContainer">
					<div className="deleteImage" onClick={() => this.removeImage(picture)}>X</div>
					<img src={picture} className="uploadPicture" alt="preview"/>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="fileUploader" style={this.props.style}>
				<div className="fileContainer">
					{this.renderIcon()}
					{this.renderLabel()}
					<div className="errorsContainer">
						{this.renderErrors()}
					</div>
					<button
						className={"chooseFileButton " + this.props.buttonClassName}
						style={this.props.buttonStyles}
						onClick={this.triggerFileUpload}
					>{this.props.buttonText}
					</button>
					<input
						type="file"
						ref={input => this.inputElement = input}
						name={this.props.name}
						multiple="multiple"
						onChange={this.onDropFile}
						accept={this.props.accept}
						className={this.props.className}
					/>
					{this.renderPreview()}
				</div>
			</div>
		)
	}
}

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
	label: "Max file size: 5mb, accepted: jpg|gif|png|gif",
	labelStyles: {},
	labelClass: "",
	imgExtension: ['.jpg', '.gif', '.png', '.gif'],
	maxFileSize: 5242880,
	fileSizeError: " file size is too big",
	fileTypeError: " is not supported file extension",
	errorClass: "",
	style: {},
	errorStyle: {}
};

ReactImageUploadComponent.PropTypes = {
	style: PropTypes.string,
	className: PropTypes.string,
	onChange: PropTypes.func,
	buttonClassName: PropTypes.object,
	buttonStyles: PropTypes.object,
	withPreview: PropTypes.bool,
	accept: PropTypes.string,
	name: PropTypes.string,
	withIcon: PropTypes.bool,
	buttonText: PropTypes.string,
	withLabel: PropTypes.bool,
	label: PropTypes.string,
	labelStyles: PropTypes.object,
	labelClass: PropTypes.string,
	imgExtension: PropTypes.array,
	maxFileSize: PropTypes.number,
	fileSizeError: PropTypes.string,
	fileTypeError: PropTypes.string,
	errorClass: PropTypes.string,
	errorStyle: PropTypes.object
};
export default ReactImageUploadComponent;