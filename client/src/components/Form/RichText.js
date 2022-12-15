import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class RichText extends React.Component {
  handleEditorChange = (e) => {
      this.props.postData.message=e.target.getContent()
  }
  
  render() {
    return (
      <Editor apiKey="6s3iseprg9n1inhv4gmkhjj94azbcnlx1zqfpj2zsy87g46j"
        initialValue=""
        init={{
            height: 300,
            width: '100%',
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default RichText;