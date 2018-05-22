import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import FlipMove from 'react-flip-move';
import UploadIcon from './UploadIcon.svg';

const styles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexWrap: "wrap",
	width: "100%"
};

class ReactImageUploadComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pictures: [],
            files: [],
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

		// Iterate over all uploaded files
		for (let i = 0; i < files.length; i++) {
      let f = files[i];
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
                    // Add the file name to the data URL
                    let dataURL = e.target.result;
                    dataURL = dataURL.replace(";base64", `;name=${f.name};base64`);

                    if (_this.props.singleImage === true) {
                        _this.setState({pictures: [dataURL], files: [f]}, () => {
                            _this.props.onChange(_this.state.files, _this.state.pictures);
                        });
                    } else if (_this.state.pictures.indexOf(dataURL) === -1) {
                        const newArray = _this.state.pictures.slice();
                        newArray.push(dataURL);

                        const newFiles = _this.state.files.slice();
                        newFiles.push(f);

                        _this.setState({pictures: newArray, files: newFiles}, () => {
                            _this.props.onChange(_this.state.files, _this.state.pictures);
                        });
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
      return <img src={UploadIcon} className="uploadIcon"	alt="Upload Icon" />;
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
        const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
        return new RegExp(pattern, 'i').test(fileName);
	}

	/*
	 Remove the image from state
	 */
	removeImage(picture) {
        const removeIndex = this.state.pictures.findIndex(e => e === picture);
        const filteredPictures = this.state.pictures.filter((e, index) => index !== removeIndex);
        const filteredFiles = this.state.files.filter((e, index) => index !== removeIndex);

        this.setState({pictures: filteredPictures, files: filteredFiles}, () => {
            this.props.onChange(this.state.files, this.state.pictures);
        });
	}

	/*
	 Check if any errors && render
	 */
	renderErrors() {
		let notAccepted = '';
		if (this.state.notAcceptedFileType.length > 0) {
			notAccepted = this.state.notAcceptedFileType.map((error, index) => {
				return (
					<div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
						* {error} {this.props.fileTypeError}
					</div>
				)
			});
		}
		if (this.state.notAcceptedFileSize.length > 0) {
			notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
				return (
					<div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
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
			<div className={"fileUploader " + this.props.className} style={this.props.style}>
				<div className="fileContainer">
					{this.renderIcon()}
					{this.renderLabel()}
					<div className="errorsContainer">
						{this.renderErrors()}
					</div>
					<button
                        type={this.props.buttonType}
						className={"chooseFileButton " + this.props.buttonClassName}
						style={this.props.buttonStyles}
						onClick={this.triggerFileUpload}
					>
                        {this.props.buttonText}
					</button>
					<input
						type="file"
						ref={input => this.inputElement = input}
						name={this.props.name}
						multiple="multiple"
						onChange={this.onDropFile}
						accept={this.props.accept}
					/>
					{ this.props.withPreview ? this.renderPreview() : null }
				</div>
			</div>
		)
	}
}

ReactImageUploadComponent.defaultProps = {
	className: '',
	buttonClassName: "",
	buttonStyles: {},
	withPreview: false,
	accept: "image/*",
	name: "",
	withIcon: true,
	buttonText: "Choose images",
    buttonType: "submit",
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
    onChange: () => {}
};

ReactImageUploadComponent.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onChange: PropTypes.func,
  onDelete: PropTypes.func,
	buttonClassName: PropTypes.string,
	buttonStyles: PropTypes.object,
    buttonType: PropTypes.string,
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
	errorStyle: PropTypes.object,
  singleImage: PropTypes.bool
};

export default ReactImageUploadComponent;
