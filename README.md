# [Demo](https://ancient-refuge-49866.herokuapp.com)

# Images uploader UI component
Simple component for upload and validate (client side) images with preview built with React.js.
This package use ['react-flip-move'](https://github.com/joshwcomeau/react-flip-move) for animate the file preview images.

## Installation

```bash
npm install --save react-images-upload
```

## Usage

```javascript
import React from 'react';
import ImageUploader from 'react-images-upload';

class App extends React.Component {

	constructor(props) {
		super(props);
		 this.state = { pictures: [] };
		 this.onDrop = this.onDrop.bind(this);
	}

	onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
	}

    render() {
        return (
            <ImageUploader
                	withIcon={true}
                	buttonText='Choose images'
                	onChange={this.onDrop}
                	imgExtension={['.jpg', '.gif', '.png', '.gif']}
                	maxFileSize={5242880}
            />
        );
    }
}
```

### Available Options

| parameter | type | default | description |
| :--------: | :--: | :-----: | :---------- |
| className | String | - | Class name for the input. |
| onChange | Function | - | On change handler for the input. |
| buttonClassName | String | - | Class name for upload button. |
| buttonStyles | Object | - | Inline styles for upload button. |
| withPreview | Boolean | false | Show preview of selected images. |
| defaultImages | Array | ['imgUrl1', 'imgUrl2'] | Pre-populate with default images. |
| accept | String | "accept=image/*" | Accept attribute for file input. |
| name | String | - | Input name. |
| withIcon | Boolean | true | If true, show upload icon on top |
| buttonText | String | 'Choose images' | The text that display in the button. |
| buttonType | String | 'submit' | The value of the button's "type" attribute. |
| withLabel | Boolean | true | Show instruction label |
| label | String | 'Max file size: 5mb, accepted: jpg|gif|png|gif' | Label text |
| labelStyles | Object | - | Inline styles for the label. |
| labelClass | string | - | Class name for the label |
| imgExtension | Array | ['.jpg', '.gif', '.png', '.gif'] | Supported image extension (will use in the image validation). |
| maxFileSize | Number | 5242880 | Max image size. |
| fileSizeError | String | " file size is too big" | Label for file size error message. |
| fileTypeError | String | " is not supported file extension" | Label for file extension error message. |
| errorClass | String | - | Class for error messages |
| errorStyle | Object | - | Inline styles for errors |

### Development
Make sure you have [yarn](https://yarnpkg.com/en/) installed. Clone the repo and run `yarn`.

#### Install dependencies
Run `yarn install` in both `/` and `/src/component`.

#### Contributing
Before committing, please run `yarn run transpile` in `/src/component` to update `/src/component/compiled.js`

### License
MIT
